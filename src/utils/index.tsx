import WebTorrent from 'webtorrent';

const client = new WebTorrent();
const torrentId =
  'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';

client.add(torrentId, (torrent) => {
  torrent.name;
  torrent.infoHash;
  torrent.magnetURI;
  torrent.torrentFile;
  torrent.torrentFileBlobURL;
  torrent.announce;
  torrent.files;
  torrent.pieces;
  torrent.pieceLength;
  torrent.lastPieceLength;
  torrent.timeRemaining;
  torrent.received;
  torrent.downloaded;
  torrent.uploaded;
  torrent.downloadSpeed;
  torrent.uploadSpeed;
  torrent.progress;
  torrent.ratio;
  torrent.numPeers;
  torrent.maxWebConns;
  torrent.path;
  torrent.ready;
  torrent.paused;
  torrent.done;
  torrent.length;
  torrent.created;
  torrent.comment;
  torrent.destroy;
  torrent.addPeer;
  torrent.addWebSeed;
  torrent.removePeer;
  torrent.select;
  torrent.deselect;
  torrent.createServer;

  torrent.pause;
  torrent.resume;
  torrent.on('infoHash', () => {});
  torrent.on('metadata', () => {});
  torrent.on('ready', () => {});
  torrent.on('warning', () => {});
  torrent.on('error', () => {});
  torrent.on('download', () => {});
  torrent.on('upload', () => {});
  torrent.on('wire', () => {});
  torrent.on('noPeers', () => {});

  torrent.files.forEach((file) => {
    file.name;
    file.path;
    file.length;
    file.downloaded;
    file.progress;
    file.select;
    file.deselect;
    const stream = file.createReadStream();
    file.getBuffer;
    file.appendTo;
    file.renderTo;
    file.getBlob;
    file.getBlobURL((err, url) => {
      if (err) throw err;
      const a = document.createElement('a');
      a.download = file.name;
      a.href = url;
      a.textContent = 'Download ' + file.name;
      document.body.appendChild(a);
    });

    file.streamTo;
    file.getStreamURL;

    file.on('stream', ({ stream, file, req }, cb) => {
      if (req.destination === 'audio' && file.name.endsWith('.dts')) {
        const transcoder = new SomeAudioTranscoder();
        stream.pipe(transcoder);
        cb(transcoder);
        // do other things
      }
    });
  });

  const file = torrent.files.find(function (file) {
    return file.name.endsWith('.mp4');
  });

  // Render to a <video> element by providing an ID. Alternatively, one can also provide a DOM element.
  file.renderTo('video#video-container_html5_api', {}, () => {
    console.log('Ready to play!');
  });
});

client.seed('xx', () => {});

client.on('torrent', () => {});
client.on('error', () => {});
client.remove(torrentId, {}, () => {});
client.destroy();
client.torrents;
client.downloadSpeed;
client.uploadSpeed;
client.progress;
client.ratio;

// https://github.com/webtorrent/webtorrent/blob/master/docs/api.md

// interface WebTorrentContext {
//   value: {};
//   setValue: Dispatch<SetStateAction<{}>>;
// }

// const webTorrentContext = createContext<WebTorrentContext>({
//   value: {},
//   setValue: () => {},
// });

// export const useTorrent = () => {
//   const { value, setValue } = useContext(webTorrentContext);

//   const addTorrent = client.add;
//   const seedTorrent = client.seed;
//   const listener = client.on;

//   return {
//     addTorrent,
//     seedTorrent,
//     listener,
//   };
// };

// export const WebTorrentProvider = ({ children }: { children: ReactNode }) => {
//   const [value, setValue] = useState({});
//   return <webTorrentContext.Provider value={{ value, setValue }}>{children}</webTorrentContext.Provider>;
// };
