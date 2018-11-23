import React from "react";
import { find, propEq, has, map, sort } from 'ramda';
import { connect } from "react-redux";
import Chart from 'chart.js';
import { mapStatistics } from '../services/statistic';
import { colors } from '../../config';

const canvasWidth = "200";
const canvasHeight = "200";
const canvasStyle = {
  border: '1px solid #d3d3d3'
};

const sortByRate = (a, b) => a.Rate - b.Rate;

const buildBarChart = (ctx, horses, lable, key) => {
  return new Chart(ctx, {
    responsive: true,
    maintainAspectRatio: false,
    type: 'bar',
    data: {
      labels: map(horse => horse.HorseNo, sort((a, b) => sortByRate(a, b), horses)),
      datasets: [{
        label: 'Y-axis: ' + lable + ', X-axis: HorseNo',
        data: map(horse => horse[key], sort((a, b) => sortByRate(a, b), horses)),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:false
          }
        }]
      }
    }
  });
};

const getHorses = (packets) => {
  if(!packets || packets.length <= 0) {
    throw new Error('Packet is empty');
  }
  let count = 1;
  const horses = packets[0].Targets.map(target =>  {
    return {
      HorseNo: target.HorseNo,
      Speeds: [],
      LaneNumbers: [],
      initialDistanceDistanceToGoalLine: target.DistanceToGoalLine
    };
  });
  packets.forEach(packet => {
    horses.forEach(horse => {
      const target = find(propEq("HorseNo", horse.HorseNo), packet.Targets);
      if(!has('Rate', horse) && target.DistanceToGoalLine === 0) {
        console.log('HorseNo', horse.HorseNo);
        console.log('rank', count);
        horse.Rate = count;
        count++;
      }
      horse.Speeds.push(target.Speed);
      horse.LaneNumbers.push(target.LaneNumber);
    });
  });
  return horses;
};

const getStatistics = (packets) => {
  const horses = getHorses(packets);
  return mapStatistics(horses);
};

const CanvasDiv = (props) => {
  return (
    <div class="chart-container" style={{position: 'relative', width: 400, height: 400}}>
      {props.children}
    </div>
  );
};

class Statistic extends React.Component {
  constructor() {
    super();
    this.state = {
      horses: undefined
    };
  }

  componentDidMount(){
    console.log('statistic did mount', this.props);
    if(this.props.packets && this.props.packets.length > 0) {
      this.updateStatistic();
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.packets !== prevProps.packets) {
      console.log('componentDidUpdate');
      this.updateStatistic();
    }
  }

  updateStatistic() {
    console.log('updateStatistic');
    const { packets } = this.props;
    if(packets && packets.length > 0) {
      const horses = getStatistics(packets);
      console.log('horses', horses);
      this.updateCanvas(horses);
      this.setState({
        horses: horses
      });
    }
  }

  updateCanvas(horses) {
    console.log('updateCanvas');

    const standardDeviationCtx = this.refs.standardDeviationChart.getContext('2d');
    const meanCtx = this.refs.meanChart.getContext('2d');
    const laneNumberCtx = this.refs.laneNumberChart.getContext('2d');
    const distanceCtx = this.refs.distanceChart.getContext('2d');

    const standardDeviationChart = buildBarChart(standardDeviationCtx, horses, 'Speed Standard Deviation', 'SpeedStandardDeviation');
    const meanChart = buildBarChart(meanCtx, horses, 'Speed Mean', 'SpeedMean')
    const laneNumberChart = buildBarChart(laneNumberCtx, horses, 'Lane change', 'LaneChange');
    const distanceChart = buildBarChart(distanceCtx, horses, 'Initial Distance to Goal Line', 'initialDistanceDistanceToGoalLine');
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <div style={{marginTop: '5px'}}><span>Not that X-axis is sorted based on the winner horse on the far left and the last one on the far right</span></div>
        <div style={{ display: 'flex', marginTop: '5px'}}>
          <CanvasDiv>
            <canvas ref="standardDeviationChart" width={canvasWidth} height={canvasHeight} style={canvasStyle}/>
          </CanvasDiv>
          <CanvasDiv>
            <canvas ref="meanChart" width={canvasWidth} height={canvasHeight} style={canvasStyle}/>
          </CanvasDiv>
        </div>
        <div style={{ display: 'flex'}}>
          <CanvasDiv>
            <canvas ref="laneNumberChart" width={canvasWidth} height={canvasHeight} style={canvasStyle}/>
          </CanvasDiv>
          <CanvasDiv>
            <canvas ref="distanceChart" width={canvasWidth} height={canvasHeight} style={canvasStyle}/>
          </CanvasDiv>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    packets: state.packets
  };
}, null)(Statistic);
