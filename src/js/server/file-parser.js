const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { packetParser, getPacketLengthInByte } = require('./packet-parser');

const parsePacket = (buf) => {
  return packetParser().parse(buf);
};

const readFile = (filename) => {
  if(!filename) {
    throw new Error('readFile filename is missing');
  }
  const filepath = path.join('bins', filename);
  console.log('filepath', filepath);
  const binary = fs.readFileSync(filepath);
  const buf = Buffer.from(binary, 'bin');
  console.log('buf.length', buf.length);
  return buf;
};

const calcTime = (timestamp) => {
  if(!timestamp) {
    throw new Error('calcTime invalid input');
  }
  return moment(timestamp * 1000);
};

const parseBuf = (buf) => {
  if(!buf || buf.length <= 0) {
    throw new Error('parseFile the buffer is empty or missing');
  }

  let i = 0;
  let packets = [];
  while (i < buf.length) {
    const parsedPacket = parsePacket(buf.slice(i));
    packets.push(Object.assign(parsedPacket, {Timestamp: calcTime(parsedPacket.Timestamp)}));
    i = i + getPacketLengthInByte(parsedPacket)*2;
  }
  console.log('packets', JSON.stringify(packets, null, 4));
  console.log('packets length', packets.length);
  return packets;
};

const parseFile = (filename) => {
  const packetsBuf = readFile(filename);
  return parseBuf(packetsBuf);
};

module.exports = {
  parseFile
};
