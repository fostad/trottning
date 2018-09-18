const packetsDB = require('../db/packets');
const { sendJson } = require('./common');

module.exports = (app) => {
  app.get('/packet', function (req, res) {
    sendJson(res, packetsDB.getPackets());
  });
};
