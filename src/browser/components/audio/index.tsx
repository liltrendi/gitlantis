import { PositionalAudio } from "@react-three/drei";
import { CLOUDFRONT_ROOT_URL, OCEAN_AUDIO_PATH } from "@/browser/config";
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
  const { showSplashScreen, isBrowserEnvironment } = useGameContext();

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

  if (showSplashScreen) return;

  return (
    <PositionalAudio
      ref={audioRef}
      url={`${isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : ""}${
        globalUris.audio
      }`}
    />
  );
};
