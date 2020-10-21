import { Server, Serializer, Model } from "miragejs";
import { inflections } from "inflected";
import { serviceUrl } from "Config/servicesConfig";
import * as fixtures from "./fixtures";

export function startApiServer({ environment = "test", timing = 0 } = {}) {
  inflections("en", function (inflect) {
    // Prevent pluralization bc our apis are weird
    // inflect.irregular("navigation", "navigation");
  });

  return new Server({
    environment,
    // Load in mock data
    fixtures,
    // Return the data as is, don't add a root key
    serializers: {
      application: Serializer.extend({
        root: false,
        embed: true,
      }),
    },
    // Register the data as a model so we can use the schema
    models: {
      navigation: Model,
      userProfile: Model,
      user: Model,
    },

    routes() {
      // Control how long the responses take to resolve
      this.timing = timing;

      // Allow unhandled requests on the current domain to pass through
      this.passthrough();

      this.get("/info", () => []);

      /**
       * Simple GET of static data
       */
      // App
      this.get(serviceUrl.resourceUserProfile(), (schema) => {
        return schema.db.userProfile[0];
      });

      this.get(serviceUrl.resourceNavigation(), (schema) => {
        return schema.db.navigation[0];
      });

      this.get(serviceUrl.resourceUsers());
    },
  });
}
