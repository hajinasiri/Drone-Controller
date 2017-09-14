import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class ChatContainer extends Component {
  constructor(props) {
    super(props);
     this.state = {
    }
  }

  render() {
    return (
      <div>
        <div className="chat-container">
          <NavBar count={this.props.count}/>
          <MessageList Messages={this.props.Messages}/>
          <ChatBar currentUser={this.props.currentUser} updatename={this.props.updatename} updateme={this.props.updateme} />
        </div>
      </div>
    );
  }
}
export default ChatContainer;
