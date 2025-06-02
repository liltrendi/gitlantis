import type { TDirectoryContent } from "@/extension/types";
import { useRef } from "react";
import { Vector3 } from "three";

export const OCEAN_MODEL_PATH = "/models/ocean/ocean.jpeg";
export const BOAT_MODEL_PATH = `/models/boat/boat.glb`;
export const FOLDER_MODEL_PATH = `/models/folder/folder.glb`;
export const FILE_MODEL_PATH = `/models/file/file.glb`;

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
