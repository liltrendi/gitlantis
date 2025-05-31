import { useRef } from "react";
import { Vector3 } from "three";

export const WATER_TEXTURE_PATH = "/models/ocean/waternormals.jpeg";
export const BOAT_MODEL_PATH = `/models/boat/scene-transformed.glb`;
export const CABINET_FILE_PATH = `/models/cabinet/cabinet.glb`;

export const getGameConfig = () => {
  const boatRef = useRef<TBoatRef>(null);
  const oceanRef = useRef<TOcean>([]);
  const cabinetsRef = useRef<TCabinets>([]);
  const worldOffsetRef = useRef(new Vector3());

  return { worldOffsetRef, boatRef, oceanRef, cabinetsRef };
};
