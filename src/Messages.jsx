import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.type === "postNotification") {
    return (
        <div>
          <div className="message-container">
            <span className="message-username">{this.props.username}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        </div>
      )
    } else {
      return (<div className="message system">
                {this.props.content}
        </div>)
    }
  }
}
export default Message;
