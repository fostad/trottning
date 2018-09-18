const { SERVER_URI } = require('../../config.js');
const _fetch = (uri, {
  method, body
}) => {

  const params = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  };

  console.log(method + uri);

  return fetch(SERVER_URI + uri, params)
    .then(function(response) {
      if(response.status === 404) {
        return Promise.resolve();
      }

      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }

      return response.json();
    })
    .catch(e => console.log(e));
};

const _get = (uri) => {
  return _fetch(uri, {
    method: 'GET'
  });
};

const getPackets = () => {
  return _get('packet');
};

module.exports = {
  getPackets
};
