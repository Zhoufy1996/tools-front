import { useCallback, useState } from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import 'video.js/dist/video-js.css';

export interface VideoProps {
  videoOptions: VideoJsPlayerOptions;
}

const Video = ({ videoOptions = {} }: VideoProps) => {
  const [player, setPlayer] = useState<VideoJsPlayer | null>(null);

  const videoRef = useCallback(
    (node: HTMLVideoElement) => {
      if (node !== null) {
        const videoPlayer = videojs(node, videoOptions, () => {
          console.log('onPlayerReady');
        });
        setPlayer(videoPlayer);
      }
    },
    [videoOptions]
  );

  return (
    <div data-vjs-player>
      <video className="video-js" muted ref={videoRef} />
    </div>
  );
};

export default Video;
