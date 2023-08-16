import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ModalStatus } from '@/types/ui';

interface SongModalState {
  isOpen: boolean;
  status: ModalStatus;
  playlistId?: bigint;
  show: (status?: ModalStatus, playlistId?: bigint) => void;
  hide: () => void;
}

const useSongModal = create<SongModalState>()(
  devtools((set) => ({
    status: 'create',
    isOpen: false,
    show: (status = 'create', playlistId) =>
      set({ status, playlistId, isOpen: true }),
    hide: () => set({ isOpen: false }),
  }))
);

export default useSongModal;
