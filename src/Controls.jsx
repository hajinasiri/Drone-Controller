import React, {Component} from 'react';

class Video extends Component {
  render() {
    return (
    <div>
      <div className="controls">
        <h2 className="control-panel-line"><span> Control Panel </span></h2>

        <div className="control-panel-container">

          <div className="button-container rotated-buttons">
            <button className="button"><span className="label">Move Forward</span></button>
            <button className="button"><span className="label">Move Right</span></button>
            <button className="button"><span className="label">Move Left</span></button>
            <button className="button"><span className="label">Move Backward</span></button>
          </div>

          <div className="center-button-container">
            <div className="center-button"> Take Off </div>
            <div className="center-button"> Land </div>
          </div>

          <div className="button-container rotated-buttons">
            <button className="button"><span className="label">Rise</span></button>
            <button className="button"><span className="label">Turn Right</span></button>
            <button className="button"><span className="label">Turn Left</span></button>
            <button className="button"><span className="label">Lower</span></button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
export default Video;