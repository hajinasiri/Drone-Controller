import React, {Component} from 'react';
import Message from './Messages.jsx'

class MessageList extends Component {
  render() {
    const theMessage = this.props.Messages.map((message, index) => {
      return (<Message type={ message.type} key={ message.id + "whatever"} username={ message.username } content={ message.content } />);
    });
    return (
      <div>
      {theMessage}
      </div>
    )
  }
}
export default MessageList;
