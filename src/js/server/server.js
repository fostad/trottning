const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require ('../../../webpack.config');
const express = require('express');
const fileParser = require('./file-parser');
const packetsDB = require('./db/packets');
const { PORT } = require('../config');

const FILENAME = 'trotting.bin';

const app = express();

const compiler = webpack(webpackConfig);

const devCompiler = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {colors: true},
  noInfo: true
});

try {
  packetsDB.setPackets(fileParser.parseFile(FILENAME));
} catch (e) {
  console.log(e);
}


app.use(devCompiler);

require('./routes/packet-routes')(app);

app.listen(PORT, function () {
  console.log('Server running on port ' + PORT); //TODO move to config
});
