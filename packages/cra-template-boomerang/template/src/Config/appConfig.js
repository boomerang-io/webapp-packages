/**
 * Used for setting up the root context that the application is server on
 * This allows the app to be easily deployed out to multiple environments without recompiling
 * This value is passed into the container at run time by the helm chart
 * and added to the window as a global variable by the @boomerang/boomerang-webapp-server
 */
export const APP_ROOT =
  window._SERVER_DATA && window._SERVER_DATA.APP_ROOT
    ? window._SERVER_DATA.APP_ROOT
    : '';

    export const AppPath = {
      Root: "/",
      Error: "/error",
    };
    
    export const appLink = {
      root: () => "/",
      error: () => "/error"
    };
    