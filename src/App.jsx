import React, {Component} from 'react';
import ChatContainer from './ChatContainer.jsx';
import Header from './Header.jsx';
import Video from './Video.jsx';
import Controls from './Controls.jsx';
const uuid = require('uuid/v1');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "New Guest"},
      messages: [],
      count:0
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
    var new_obj = [{username: username, content:text, id:uuid(), type: "postNotification", count:0}];
    this.ws.send(JSON.stringify(new_obj[0]));
  }

  updatename (newname, oldname) {
    if(!(newname === oldname)){
      var obj = {newname:newname , mytype:"name", oldname: oldname, type:"name"};
      this.ws.send(JSON.stringify(obj));
      this.setState({
        currentUser: {
          name: name
        }
      });
    }
  }

  componentDidMount() {

    var HOST = location.origin.replace(/^http/, 'ws')// for deploying on heroku
    console.log("HOST is ______");
    console.log('ws://' + location.hostname + ':3001');
    // // this.ws = new WebSocket(HOST);
    this.ws = new WebSocket('ws://' + location.hostname + ':3001');
    this.ws.addEventListener('open', () => {

    });
    this.ws.addEventListener('message', (event) => {
      var temp = event.data;
       var data=JSON.parse(event.data);
       var mymass = {};
      if(data.type === "name"){
        var news = [{username:"" , content:(data.oldname + " changed their name to "+ data.newname), id:uuid(), count:0}];
        mymass = this.state.messages.concat(news);
        this.setState({messages: mymass});

      }else if(data.type === "postNotification"){
        mymass = this.state.messages.concat([data]);
        this.setState({messages: mymass});

      }else if(data.type === "count"){
        this.setState({count:data.count})
      }
    });
    this.ws.onerror = e => this.setState({ error: 'WebSocket error' })
    this.ws.onclose = e => !e.wasClean && this.setState({ error: `WebSocket error: ${e.code} ${e.reason}` })

    console.log("componentDidMount <App />");
    setTimeout(() => {
    console.log("Simulating incoming message");
    });
  }

  componentWillUnmount() {
    this.ws.close()
  }
  render() {
    return (
      <div className="container">
        <div className="main">
          <Header />
          <Video />
          <Controls sendIt={this.sendIt}/>
        </div>
        <div className="sidebar">
          <ChatContainer count={this.state.count} Messages={this.state.messages} currentUser={this.state.currentUser} updatename={this.updatename} updateme={this.updateme}/>
        </div>
      </div>
    );
  }
}
export default App;



