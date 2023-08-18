import { useRef, useState, useEffect } from 'react';
import { useGlobalAudioPlayer } from 'react-use-audio-player';

function useAudioTime() {
  // const frameRef = useRef<number>();
  const [pos, setPos] = useState(0);
  const { getPosition } = useGlobalAudioPlayer();

  useEffect(() => {
    // const animate = () => {
    //   setPos(getPosition());
    //   frameRef.current = requestAnimationFrame(animate);
    // };

    // frameRef.current = window.requestAnimationFrame(animate);

    // return () => {
    //   if (frameRef.current) {
    //     cancelAnimationFrame(frameRef.current);
    //   }
    // };
    const interval = setInterval(() => {
      setPos(getPosition());
    }, 1000);

    return () => clearInterval(interval);
  }, [getPosition]);

  return Math.floor(pos);
}

export default useAudioTime;
