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
    if (!audio || showSplashScreen) return;

    const targetVolume = activeWorld === "marine" ? settings.volume : 0;

    const currentGain = audio.getVolume();
    const fadeDuration = 0.5;
    const step = (targetVolume - currentGain) / (fadeDuration * 60);

    let frame: number;
    const fade = () => {
      const newVol = audio.getVolume() + step;
      const done =
        (step > 0 && newVol >= targetVolume) ||
        (step < 0 && newVol <= targetVolume);
      if (!done) {
        audio.setVolume(newVol);
        frame = requestAnimationFrame(fade);
      } else {
        audio.setVolume(targetVolume);
      }
    };
    fade();

    if (!audio.isPlaying && activeWorld === "marine") {
      audio.play();
    }

    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.volume, showSplashScreen, activeWorld]);

  return (
    <PositionalAudio
      ref={gameAudio.ocean}
      url={`${isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : ""}${
        globalUris.waves
      }`}
      loop
    />
  );
};
