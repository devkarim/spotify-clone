'use client';

import moment from 'moment';
// import { FaPlay } from 'react-icons/fa';
// import { FaPause } from 'react-icons/fa6';
import { FaPlay } from '@react-icons/all-files/fa/FaPlay';
import { FaPause } from '@react-icons/all-files/fa6/FaPause';
import { useGlobalAudioPlayer } from 'react-use-audio-player';

import { Song } from '@prisma/client';

import usePlayer from '@/hooks/use-player';
import useSongModal from '@/hooks/use-song-modal';
import ActionsDropdown from '@/components/ui/actions-dropdown';

interface SongRowProps {
  song: Song;
  index: number;
  onDelete: (song: Song) => void;
}

const SongRow: React.FC<SongRowProps> = ({ onDelete, song, index }) => {
  const setSong = usePlayer((state) => state.setSong);
  const showSongModal = useSongModal((state) => state.show);
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

  const onUpdate = () => {
    showSongModal('edit', song.playlistId, song);
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
      <td>{moment(song.createdAt).fromNow()}</td>
      <th>
        <ActionsDropdown onDelete={() => onDelete(song)} onUpdate={onUpdate} />
      </th>
    </tr>
  );
};

export default SongRow;
