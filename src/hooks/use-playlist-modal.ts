import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ModalStatus = 'create' | 'edit';

interface PlaylistModalState {
  isOpen: boolean;
  status: ModalStatus;
  show: (status?: ModalStatus) => void;
  hide: () => void;
}

const usePlaylistModal = create<PlaylistModalState>()(
  devtools((set) => ({
    status: 'create',
    isOpen: false,
    show: (status = 'create') => set({ status, isOpen: true }),
    hide: () => set({ isOpen: false }),
  }))
);

export default usePlaylistModal;
