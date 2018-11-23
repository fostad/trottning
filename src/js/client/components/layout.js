import React from "react";
import Statistic from "./statistic";
import Game from "./game";

const btnDisabled = (btn, display) => {
  return btn === display ? true : false;
};

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      display: 'game'
    };
  }

  handleClick(display) {
    return () => {
      this.setState({
        display: display
      });
    };
  }

  render() {
    const { display } = this.state;
    return (
      <nav class="navbar navbar-default navbar-fixed-top"
        style={{fontWeight: 'bold', fontSize: '14px', borderBottomWidth: '0px'}}
      >
        <div class="navbar-header">
          <button onClick={this.handleClick('statistic')} disabled={btnDisabled('statistic', display)}>Statistic</button>
          <button onClick={this.handleClick('game')} disabled={btnDisabled('game', display)}>Game</button>
        </div>
        <div >
          {
            display === 'game' ? <Game /> : <Statistic />
          }
        </div>
      </nav>
    );
  }
}

export default Layout;
