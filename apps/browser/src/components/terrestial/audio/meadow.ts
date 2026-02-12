import { AudioListener, AudioLoader, Audio } from "three";
import {
  globalUris,
  CLOUDFRONT_ROOT_URL,
} from "@/packages/shared/browser-config";

export const registerMeadowSounds = (isBrowserEnvironment: boolean) => {
  const meadowMusicRef = { current: null as Audio | null };
  const listener = new AudioListener();

  const sound = new Audio(listener);
  const loader = new AudioLoader();

  const audioUrl = `${isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : ""}${globalUris.meadow}`;
  loader.load(audioUrl, (buffer) => {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    meadowMusicRef.current = sound;
    sound.play();
  });

  return () => {
    if (meadowMusicRef.current?.isPlaying) {
      meadowMusicRef.current.stop();
    }
  };
};
