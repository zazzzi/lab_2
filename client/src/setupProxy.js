const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
    '/express_backend',
      createProxyMiddleware({
        target: 'http://localhost:6969',
        changeOrigin: true,
      })
    );
  };