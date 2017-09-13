import React, {Component} from 'react';

class QueueContainer extends Component {
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
              <span>0:30</span>
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