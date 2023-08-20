'use client';

import { useGlobalAudioPlayer } from 'react-use-audio-player';

import { Song } from '@prisma/client';
import usePlayer from '@/hooks/use-player';
import PlayButton from '@/components/ui/play-button';
import usePlaylist from '@/hooks/use-playlist';

interface PlaylistPlayButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  playlistId: bigint;
  firstSong?: Song | null;
}

const PlaylistPlayButton: React.FC<PlaylistPlayButtonProps> = ({
  playlistId,
  firstSong,
  className,
  ...props
}) => {
  const currentPlaylistId = usePlayer((state) => state.playlistId);
  const setSong = usePlayer((state) => state.setSong);
  const fetch = usePlaylist((state) => state.fetch);
  const isCurrentPlaylist = currentPlaylistId == playlistId;
  const { play, pause, playing } = useGlobalAudioPlayer();

  const playPlaylist = async () => {
    if (isCurrentPlaylist) {
      if (playing) {
        pause();
      } else {
        play();
      }
    } else {
      if (!firstSong) {
        const playlist = await fetch(playlistId);
        if (playlist) {
          setSong(playlist.songs[0], playlistId);
        }
      } else {
        setSong(firstSong, playlistId);
      }
    }
  };

  return (
    <PlayButton
      isPlaying={isCurrentPlaylist && playing}
      onClick={playPlaylist}
      className={className}
      {...props}
    />
  );
};

export default PlaylistPlayButton;
