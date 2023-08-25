'use client';

import useLoginModal from '@/hooks/use-login-modal';
import usePlaylistModal from '@/hooks/use-playlist-modal';
import useUser from '@/hooks/use-user';
import { cn } from '@/lib/utils';
// import { FaPlus } from 'react-icons/fa/FaPlus';
import { FaPlus } from '@react-icons/all-files/fa6/FaPlus';

interface AddPlaylistButtonProps {
  icon?: boolean;
  className?: string;
}

const AddPlaylistButton: React.FC<AddPlaylistButtonProps> = ({
  icon = false,
  className,
}) => {
  const user = useUser();
  const loginModal = useLoginModal();
  const playlistModal = usePlaylistModal();

  const onCreatePlaylist = () => {
    if (!user) return loginModal.show();
    playlistModal.show('create');
  };

  return icon ? (
    <button
      className={cn(
        'btn btn-circle btn-ghost opacity-60 hover:opacity-100 w-8 h-8 transition-opacity',
        className
      )}
      onClick={onCreatePlaylist}
    >
      <FaPlus />
    </button>
  ) : (
    <button className="btn btn-secondary" onClick={onCreatePlaylist}>
      Create playlist
    </button>
  );
};

export default AddPlaylistButton;
