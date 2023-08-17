'use client';

import dayjs from 'dayjs';
import { FaPlay } from 'react-icons/fa';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Song } from '@prisma/client';

import usePlayer from '@/hooks/use-player';

interface SongRowProps {
  song: Song;
  index: number;
}

dayjs.extend(relativeTime);

const SongRow: React.FC<SongRowProps> = ({ song, index }) => {
  const player = usePlayer();

  const playSong = () => {
    player.setSong(song);
  };

  return (
    <tr key={song.id.toString()} className="group" onDoubleClick={playSong}>
      <th className="relative">
        <p className="group-hover:hidden">{index + 1}</p>
        <span
          className="absolute bottom-5 hidden group-hover:block tooltip tooltip-right"
          data-tooltip={`Play ${song.name}`}
          onClick={playSong}
        >
          <FaPlay />
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
