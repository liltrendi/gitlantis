import type { TDirectoryContent } from "@/extension/types";
import { useRef } from "react";
import { Vector3 } from "three";

export const WATER_TEXTURE_PATH = "/models/ocean/waternormals.jpeg";
export const BOAT_MODEL_PATH = `/models/boat/scene-transformed.glb`;
export const CABINET_MODEL_PATH = `/models/cabinet/cabinet.glb`;

export const getGameConfig = (directories: TDirectoryContent[]) => {
  const boatRef = useRef<TBoatRef>(null);
  const oceanRef = useRef<TOcean>([]);
  const cabinetsRef = useRef<TCabinets>([]);
  const worldOffsetRef = useRef(new Vector3());
  // @ts-ignore
  const projectInfoRef = useRef<TProjectInfoRef>({directories});

  return {
    worldOffsetRef,
    boatRef,
    oceanRef,
    cabinetsRef,
    projectInfoRef,
  };
};
