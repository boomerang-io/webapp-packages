/**
 * Used for building up links to the CORE applications
 * This value is passed into the container at run time by the helm chart
 * and added to the window as a global variable by the @boomerang/boomerang-webapp-server
 * MAY NOT BE NEEDED
 */
export const BASE_LAUNCH_ENV_URL =
  window._SERVER_DATA && window._SERVER_DATA.BASE_LAUNCH_ENV_URL
    ? window._SERVER_DATA.BASE_LAUNCH_ENV_URL
    : '';
