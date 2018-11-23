const { reduce, map } = require('ramda');

const calcMean = nums => {
  var sum = reduce((sum, num) => {
    return sum + num;
  }, 0, nums);

  return sum / nums.length;
};

const calcSquareDeviations = (mean, nums) => {
  return map((value) => {
    var deviation = value - mean;
    return deviation * deviation;
  }, nums);
};

const calcStandardDeviation = (nums) => {
  const mean = calcMean(nums);
  const squareDeviations = calcSquareDeviations(mean, nums);
  return Math.sqrt(calcMean(squareDeviations));
};

const calcVariableChange = data => {
  let count = 0;
  let lastValue = -1;
  data.forEach(d => {
    if(d !== lastValue) {
      lastValue = d;
      count++;
    }
  });
  return count;
};

const mapStatistics = (data) => {
  return map(d => {
    return Object.assign(d, {
      SpeedStandardDeviation: calcStandardDeviation(d.Speeds),
      SpeedMean: calcMean(d.Speeds),
      LaneChange: calcVariableChange(d.LaneNumbers)
    });
  }, data);
};

module.exports = {
  calcMean,
  calcSquareDeviations,
  calcStandardDeviation,
  mapStatistics
};
