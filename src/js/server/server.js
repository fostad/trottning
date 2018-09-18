const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const express = require('express');
const { map } = require('ramda');

const webpackConfig = require ('../../../webpack.config');
const fileParser = require('./file-parser');
const packetsDB = require('./db/packets');
const { PORT, BIN_FILENAME, JSON_FILENAME } = require('../config');

const app = express();

const compiler = webpack(webpackConfig);

const devCompiler = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {colors: true},
  noInfo: true
});

try {
  const packets = fileParser.parseFile(BIN_FILENAME);
  fileParser.writeJsonFile(JSON_FILENAME, packets);
  const mappedPackets = map(packet => {
    return {
      Timestamp: packet.Timestamp,
      Targets: packet.Targets
    };
  } ,packets);
  packetsDB.setPackets(mappedPackets);
} catch (e) {
  console.log(e);
}


app.use(devCompiler);

require('./routes/packet-routes')(app);

app.listen(PORT, function () {
  console.log('Server running on port ' + PORT); //TODO move to config
});
