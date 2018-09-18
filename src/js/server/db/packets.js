let packets = [];

const setPackets = (p) => {
  this.packets = p;
};

const getPackets = () => {
  return this.packets;
};

module.exports = {
  setPackets,
  getPackets
};
