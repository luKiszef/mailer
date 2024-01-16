const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    [
      "/api/mail",
      "/api/emails",
      "/api/users",
      "/api/user",
      "/api/admin/login",
      "/api/user/login",
    ],
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    }),
  );
};
