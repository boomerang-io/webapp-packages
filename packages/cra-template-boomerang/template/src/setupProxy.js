// https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually

const proxy = require('http-proxy-middleware');
const portForwardMap = require('./setupPortForwarding');

/**
 * Optionally proxy requests for port forwarding
 * @param {object} app - development server
 */
module.exports = function setupProxy(app) {
  if (process.env.REACT_APP_PORT_FORWARD) {
    Object.entries(portForwardMap).forEach(([path, port]) => {
      if (!path) {
        return;
      }
      app.use((req, res, next) => {
        req.headers['Authorization'] = `Bearer ${process.env.REACT_APP_JWT}`;
        next();
        return;
      });
      app.use(
        path,
        proxy({
          target: `http://localhost:${port}`,
          changeOrigin: true,
        })
      );
    });
  }
};
