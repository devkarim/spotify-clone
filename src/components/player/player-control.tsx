import { shallow } from 'zustand/shallow';
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import { FaBackwardStep, FaForwardStep } from 'react-icons/fa6';

import usePlayer from '@/hooks/use-player';
import usePlaylist from '@/hooks/use-playlist';
import PlayButton from '@/components/ui/play-button';

interface PlayerControlProps {}

const PlayerControl: React.FC<PlayerControlProps> = ({}) => {
  const { song, playNextSong, playPrevSong } = usePlayer(
    ({ song, playNextSong, playPrevSong }) => ({
      song,
      playNextSong,
      playPrevSong,
    }),
    shallow
  );
  const playlist = usePlaylist((state) => state.playlist);
  const { play, pause, playing, isLoading } = useGlobalAudioPlayer();

  const playSong = () => {
    if (!song) return;
    if (playing) {
      pause();
    } else {
      play();
    }
  };

  const nextSong = () => {
    if (!playlist) return;
    playNextSong(playlist.songs);
  };

  const prevSong = () => {
    if (!playlist) return;
    playPrevSong(playlist.songs);
  };

  return (
    <div className="flex items-center gap-6 text-2xl">
      <span
        className="tooltip tooltip-top hidden lg:inline"
        data-tooltip="Back"
      >
        <FaBackwardStep
          className="opacity-80 hover:opacity-100"
          onClick={prevSong}
        />
      </span>
      <span className="tooltip tooltip-top" data-tooltip="Play">
        <PlayButton
          onClick={playSong}
          isPlaying={playing}
          disabled={isLoading}
          className="h-8 w-8 text-xs btn-secondary cursor-default"
        />
      </span>
      <span
        className="tooltip tooltip-top hidden lg:inline"
        data-tooltip="Next"
      >
        <FaForwardStep
          className="opacity-80 hover:opacity-100"
          onClick={nextSong}
        />
      </span>
    </div>
  );
};

export default PlayerControl;
