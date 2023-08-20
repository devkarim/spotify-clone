'use client';

import { useGlobalAudioPlayer } from 'react-use-audio-player';

import { Song } from '@prisma/client';

import usePlayer from '@/hooks/use-player';
import PlayButton from '@/components/ui/play-button';

interface SongPlayButtonProps {
  song: Song;
  className?: string;
}

const SongPlayButton: React.FC<SongPlayButtonProps> = ({ song, className }) => {
  const currentSongId = usePlayer((state) => state.song?.id);
  const setSong = usePlayer((state) => state.setSong);
  const isCurrentSong = currentSongId == song.id;
  const { play, pause, playing } = useGlobalAudioPlayer();

  const playSong = async () => {
    if (isCurrentSong) {
      if (playing) {
        pause();
      } else {
        play();
      }
    } else {
      setSong(song, song.playlistId);
    }
  };

  return (
    <PlayButton
      isPlaying={isCurrentSong && playing}
      onClick={playSong}
      className={className}
    />
  );
};

export default SongPlayButton;
