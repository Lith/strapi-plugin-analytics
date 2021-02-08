var Analytics = require('analytics-node');
const analytics = new Analytics(strapi.config.middleware.settings.segment.writeKey, strapi.config.middleware.settings.segment.options);
const utils = require('../../shared/utils');

module.exports = strapi => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        try {
          await next();
          utils.generateAnonymousId(ctx);
          const identify = (ctx.state && ctx.state.user) ? {
            userId: ctx.state.user.id,
          } : {
            anonymousId: ctx.state.anonymousId,
          };
          analytics.page({
            ...identify,
            properties: {
              method: ctx.request.method,
              path: ctx.request.url,
              referer: ctx.request.header.referer
            }
          });
        } catch (error) {
          throw error;
        }
      });
    },
  };
};
