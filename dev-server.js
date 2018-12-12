/**
 * Created by txl-pc on 2017/7/7.
 */
var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");
var proxyMiddleware = require('http-proxy-middleware');
var    proxyTable = {
  '/facile': {
    target: 'http://47.52.128.170',
    changeOrigin: true,
    pathRewrite: {
      '^/facile': '/facile'
    }
  }
}

var app = express();
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: "/" // 大部分情况下和 `output.publicPath`相同
}));
app.use(require('webpack-hot-middleware')(compiler, {
  log: () => {}
}))
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

app.listen(3009, function () {
  console.log("Listening on port 3009!");
});