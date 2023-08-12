'use client';

import useLoginModal from '@/hooks/use-login-modal';
import useUser from '@/hooks/useUser';
import { FaPlus } from 'react-icons/fa';

interface AddPlaylistButtonProps {
  icon?: boolean;
}

const AddPlaylistButton: React.FC<AddPlaylistButtonProps> = ({
  icon = false,
}) => {
  const user = useUser();
  const loginModal = useLoginModal();

  const onCreatePlaylist = () => {
    if (!user) return loginModal.show();
    // TODO: show playlist creation modal
  };

  return icon ? (
    <button
      className="btn btn-circle btn-ghost opacity-60 hover:opacity-100 w-8 h-8 transition-opacity"
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
