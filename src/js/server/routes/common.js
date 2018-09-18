const status = require('http-status');
const { isEmpty } = require('ramda');

const sendJson = (res, data) => {
  if(!data || isEmpty(data)) {
    res.status(status.NOT_FOUND);
    return;
  }
  res.status(status.OK);
  res.json(data);
};

module.exports = {
  sendJson
};
