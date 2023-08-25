import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Song } from '@prisma/client';

import { FullPlaylist } from '@/types/db';
import { getUserPlaylist } from '@/services/client/playlist';

interface PlaylistState {
  isLoading: boolean;
  fetched: boolean;
  playlist?: FullPlaylist;
  fetch: (playlistId: bigint) => Promise<FullPlaylist>;
  refresh: () => Promise<void>;
  addSong: (song: Song) => void;
  updateSong: (song: Song) => void;
  removeSong: (playlistId: bigint, songId: bigint) => void;
  reset: () => void;
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
    addSong: (song) => {
      const playlist = get().playlist;
      if (!playlist || playlist.id != song.playlistId) return;
      set({ playlist: { ...playlist, songs: [...playlist.songs, song] } });
    },
    updateSong: (song) => {
      const playlist = get().playlist;
      if (!playlist || playlist.id != song.playlistId) return;
      const songs = playlist.songs.map((s) => (s.id === song.id ? song : s));
      set({ playlist: { ...playlist, songs } });
    },
    removeSong: (playlistId, songId) => {
      const playlist = get().playlist;
      if (!playlist || playlist.id != playlistId) return;
      const songs = playlist.songs.filter((s) => s.id !== songId);
      set({ playlist: { ...playlist, songs } });
    },
    reset: () => {
      set({ fetched: false, isLoading: false, playlist: undefined });
    },
  }))
);

export default usePlaylist;
