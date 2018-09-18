const packets = (state = [], action) => {
  console.log(action.type);
  switch(action.type) {
  case 'SAVE_PACKETS':
    return action.payload;
  default:
    return state;
  }
};

export default packets;
