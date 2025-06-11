import { useRef, useState } from "react";
import { PositionalAudio, Vector3 } from "three";

export const useGameConfig = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [isMinimapFullScreen, setMinimapFullscreen] = useState(false);
  const boatRef = useRef<TBoatRef>(null);
  const floatingRef = useRef<TBoatRef>(null);
  const oceanRef = useRef<TOcean>([]);
  const nodeRef = useRef<TNodes>([]);
  const worldOffsetRef = useRef(new Vector3());
  const directionInputRef = useRef<TDirectionInput>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  const oceanAudioRef = useRef<PositionalAudio | null>(null);

  return {
    directionInputRef,
    worldOffsetRef,
    oceanAudioRef,
    boatRef,
    floatingRef,
    oceanRef,
    nodeRef,
    showSplashScreen,
    setShowSplashScreen,
    isMinimapFullScreen,
    setMinimapFullscreen,
  };
};
