import { PositionalAudio } from "@react-three/drei";
import { CLOUDFRONT_ROOT_URL, OCEAN_AUDIO_PATH } from "@/browser/config";
import { useEffect } from "react";
import { useGameStore } from "@/browser/hooks/useGame/store";
import { useGameContext } from "@/browser/hooks/useGame/context";

const globalUris = (window as any).__GLOBAL_URIS__ || {
  audio: OCEAN_AUDIO_PATH,
};

export const Audio = () => {
  const { settings } = useGameStore();
  const { showSplashScreen, isBrowserEnvironment, oceanAudioRef } =
    useGameContext();

  useEffect(() => {
    const audio = oceanAudioRef.current;
    if (showSplashScreen || !audio) return;
    audio.setVolume(settings.volume);
  }, [settings.volume, showSplashScreen]);

  return (
    <PositionalAudio
      ref={oceanAudioRef}
      url={`${isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : ""}${
        globalUris.audio
      }`}
    />
  );
};
