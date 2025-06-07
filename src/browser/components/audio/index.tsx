import { PositionalAudio } from "@react-three/drei";
import { OCEAN_AUDIO_PATH } from "@/browser/config";
import { useEffect, useRef } from "react";
import type { PositionalAudio as TPositionalAudio } from "three";
import { useGameStore } from "@/browser/hooks/useGame/store";
import { useGameContext } from "@/browser/hooks/useGame/context";

const globalUris = (window as any).__GLOBAL_URIS__ || {
  audio: OCEAN_AUDIO_PATH,
};

export const Audio = () => {
  const audioRef = useRef<TPositionalAudio | null>(null);
  const { settings } = useGameStore();
  const { showSplashScreen } = useGameContext();

  useEffect(() => {
    const audio = audioRef.current;

    if (audio && !showSplashScreen) {
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
  }, [showSplashScreen, settings.volume]);

  return (
    <>
      {!showSplashScreen && (
        <PositionalAudio ref={audioRef} url={globalUris.audio} />
      )}
    </>
  );
};
