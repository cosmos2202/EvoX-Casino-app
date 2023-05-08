const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api"],
    createProxyMiddleware({
      target: "http://127.0.0.1:3333",
    })
  );
  app.use(
    ["/api"],
    createProxyMiddleware({
      target: "http://127.0.0.1:3333",
    })
  );
};