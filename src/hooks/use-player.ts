import { createWithEqualityFn } from 'zustand/traditional';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

import { Song } from '@prisma/client';

interface PlayerState {
  song?: Song;
  playlistId?: bigint;
  pos: number;
  volume: number;
  shouldPlay: boolean;
  playingId?: string;
  setSong: (song: Song, playlistId?: bigint) => void;
  setPlaylistId: (playlistId: bigint) => void;
  setPos: (pos: number) => void;
  setVolume: (vol: number) => void;
  setShouldPlay: (shouldPlay: boolean) => void;
  playNextSong: (songs: Song[]) => void;
  playPrevSong: (songs: Song[]) => void;
}

const usePlayer = createWithEqualityFn(
  persist(
    devtools<PlayerState>((set, get) => ({
      playing: false,
      shouldPlay: false,
      pos: 0,
      volume: 1,
      setSong: (song: Song, playlistId) =>
        set(() => ({
          song,
          playlistId,
          shouldPlay: true,
          pos: 0,
          playingId: uuidv4(),
        })),
      setPlaylistId: (playlistId: bigint) => set(() => ({ playlistId })),
      setPos: (pos: number) => set(() => ({ pos })),
      setVolume: (volume: number) => set(() => ({ volume })),
      setShouldPlay: (shouldPlay: boolean) => set(() => ({ shouldPlay })),
      playNextSong: (songs: Song[]) => {
        const currentSongIndex = songs.findIndex(
          (song) => song.id === get().song?.id
        );
        if (currentSongIndex == -1) return;
        const nextSong = songs[currentSongIndex + 1];
        if (nextSong) {
          get().setSong(nextSong, nextSong.playlistId);
        } else {
          get().setSong(songs[0], songs[0].playlistId);
        }
      },
      playPrevSong: (songs: Song[]) => {
        const currentSongIndex = songs.findIndex(
          (song) => song.id === get().song?.id
        );
        if (currentSongIndex == -1) return;
        const prevSong = songs[currentSongIndex - 1];
        if (prevSong) {
          get().setSong(prevSong, prevSong.playlistId);
        } else {
          get().setSong(
            songs[songs.length - 1],
            songs[songs.length - 1].playlistId
          );
        }
      },
    })),
    {
      name: 'player',
      partialize({ song, playlistId, pos, volume }) {
        return { song, playlistId, pos, volume };
      },
    }
  ),
  Object.is
);

export default usePlayer;
