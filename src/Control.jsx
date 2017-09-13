import React, {Component} from 'react';
import blue from './bluetooth'
var drive = blue.drive

class Control extends Component {

  constructor(props) {
    super(props);
  }
  hello(){
    console.log("welome to hello");
  }
  render() {
    return (
      <div>
        <button type="button" onClick={this.props.sendcommand} >Click Me!</button>
      </div>
    );
  }
}
export default Control;

