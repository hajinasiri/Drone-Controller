import React, {Component} from 'react';
import Message from './Messages.jsx'

class MessageList extends Component {
  render() {
    const temp = this.props.Messages.map((message, index) => {
      return (<Message type={ message.type} key={ message.id } username={ message.username } content={ message.content } />);
    });

    return (
      <div>
      {temp}
      </div>
    )
  }
}
export default MessageList;