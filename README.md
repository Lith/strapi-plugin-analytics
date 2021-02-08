# strapi-plugin-analytics

This plugin allow you to add Server Side Analytics to Strapi.

## List of Analytics solution implemented

- [Segment.io](https://segment.com/docs/connections/sources/catalog/libraries/server/node/)

## Feature

By default, the plugin send page event via Middleware.
You can add custom track event into your own function then.

## Installation

This plugin is in alpha-testing release for now, so it's not available on NPM, you need to install it from GitHub url to test it :

```shell
yarn add https://github.com/Lith/strapi-plugin-analytics.git
```

## Configuration

### Enable Segment Analytics

1. Edit the file `config/middleware.js`
2. Add `segment` part into `settings`

```javascript
module.exports = {
  settings: {
    segment: {
      enabled: true,
      debug: false,
      writeKey: '<SegmentWriteKey>',
      options: {
        host: 'https://api.segment.io',
        timeout: false,
        flushAt: 20,
        flushInterval: 10000,
        retryCount: 3
      },
      integrations: {
        'All': true
      }
    }
  }
};
```

#### Configure `options`

- https://segment.com/docs/connections/sources/catalog/libraries/server/node/#configuration

#### Configure `integrations`

- https://segment.com/docs/connections/sources/catalog/libraries/server/node/#selecting-destinations

## Identify users

When user's log in, you can call the identify method :

````javascript
    /**
     * Identify user 
     * @param ctx {context}
     */
    await strapi.plugins.analytics.services.segment.identify(ctx);
````

## Track event

You can call the segment services into controllers :

```javascript
    /**
     * Tracking Analytics
     * @param ctx {context}
     * @param event {string}
     * @param properties {object}
     */
    await strapi.plugins.analytics.services.segment.track(ctx, 'Event Name', {
        custom_properties_name1: 'Custom properties value 1',
        custom_properties_name2: 'Custom properties value 2'
    });
```


