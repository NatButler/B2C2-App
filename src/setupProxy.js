const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.uat.b2c2.net",
      changeOrigin: true,
    })
  );
};
