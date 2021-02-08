'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {

  generateAnonymousId(ctx) {
    if (ctx.state && !ctx.state.user && !ctx.state.anonymousId) {
      ctx.state.anonymousId = uuidv4();
    }
  }
};