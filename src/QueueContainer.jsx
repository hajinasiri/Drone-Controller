import React, {Component} from 'react';

class QueueContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reqstate: -1,
      mytext: "Request Control",
      uname: this.props.currentUser.name,
      time: {},
      seconds: 60 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if((this.props.lineInfo.length !== 0) && (this.props.lineInfo[this.props.lineInfo.length - 1] !== -1)){
      if(confirm('Cancel the request?')) {
        this.props.sendIt({type:"request",name:this.props.currentUser.name, reqstate: -1});
      }
    }else{
      this.props.sendIt({type:"request",name:this.props.currentUser.name, reqstate: 1});

    }
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
    this.setState({ time: timeLeftVar});
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

// const Child = ({onClick, text}) => (<button onClick={onClick}>{text}</button>)

  render() {
    return (
    <div>
     <div className="request-control">
              <button className="request" onClick={this.handleClick}>{this.props.buttontext }<img id ="request-logo" src="../img/request-icon.png" /> </button>
            </div>
      <div className="queue-container">
        <div className="queue-heading">Current Queue</div>
        <div className="queue-list">
          <div className="users-item active">
            <div className="queue-current">
              <span className="users-name">{this.props.lineInfo[0]}</span>
              <button className="button-click" onClick={this.startTimer}>Start</button>
              <span> {this.state.time.s} seconds remaining</span>
            </div>
          </div>

          <div className="users-item">
            <span className="users-name">{this.props.lineInfo[1]}</span>
          </div>

          <div className="users-item">
            <span className="users-name">{this.props.lineLength}</span>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
export default QueueContainer;
