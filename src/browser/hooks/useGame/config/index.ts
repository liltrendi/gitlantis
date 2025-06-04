import { useRef } from "react";
import { Vector3 } from "three";

export const useGameConfig = () => {
  const boatRef = useRef<TBoatRef>(null);
  const oceanRef = useRef<TOcean>([]);
  const nodeRef = useRef<TNodes>([]);
  const worldOffsetRef = useRef(new Vector3());

  return {
    worldOffsetRef,
    boatRef,
    oceanRef,
    nodeRef,
  };
};
