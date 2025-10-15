import { PositionalAudio } from "@react-three/drei";
import { CLOUDFRONT_ROOT_URL, OCEAN_AUDIO_PATH } from "@/browser/config";
import { useEffect } from "react";
import { useGameStore } from "@/browser/hooks/useGame/store";
import { useGameContext } from "@/browser/hooks/useGame/context";

const globalUris = (window as any).__GLOBAL_URIS__ || {
  waves: OCEAN_AUDIO_PATH,
};

export const Waves = () => {
  const { settings } = useGameStore();
  const { showSplashScreen, isBrowserEnvironment, gameAudio, activeWorld } =
    useGameContext();

  useEffect(() => {
    const audio = gameAudio.ocean.current;
    if (showSplashScreen || !audio) return;

    audio.setVolume(settings.volume);

    if (audio.isPlaying && activeWorld !== "marine") {
      audio.stop();
    } else if (!audio.isPlaying && activeWorld === "marine") {
      audio.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.volume, showSplashScreen, activeWorld]);

  return (
    <PositionalAudio
      ref={gameAudio.ocean}
      url={`${isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : ""}${
        globalUris.waves
      }`}
    />
  );
};
