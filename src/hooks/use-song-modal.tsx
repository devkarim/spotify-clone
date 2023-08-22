import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Song } from '@prisma/client';

import { ModalStatus } from '@/types/ui';

interface SongModalState {
  isOpen: boolean;
  status: ModalStatus;
  song: Song | null;
  playlistId?: bigint;
  show: (status?: ModalStatus, playlistId?: bigint, song?: Song) => void;
  hide: () => void;
}

const useSongModal = create<SongModalState>()(
  devtools((set) => ({
    status: 'create',
    song: null,
    isOpen: false,
    show: (status = 'create', playlistId, song) =>
      set({ status, playlistId, song, isOpen: true }),
    hide: () => set({ isOpen: false, song: null }),
  }))
);

export default useSongModal;
