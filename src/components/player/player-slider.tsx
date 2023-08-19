import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import durationPlugin from 'dayjs/plugin/duration';
import { useGlobalAudioPlayer } from 'react-use-audio-player';

import usePlayer from '@/hooks/use-player';
import useAudioTime from '@/hooks/use-audio-time';

import PlayerRange from './player-range';

interface PlayerSliderProps {}

dayjs.extend(durationPlugin);

const PlayerSlider: React.FC<PlayerSliderProps> = () => {
  const player = usePlayer();
  const [pos, setPos] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const { duration, seek, isLoading } = useGlobalAudioPlayer();
  const audioPos = useAudioTime();

  useEffect(() => {
    const audioPosInt = Math.floor(audioPos);
    // Update every 3 seconds of the song
    if (
      audioPosInt != 0 &&
      Math.floor(player.pos) != audioPosInt &&
      audioPosInt % 3 == 0
    ) {
      player.setPos(audioPos);
    }
    // If not currently grabbing the slider, update the position
    if (!isChanging && Math.floor(audioPos) != Math.floor(pos)) {
      setPos(Math.floor(audioPos));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioPos]);

  useEffect(() => {
    seek(player.pos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <div className="hidden lg:flex items-center gap-4 w-full">
        <p className="opacity-60 text-sm">
          {dayjs.duration(pos, 'seconds').format('mm:ss')}
        </p>
        <PlayerRange
          value={pos}
          max={duration}
          setValue={(newPos) => setPos(newPos)}
          onChangeStart={() => setIsChanging(true)}
          onChangeDone={(newPos) => {
            setIsChanging(false);
            player.setPos(newPos);
            seek(newPos);
          }}
        />
        <p className="opacity-60 text-sm">
          {dayjs.duration(duration, 'seconds').format('mm:ss')}
        </p>
      </div>
      <progress
        className="progress progress-xs progress-secondary lg:hidden fixed -bottom-px left-0 w-full"
        value={pos}
        max={duration}
      />
    </>
  );
};

export default PlayerSlider;
