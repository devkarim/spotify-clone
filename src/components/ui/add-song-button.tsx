'use client';

import useSongModal from '@/hooks/use-song-modal';
import { FaPlus } from 'react-icons/fa6';

interface AddSongButtonProps {
  playlistId: bigint;
}

const AddSongButton: React.FC<AddSongButtonProps> = ({ playlistId }) => {
  const songModal = useSongModal();

  return (
    <button
      className="btn btn-circle btn-primary h-14 w-14 text-black m-4 hover:scale-105 transition-opacity duration-300"
      onClick={() => songModal.show('create', playlistId)}
    >
      <FaPlus className="text-xl" />
    </button>
  );
};

export default AddSongButton;
