const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require ('../../../webpack.config');
const express = require('express');
const fileParser = require('./file-parser');
const packetsDB = require('./db/packets');

const FILENAME = 'trotting.bin';

const app = express();

const compiler = webpack(webpackConfig);

const devCompiler = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {colors: true},
  noInfo: true
});

packetsDB.setPackets(fileParser.parseFile(FILENAME));

app.use(devCompiler);

require('./routes/packet-routes')(app);

app.listen(8080, function () {
  console.log('Server running on port ' + 8080); //TODO move to config
});
