import React, {Component} from 'react';

class QueueContainer extends Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 60 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    let seconds = secs;

    let obj = {
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }
  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
    <div>
      <div className="request-control">Request Control</div>
      <div className="queue-container">
        <div className="queue-heading">
          Current Queue
        </div>
        <div className="queue-list">
          <div className="users-item active">
            <div className="queue-current">
              <span className="users-name">ESHA</span>
              <button className="button-click" onClick={this.startTimer}>Start</button>
              <span> {this.state.time.s} seconds remaining</span>
            </div>
          </div>
          <div className="users-item">
            <span className="users-name">HANNAH</span>
          </div>
          <div className="users-item">
            <span className="users-name">SHAHAB</span>
          </div>
          <div className="users-item">
            <span className="users-name">...3 MORE USERS IN QUEUE</span>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
export default QueueContainer;