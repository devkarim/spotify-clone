'use client';

import { useGlobalAudioPlayer } from 'react-use-audio-player';
import { FaVolumeLow, FaVolumeXmark, FaVolumeHigh } from 'react-icons/fa6';

import usePlayer from '@/hooks/use-player';

import PlayerRange from './player-range';

interface PlayerVolumeProps {}

const PlayerVolume: React.FC<PlayerVolumeProps> = () => {
  const { mute, muted, volume, setVolume } = useGlobalAudioPlayer();
  const setPlayerVolume = usePlayer((state) => state.setVolume);

  return (
    <div className="hidden lg:flex gap-2 self-center absolute right-6">
      {
        <span
          className="tooltip tooltip-top"
          data-tooltip={muted ? 'Unmute' : 'Mute'}
        >
          <div className="opacity-60 w-8" onClick={() => mute(!muted)}>
            {!muted ? (
              <>
                {volume < 0.5 && volume != 0 && <FaVolumeLow />}
                {volume == 0 && <FaVolumeXmark />}
                {volume > 0.5 && <FaVolumeHigh />}
              </>
            ) : (
              <FaVolumeXmark />
            )}
          </div>
        </span>
      }
      <PlayerRange
        value={volume}
        max={1}
        step={0.01}
        className={muted ? 'opacity-60' : ''}
        setValue={(newVolume) => {
          setPlayerVolume(newVolume);
          setVolume(newVolume);
        }}
      />
    </div>
  );
};

export default PlayerVolume;
