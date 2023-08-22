'use client';

import { Song } from '@prisma/client';
import SongRow from './song-row';

interface SongsListProps {
  songs: Song[];
}

const SongsList: React.FC<SongsListProps> = ({ songs }) => {
  return (
    <div className="flex w-full overflow-x-auto select-none pb-12">
      {songs.length != 0 ? (
        <table className="table-hover table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Date added</th>
              <th></th>
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
