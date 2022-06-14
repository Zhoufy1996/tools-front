import { useEffect, useRef } from 'react';
import Video from '../src/components/Video';
import WebTorrent from 'webtorrent';

const client = new WebTorrent();
const torrentId =
  'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';

// 一些想法
// torrent => parse => video => watching
// torrent => parse => file => save
// file => create => torrentId => share
// torrent search
// backend torrent spider
const Torrent = () => {
  useEffect(() => {
    client.add(torrentId, function (torrent) {
      // Torrents can contain many files. Let's use the .mp4 file
      const file = torrent.files.find(function (file) {
        return file.name.endsWith('.mp4');
      });

      // Render to a <video> element by providing an ID. Alternatively, one can also provide a DOM element.
      torrent.on('download', function (bytes) {
        console.log('just downloaded: ' + bytes);
        console.log('total downloaded: ' + torrent.downloaded);
        console.log('download speed: ' + torrent.downloadSpeed);
        console.log('progress: ' + torrent.progress);
      });
      file && file.appendTo('body');
    });
  }, []);
  return null;
  // return <Video videoOptions={videoJsOptions} />;
};

export default Torrent;
