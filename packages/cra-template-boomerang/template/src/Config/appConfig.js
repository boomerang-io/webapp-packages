/**
 * Used for setting up the root context that the application is server on
 * This allows the app to be easily deployed out to multiple environments without recompiling
 * This value is passed into the container at run time by the helm chart
 * and added to the window as a global variable by the @boomerang/boomerang-webapp-server
 */
export const APP_ROOT =
  window._SERVER_DATA && window._SERVER_DATA.APP_ROOT ? window._SERVER_DATA.APP_ROOT : "/BMRG_APP_ROOT_CONTEXT";

export const isDevEnv = process.env.NODE_ENV === "development";
export const isTestEnv = process.env.NODE_ENV === "test";

export const AppPath = {
  Root: "/",
  Teams: "/teams",
  Users: "/users",
};

export const AppLink = {
  Root: () => "/",
  Teams: () => "/teams",
  Users: () => "/users",
};
