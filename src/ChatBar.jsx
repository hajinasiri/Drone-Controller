import React, {Component} from 'react';



class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uname: this.props.currentUser.name,
      oldname: this.props.currentUser.name,
      message: '',
      text:''
    }
  }

  handlecheck = (event) => {
    if (event.charCode === 13 /* Enter */) {
      var myname = this.state.uname;
      var old=this.state.oldname;
      this.props.updatename(myname,old);
      this.setState({oldname: this.state.uname})

    }
  }

  changemess = (event) => {
    this.setState({text: event.target.value})
  }

  changeName = (event) => {
    this.setState({uname: event.target.value})

  }

  handleClick = (event) => {
    if (event.charCode === 13) {


      var mymess = event.target.value;
      this.props.updateme(mymess,1,this.state.uname);
      this.setState({text:""})
    }
  }

  render() {

    return (
        <div>

          <footer className="chatbar">
            <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.state.uname} onChange={this.changeName} onKeyPress={this.handlecheck} />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" value = {this.state.text} onChange ={this.changemess} onKeyPress={this.handleClick}/>

          </footer>
      </div>
    )
  }
}

export default ChatBar;



