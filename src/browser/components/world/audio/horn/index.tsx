import { PositionalAudio } from "@react-three/drei";
import { CLOUDFRONT_ROOT_URL, HORN_AUDIO_PATH } from "@/browser/config";
import { useEffect } from "react";
import { useGameStore } from "@/browser/hooks/useGame/store";
import { useGameContext } from "@/browser/hooks/useGame/context";

const globalUris = (window as any).__GLOBAL_URIS__ || {
  horn: HORN_AUDIO_PATH,
};

export const Horn = () => {
  const { settings } = useGameStore();
  const { showSplashScreen, isBrowserEnvironment, gameAudio } =
    useGameContext();

  useEffect(() => {
    const audio = gameAudio.horn.current;
    if (showSplashScreen || !audio) return;
    audio.setVolume(settings.volume);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.volume, showSplashScreen]);

  return (
    <PositionalAudio
      ref={gameAudio.horn}
      url={`${isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : ""}${
        globalUris.horn
      }`}
      loop
    />
  );
};
