import { AudioListener, AudioLoader, Audio } from "three";
import {
  globalUris,
  CLOUDFRONT_ROOT_URL,
} from "@/packages/shared/browser-config";
import type { MovementControls } from "@/components/terrestial/events/movement";

export const registerFootstepsSounds = ({
  movementControls,
  wasInitialAnimationPlayed,
  isBrowserEnvironment,
}: {
  movementControls: MovementControls;
  wasInitialAnimationPlayed: () => boolean;
  isBrowserEnvironment: boolean;
}) => {
  const footstepsAudioRef = { current: null as Audio | null };

  const listener = new AudioListener();

  const sound = new Audio(listener);
  const loader = new AudioLoader();
  let isLoaded = false;

  let playing = false;

  const audioUrl = `${isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : ""}${globalUris.footsteps}`;
  loader.load(audioUrl, (buffer) => {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.playbackRate = 2.25;
    footstepsAudioRef.current = sound;
    isLoaded = true;
  });

  const interval = setInterval(() => {
    const canPlayerMove = wasInitialAnimationPlayed();

    if (!isLoaded || !footstepsAudioRef.current || !canPlayerMove) return;

    const audio = footstepsAudioRef.current;
    const shouldBePlaying = movementControls.isPlayerMovingVertically;

    if (shouldBePlaying && !playing) {
      audio.play();
      playing = true;
    } else if (!shouldBePlaying && playing) {
      audio.stop();
      playing = false;
    }
  }, 10);

  return () => {
    clearInterval(interval);
    if (footstepsAudioRef.current?.isPlaying) {
      footstepsAudioRef.current.stop();
    }
  };
};
