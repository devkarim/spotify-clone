'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Song } from '@prisma/client';
import { FaPlay } from 'react-icons/fa';
import SongRow from './song-row';

interface SongsListProps {
  songs: Song[];
}

dayjs.extend(relativeTime);

const SongsList: React.FC<SongsListProps> = ({ songs }) => {
  return (
    <div className="flex w-full overflow-x-auto select-none">
      {songs.length != 0 ? (
        <table className="table-hover table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Date added</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <SongRow key={song.id.toString()} song={song} index={index} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="opacity-60 text-center w-full">No songs found.</p>
      )}
    </div>
  );
};

export default SongsList;
