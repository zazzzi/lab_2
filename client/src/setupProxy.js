const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
    '/',
      createProxyMiddleware({
        target: 'http://localhost:6969',
        changeOrigin: true,
      })
    );
  };