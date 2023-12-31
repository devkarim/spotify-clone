'use client';

import { shallow } from 'zustand/shallow';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGlobalAudioPlayer } from 'react-use-audio-player';

import log from '@/lib/log';
import usePlayer from '@/hooks/use-player';
import usePlaylist from '@/hooks/use-playlist';
import MusicImage from '@/components/ui/music-image';
import { updateSongLastPlayed } from '@/services/client/song';
import { updatePlaylistLastPlayed } from '@/services/client/playlist';

import PlayerVolume from './player-volume';
import PlayerSlider from './player-slider';
import PlayerControl from './player-control';

interface PlayerProps {}

const Player: React.FC<PlayerProps> = ({}) => {
  const { song, shouldPlay, volume, playlistId, playNextSong, playingId } =
    usePlayer(
      ({
        song,
        shouldPlay,
        setShouldPlay,
        volume,
        playlistId,
        playNextSong,
        playingId,
      }) => ({
        song,
        shouldPlay,
        setShouldPlay,
        volume,
        playlistId,
        playNextSong,
        playingId,
      }),
      shallow
    );
  const fetchPlaylist = usePlaylist((state) => state.fetch);
  const playlist = usePlaylist((state) => state.playlist);
  const [isMounted, setIsMounted] = useState(false);
  const { load, setVolume } = useGlobalAudioPlayer();
  const router = useRouter();

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
    if (!song) return;
    load(song.songUrl, {
      autoplay: shouldPlay,
      onend: () => {
        if (!playlist) return;
        playNextSong(playlist.songs);
      },
    });
    setVolume(volume);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load, playlist, playingId, song]);

  useEffect(() => {
    if (!playlistId) return;
    log.info(`fetch ${playlistId} playlist}`, 'main-player');
    fetchPlaylist(playlistId);
    updateLastPlayed(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistId]);

  useEffect(() => {
    updateLastPlayed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playingId]);

  const updateLastPlayed = async (isPlaylist?: boolean) => {
    if (isPlaylist) {
      if (!playlistId) return;
      await updatePlaylistLastPlayed(playlistId);
    } else {
      if (!playingId || !song) return;
      await updateSongLastPlayed(song.id);
    }
    router.refresh();
  };

  if (!song || !isMounted) return null;

  return (
    <div className="relative flex p-2 bg-black max-w-screen h-20 select-none">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 rounded overflow-hidden">
          <MusicImage imageUrl={song.imageUrl} emptyClassName="text-lg" />
        </div>
        <div>
          <p className="text-sm">{song.name}</p>
          <p className="text-xs opacity-60">{song.artist}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 absolute self-center right-6 lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-2xl">
        <PlayerControl />
        <PlayerSlider />
      </div>
      <PlayerVolume />
    </div>
  );
};

export default Player;
