import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { FullPlaylist } from '@/types/db';
import { getUserPlaylist } from '@/services/client/playlist';

interface PlaylistState {
  isLoading: boolean;
  fetched: boolean;
  playlist?: FullPlaylist;
  fetch: (playlistId: bigint) => Promise<FullPlaylist>;
  refresh: () => Promise<void>;
}

const usePlaylist = create<PlaylistState>()(
  devtools((set, get) => ({
    fetched: false,
    isLoading: false,
    fetch: async (playlistId) => {
      set({ isLoading: true, fetched: false });
      const playlist = await getUserPlaylist(playlistId);
      set({ isLoading: false, fetched: true, playlist });
      return playlist;
    },
    refresh: async () => {
      const playlist = get().playlist;
      if (!playlist) return;
      await get().fetch(playlist.id);
    },
  }))
);

export default usePlaylist;
