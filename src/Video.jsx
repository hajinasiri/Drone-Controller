import React, {Component} from 'react';

class Video extends Component {
  render() {
    return (
    <div>
      <div className="video">
        <iframe
          src="http://player.twitch.tv/?channel=hkimmm&muted=true"
          height="300"
          width="800"
          scrolling="no" />
      </div>
    </div>
    )
  }
}
export default Video;