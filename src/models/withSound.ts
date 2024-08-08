import { useRef, useEffect } from 'react';

export const useWithSound = (
  audioSource: string,
  config: { loop: boolean; volume: number } = { loop: false, volume: 1 },
) => {
  const soundRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    soundRef.current = new Audio(audioSource);
    soundRef.current.loop = config.loop;
    soundRef.current.volume = config.volume;
  }, []);

  return () => soundRef.current;
};
