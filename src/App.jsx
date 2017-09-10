import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'
import NavBar from './NavBar.jsx'
const uuid = require('uuid/v1');






class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      count:0
    };
    this.updateme = this.updateme.bind(this);
    this.updatename = this.updatename.bind(this);
  }

  updateme (text,id,username) {
    var new_obj = [{username: username, content:text, id:uuid(), type: "postNotification", count:0}];
    this.ws.send(JSON.stringify(new_obj[0]));


      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.

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
    console.log(HOST);
    // this.ws = new WebSocket(HOST);
    this.ws = new WebSocket('ws://localhost:3001');
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




      // const newMessages = this.state.messages;
      // const messageObject = JSON.parse(event.data);
      // newMessages.push(messageObject);
      // this.setState({messages: newMessages});
    });
    // this.ws.onmessage= e => {

    //   console.log(message)};/*this.setState({ users: Object.values(JSON.parse(e.data)) })*/
    this.ws.onerror = e => this.setState({ error: 'WebSocket error' })
    this.ws.onclose = e => !e.wasClean && this.setState({ error: `WebSocket error: ${e.code} ${e.reason}` })

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store

      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.

    });
  }

  componentWillUnmount() {
    this.ws.close()
  }


  render() {
    return (
      <div>
          <NavBar count={this.state.count}/>
          <MessageList Messages={this.state.messages}/>
          <ChatBar currentUser={this.state.currentUser} updatename={this.updatename} updateme={this.updateme} />
      </div>
    );
  }
}
export default App;
