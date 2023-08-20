'use client';

import dayjs from 'dayjs';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa6';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useGlobalAudioPlayer } from 'react-use-audio-player';

import { Song } from '@prisma/client';

import usePlayer from '@/hooks/use-player';

interface SongRowProps {
  song: Song;
  index: number;
}

dayjs.extend(relativeTime);

const SongRow: React.FC<SongRowProps> = ({ song, index }) => {
  const setSong = usePlayer((state) => state.setSong);
  const currentSong = usePlayer((state) => state.song);
  const { play, playing, pause } = useGlobalAudioPlayer();
  const isCurrentSong = currentSong?.id == song.id;

  const playSong = () => {
    if (isCurrentSong) {
      if (playing) {
        pause();
      } else {
        play();
      }
    } else {
      setSong(song, song.playlistId);
    }
  };

  return (
    <tr key={song.id.toString()} className="group" onDoubleClick={playSong}>
      <th className="relative">
        <p className="group-hover:hidden">{index + 1}</p>
        <span
          className="absolute bottom-5 hidden group-hover:block tooltip tooltip-right"
          data-tooltip={`${isCurrentSong && playing ? 'Pause' : 'Play'} ${
            song.name
          }`}
          onClick={playSong}
        >
          {isCurrentSong && playing ? <FaPause /> : <FaPlay />}
        </span>
      </th>
      <td>{song.name}</td>
      <td>{song.artist || 'n/a'}</td>
      <td>{song.album || 'n/a'}</td>
      <td>{dayjs(song.createdAt).fromNow()}</td>
    </tr>
  );
};

export default SongRow;
