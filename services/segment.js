'use strict';

var Analytics = require('analytics-node');
const analytics = new Analytics(strapi.config.middleware.settings.segment.writeKey, strapi.config.middleware.settings.segment.options);
const utils = require('../shared/utils');

/**
 * segment.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {

  /**
   * Identify user on account is create
   * @param ctx {context}
   */
  identify(ctx) {
    if (ctx.state && ctx.state.user) {
      /* check if user was previously anonymous */
      if (ctx.state.anonymousId) {
        analytics.alias({ previousId: ctx.state.anonymousId, userId: ctx.state.user.id });
        delete ctx.state.anonymousId;
      }
      /* Use user information */
      analytics.identify({
        userId: ctx.state.user.id,
        traits: {
          email: ctx.state.user.email,
          createdAt: ctx.state.user.created_at,
        }
      });
    } else {
      /*Set default analytics anonymousID if not exist */
      utils.generateAnonymousId(ctx);
      /* Use anonymous ID */
      analytics.identify({
        anonymousId: ctx.state.anonymousId,
      });
    }
  },

  /**
   * Track event action
   * @param ctx {context}
   * @param event {string}
   * @param properties {object}
   */
  track(ctx, event, properties) {
    utils.generateAnonymousId(ctx);
    const identify = (ctx.state && ctx.state.user) ? {
      userId: ctx.state.user.id,
    } : {
      anonymousId: ctx.state.anonymousId,
    };

    analytics.track({
      ...identify,
      event: event,
      properties: properties,
      integrations: strapi.config.middleware.settings.segment.integrations,
    }, (err, batch) => {
      if (err) {
        strapi.log.error(err);
      }
    });
  }
};
