const config = {
  development: {
    colors: [
      "red", "blue", "green", "black", "yellow", "cyan", "#3d482f", "#903e5a", "#cb738d",
      "#efa5a9", "#7f9fd0", "#6760aa"
    ],
    POSX_OFFSET: 500,
    POSY_OFFSET: 500,
    SERVER_URI: 'http://localhost:8080/',
    PORT: 8080,
    BIN_FILENAME: 'trotting.bin',
    JSON_FILENAME: 'trotting.json'
  }
};

console.log('NODE_ENV', process.env.NODE_ENV);

module.exports = process.env.NODE_ENV ? config[process.env.NODE_ENV] : config.development;
