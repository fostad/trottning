import React from "react";
import { connect } from "react-redux";
import moment from 'moment';

import Canvas from './canvas';

let timer;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      timerStarted: undefined
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    if (this.props.packets !== prevProps.packets) {
      this.startTimer();
    }
  }

  startTimer() {
    const { timerStarted } = this.state;
    const { packets } = this.props;
    if(!timerStarted && packets && packets.length > 0 ) {
      this.setState({
        timerStarted: true
      });
      this.updateTargets();
    }
  }

  updateTargets() {
    console.log('startTimer');
    const { packets } = this.props;
    const timeDiff = moment(packets[1].Timestamp).diff(moment(packets[0].Timestamp));
    console.log('timeDiff', timeDiff);
    timer = setInterval(() => {
      if(this.state.index >= packets.length - 1) {
        clearInterval(timer);
      } else {
        this.setState({
          index: this.state.index + 1
        });
      }
    }, timeDiff);
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  render() {
    const { index } = this.state;
    const { packets } = this.props;
    const targets = packets && packets.length > 0  ?  packets[index].Targets : undefined;
    return (
      <div>
        <Canvas targets={targets}/>
      </div>
    );
  }
}

export default connect(state => {
  return {
    packets: state.packets // TODO sort this based on time
  };
}, null) (Game);
