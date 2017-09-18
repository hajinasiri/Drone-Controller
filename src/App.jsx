import React, {Component} from 'react';
import ReactDom from 'react-dom';
// import Popup from 'react-popup';
import uuid from 'uuid/v1';
import ChatContainer from './ChatContainer.jsx';
import Header from './Header.jsx';
import Video from './Video.jsx';
import Controls from './Controls.jsx';
import QueueContainer from './QueueContainer.jsx';
import MyPopup from './popup.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: ""},
      messages: [],
      users: [],
      count:0,
      lineInfo:[]//[your position in line, other people in line's name]
    };
    this.updateme = this.updateme.bind(this);
    this.updatename = this.updatename.bind(this);
    this.sendIt = this.sendIt.bind(this);
  }
  // this function just sends the JSON.stringified of the input. It's being passed to the controls component
  sendIt(obj) {
    this.ws.send(JSON.stringify(obj));
  }

  updateme (text,id,username) {
    var new_obj = [{username: username, content:text, id:uuid(), type: "postNotification"}];
    this.ws.send(JSON.stringify(new_obj[0]));
  }

  updatename (newname) {
    if(newname){
      var obj = {newname:newname, oldname: " ", type:"name"};
      this.ws.send(JSON.stringify(obj));
      this.setState({
        currentUser: {
          name: newname
        }
      }, ()=>{
        console.log(this.state.currentUser.name);
      });
    }

  }

  componentDidMount() {
    this.ws = new WebSocket('ws://' + location.hostname + ':3001');
    this.ws.addEventListener('open', () => {

    });
    this.ws.addEventListener('message', (event) => {
      var temp = event.data;
      var data=JSON.parse(event.data);
      var mymass = {};
      if(data.type === "name"){
        var news = [{username:"" , content:(data.newname + " joined the page "), id:uuid()}];
        mymass = this.state.messages.concat(news);
        this.setState({messages: mymass});
      }else if(data.type === "postNotification"){
        mymass = this.state.messages.concat([data]);
        this.setState({messages: mymass});

      }else if(data.type === "count"){
        this.setState({count:data.count})
      }else if(data.type === "lineInfo"){
        this.setState({lineInfo: data.lineInfo});
        console.log("lineInfo is",this.state.lineInfo);
      }
    });
    this.ws.onerror = e => this.setState({ error: 'WebSocket error' })
    this.ws.onclose = e => !e.wasClean && this.setState({ error: `WebSocket error: ${e.code} ${e.reason}` })
    console.log("componentDidMount <App />");
    setTimeout(() => {
    console.log("Simulating incoming message");
    });
    MyPopup.plugins().prompt('', 'Type your name', this.updatename);
  }
  componentWillUnmount() {
    this.ws.close()
  }
  render() {

    return (
      <div className="container">
        <MyPopup className= "popup" closeBtn={false} closeOnOutsideClick={false}  />
        <div className="main">
          <Header />
          <Video />
          <Controls sendIt={this.sendIt}/>
        </div>
        <div className="sidebar">
          <QueueContainer currentUser={this.state.currentUser} lineInfo={this.state.lineInfo} sendIt={this.sendIt} />

          <ChatContainer count={this.state.count} Messages={this.state.messages} currentUser={this.state.currentUser} updatename={this.updatename} updateme={this.updateme}/>
        </div>
      </div>
    );
  }
}

export default App;
