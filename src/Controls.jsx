import React, {Component} from 'react';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.sendcommand=this.sendcommand.bind(this)
    this.repeat = this.repeat.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.timeouts = {};
  }

  sendcommand(command){
    this.props.sendIt({type:"command", content:command})
  }

  repeat(dir) {
    const fn = () => {
      this.sendcommand(dir)
      this.timeouts[dir] = setTimeout(fn, this.start)
      this.start = this.start / 2
    }
    fn();
  }

  onMouseDown(dir) {
    this.repeat(dir)
  }

  onMouseUp(dir) {
    clearTimeout(this.timeouts[dir]);
    this.start = 100
  }

  render() {
    return (
    <div>
      <div className="controls">
        <div className="controls-heading"> Control Panel </div>

        <div className="control-panel-container">

          <div className="button-container rotated-buttons">
            <button className="button" onMouseDown={() => this.onMouseDown("forward")} onMouseUp={() => this.onMouseUp("forward")}>
              <span className="label">Move Forward</span>
            </button>
            <button className="button" onMouseDown={()=> this.onMouseDown("right") } onMouseUp={() => this.onMouseUp("right")}>
              <span className="label">Move Right</span>
            </button>
            <button className="button" onMouseDown={() => this.onMouseDown("left")} onMouseUp={() => this.onMouseUp("left")}>
              <span className="label">Move Left</span>
            </button>
            <button className="button" onMouseDown={() => this.onMouseDown("backward")} onMouseUp={() => this.onMouseUp("backward")}>
              <span className="label">Move Backward</span>
            </button>
          </div>

          <div className="center-button-container">
            <div className="center-button" onMouseDown={() => this.sendcommand("takeoff")}> Take Off </div>
            <div className="center-button" onMouseDown={() => this.sendcommand("land")}> Land </div>
          </div>

          <div className="button-container rotated-buttons">
            <button className="button" onMouseDown={() => this.onMouseDown("up")} onMouseUp={() => this.onMouseUp("up")}>
              <span className="label">Rise</span>
            </button>
            <button className="button" onMouseDown={()=> this.onMouseDown("clockwise") } onMouseUp={()=> this.onMouseUp("clockwise")}>
              <span className="label">Turn Right</span>
            </button>
            <button className="button" onMouseDown={() => this.onMouseDown("counterclockwise")} onMouseUp={() => this.onMouseUp("counterclockwise")}>
              <span className="label">Turn Left</span>
            </button>
            <button className="button" onMouseDown={() => this.onMouseDown("down")} onMouseUp={() => this.onMouseUp("down")}>
              <span className="label">Lower</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
export default Controls;
