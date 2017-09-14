import React, {Component} from 'react';
// import apikey from 'apikey';
import YoutubeLive from 'youtube-live-react';

class Video extends Component {
  render() {
    return (
    <div>
      <div className="video">
        <YoutubeLive
          iframeWidth={400}
          iframeHeight={300}
          maxResults={1}
          youtubeChannelId='UCLA_DiR1FfKNvjuUpBHmylQ'
          googleApiKey= { process.env.GOOGLE_API_KEY } />
      </div>
    </div>
    )
  }
}
export default Video;