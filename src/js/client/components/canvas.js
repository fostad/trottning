import React from "react";

const colors = [
  "red", "blue", "green", "black", "yellow", "cyan", "#3d482f", "#903e5a", "#cb738d",
  "#efa5a9", "#7f9fd0", "#6760aa"
]; //TODO better colors

class Canvas extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log('Canvas did mount');
    this.updateCanvas();
  }

  componentDidUpdate(prevProps) {
    if (this.props.targets !== prevProps.targets) {
      this.updateCanvas();
    }
  }

  updateCanvas() {
    const { targets } = this.props;
    console.log('targets', targets);
    if(targets && targets.length > 0) {
      const ctx = this.refs.canvas.getContext('2d');
      targets.forEach(target => {
        ctx.fillStyle=colors[target.HorseNo];
        ctx.fillRect(target.PosX + 800, target.PosY + 500, 1, 1); //TODO offset in config
      });
    }
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width="1000" height="1000" style={{border: '1px solid #d3d3d3'}}>
        </canvas>
      </div>
    );
  }
}

export default Canvas;
