'use client';

import { useGlobalAudioPlayer } from 'react-use-audio-player';

import { Song } from '@prisma/client';
import usePlayer from '@/hooks/use-player';
import PlayButton from '@/components/ui/play-button';

interface PlaylistPlayButtonProps {
  playlistId: bigint;
  firstSong?: Song | null;
}

const PlaylistPlayButton: React.FC<PlaylistPlayButtonProps> = ({
  playlistId,
  firstSong,
}) => {
  const currentPlaylistId = usePlayer((state) => state.playlistId);
  const setSong = usePlayer((state) => state.setSong);
  const isCurrentPlaylist = currentPlaylistId == playlistId;
  const { play, pause, playing } = useGlobalAudioPlayer();

  const playPlaylist = () => {
    if (isCurrentPlaylist) {
      if (playing) {
        pause();
      } else {
        play();
      }
    } else {
      if (!firstSong) return;
      setSong(firstSong, playlistId);
    }
  };

  return (
    <PlayButton
      isPlaying={isCurrentPlaylist && playing}
      onClick={playPlaylist}
    />
  );
};

export default PlaylistPlayButton;
