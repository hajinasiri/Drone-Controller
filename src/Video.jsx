import React, {Component} from 'react';
// import apikey from 'apikey';
import YoutubeLive from 'youtube-live-react';

class Video extends Component {
  render() {
    return (
    <div>
      <div className="video">
        <iframe
          src="http://player.twitch.tv/?channel=hkimmm&muted=true"
          height="300"
          width="400"
          frameborder="0"
          scrolling="no"
          allowfullscreen="true" />
      </div>
    </div>
    )
  }
}
export default Video;