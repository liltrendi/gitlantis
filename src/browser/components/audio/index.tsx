import { PositionalAudio } from "@react-three/drei";
import { OCEAN_AUDIO_PATH } from "@/browser/config";
import { useEffect, useRef } from "react";
import type { PositionalAudio as TPositionalAudio } from "three";
import { useGameStore } from "@/browser/hooks/useGame/store";
import { useGameContext } from "@/browser/hooks/useGame/context";

const modelUris = (window as any).__MODEL_URIS__ || {
  audio: OCEAN_AUDIO_PATH,
};

export const Audio = () => {
  const audioRef = useRef<TPositionalAudio | null>(null);
  const { settings } = useGameStore();
  const { splashScreenInvisible } = useGameContext();

  useEffect(() => {
    const audio = audioRef.current;

    if (audio && splashScreenInvisible) {
      const waitForBuffer = () => {
        if (audio.buffer) {
          audio.setVolume(settings.volume);
          audio.play();
        } else {
          requestAnimationFrame(waitForBuffer);
        }
      };
      waitForBuffer();
    }
  }, [splashScreenInvisible, settings.volume]);

  return (
    <>
      {splashScreenInvisible && (
        <PositionalAudio ref={audioRef} url={modelUris.audio} />
      )}
    </>
  );
};
