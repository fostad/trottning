const status = require('http-status');
const { isEmpty, isNil } = require('ramda');

const sendJson = (res, data) => {
  if(!data || isEmpty(data) || isNil(data)) {
    res.status(status.NOT_FOUND);
    return;
  }
  res.status(status.OK);
  res.json(data);
};

module.exports = {
  sendJson
};
