import React, {Component} from 'react';
import SideBar from './SideBar.jsx';
import Header from './Header.jsx';
import Video from './Video.jsx';
import Controls from './Controls.jsx';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="main">
          <Header />
          <Video />
          <Controls />
        </div>
        <div className="sidebar">
          <SideBar />
        </div>
      </div>
    );
  }
}
export default App;
