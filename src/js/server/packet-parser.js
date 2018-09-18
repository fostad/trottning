const Parser = require("binary-parser").Parser;
const { has } =  require('ramda');

const HEADER_LENGTH = 18;
const TARGET_LENGTH = 25;

const dataParser = () => {
  return new Parser()
    .endianess("little")
    .uint8('DynamicDataId')
    .uint32('DynamicDataSize')
    .array('DynamicData', {
      type: 'uint8',
      length: 'DynamicDataSize'
    });
};

const targetParser = () => {
  return new Parser()
    .endianess("little")
    .uint8('HorseNo')
    .float('PosX')
    .float('PosY')
    .float('PosZ')
    .float('LaneNumber')
    .float('DistanceToGoalLine')
    .float('Speed');
};

const packetParser = () => {
  return new Parser()
    .endianess("little")
    .uint8('VersionID')
    .uint8('TrackID')
    .uint8('RaceID')
    .doublele('Timestamp')
    .uint8('TargetCount')
    .uint32('DynamicDataSize')
    .uint16('DynamicDataCount')
    .array("Targets", {
      type: targetParser(),
      length: 'TargetCount'
    })
    .array("Data", {
      type: dataParser(),
      length: 'DynamicDataCount'
    });
};

const getPacketLengthInByte = (packet) => {
  if(!packet || !has('TargetCount', packet)  || !has('DynamicDataSize', packet)) {
    throw new Error('getPacketLengthInByte invalid input');
  }
  const length = HEADER_LENGTH + packet.TargetCount *TARGET_LENGTH + packet.DynamicDataSize;
  // console.log('Packet length', length);
  return length;
};


module.exports = {
  packetParser,
  getPacketLengthInByte
};
