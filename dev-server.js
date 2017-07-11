/**
 * Created by txl-pc on 2017/7/7.
 */
var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");

var app = express();
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: "/" // 大部分情况下和 `output.publicPath`相同
}));
app.use(require('webpack-hot-middleware')(compiler, {
  log: () => {}
}))

app.listen(3009, function () {
  console.log("Listening on port 3009!");
});