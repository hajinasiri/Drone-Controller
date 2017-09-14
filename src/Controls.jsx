import React, {Component} from 'react';

class Video extends Component {
  constructor(props) {
    super(props);
    this.sendcommand=this.sendcommand.bind(this)
  }

  sendcommand(command){
    console.log("it's being called")
    this.props.sendIt({type:"command", content:command})
  }

  render() {
    return (
    <div>
      <div className="controls">
        <div className="controls-heading"> Control Panel </div>

        <div className="control-panel-container">

          <div className="button-container rotated-buttons">
            <button className="button" onMouseDown={() => this.sendcommand("forward")} onMouseUp={() => this.sendcommand("takeoff")}>
              <span className="label">Move Forward</span>
            </button>
            <button className="button" onMouseDown={() => this.sendcommand("right")} onMouseUp={() => this.sendcommand("takeoff")}>
              <span className="label">Move Right</span>
            </button>
            <button className="button" onMouseDown={() => this.sendcommand("left")} onMouseUp={() => this.sendcommand("takeoff")}>
              <span className="label">Move Left</span>
            </button>
            <button className="button" onMouseDown={() => this.sendcommand("backward")} onMouseUp={() => this.sendcommand("takeoff")}>
              <span className="label">Move Backward</span>
            </button>
          </div>

          <div className="center-button-container">
            <div className="center-button" onMouseDown={() => this.sendcommand("takeoff")}> Take Off </div>
            <div className="center-button" onMouseDown={() => this.sendcommand("land")}> Land </div>
          </div>

          <div className="button-container rotated-buttons">
            <button className="button" onMouseDown={() => this.sendcommand("up")} onMouseUp={() => this.sendcommand("takeoff")}>
              <span className="label">Rise</span>
            </button>
            <button className="button" onMouseDown={() => this.sendcommand("clockwise")} onMouseUp={() => this.sendcommand("takeoff")}>
              <span className="label">Turn Right</span>
            </button>
            <button className="button" onMouseDown={() => this.sendcommand("counterclockwise")} onMouseUp={() => this.sendcommand("takeoff")}>
              <span className="label">Turn Left</span>
            </button>
            <button className="button" onMouseDown={() => this.sendcommand("down")} onMouseUp={() => this.sendcommand("takeoff")}>
              <span className="label">Lower</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
export default Video;
