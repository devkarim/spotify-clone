import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Song } from '@prisma/client';

interface PlayerState {
  song?: Song;
  playlistId?: bigint;
  pos: number;
  volume: number;
  shouldPlay: boolean;
  setSong: (song: Song) => void;
  setPlaylistId: (playlistId: bigint) => void;
  setPos: (pos: number) => void;
  setVolume: (vol: number) => void;
  setShouldPlay: (shouldPlay: boolean) => void;
}

const usePlayer = create(
  persist(
    devtools<PlayerState>((set) => ({
      playing: false,
      shouldPlay: false,
      pos: 0,
      volume: 1,
      setSong: (song: Song) => set(() => ({ song, shouldPlay: true, pos: 0 })),
      setPlaylistId: (playlistId: bigint) => set(() => ({ playlistId })),
      setPos: (pos: number) => set(() => ({ pos })),
      setVolume: (volume: number) => set(() => ({ volume })),
      setShouldPlay: (shouldPlay: boolean) => set(() => ({ shouldPlay })),
    })),
    {
      name: 'player',
      partialize({ song, playlistId, pos, volume }) {
        return { song, playlistId, pos, volume };
      },
    }
  )
);

export default usePlayer;
