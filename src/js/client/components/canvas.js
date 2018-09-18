import React from "react";
import { colors, POSX_OFFSET, POSY_OFFSET } from '../../config';

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
    if(targets && targets.length > 0) {
      const ctx = this.refs.canvas.getContext('2d');
      targets.forEach(target => {
        ctx.fillStyle=colors[target.HorseNo];
        ctx.fillRect(target.PosX + POSX_OFFSET, target.PosY + POSY_OFFSET, 1, 1);
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
