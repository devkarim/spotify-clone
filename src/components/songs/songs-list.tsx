'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Song } from '@prisma/client';

interface SongsListProps {
  songs: Song[];
}

dayjs.extend(relativeTime);

const SongsList: React.FC<SongsListProps> = ({ songs }) => {
  return (
    <div className="flex w-full overflow-x-auto">
      {songs.length != 0 ? (
        <table className="table-hover table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Album</th>
              <th>Date added</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <tr key={song.id.toString()}>
                <th>{index + 1}</th>
                <td>{song.name}</td>
                <td>{song.album || 'n/a'}</td>
                <td>{dayjs(song.createdAt).fromNow()}</td>
              </tr>
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
