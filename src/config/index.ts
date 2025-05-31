import { useRef } from "react";
import { Vector3 } from "three";

export const WATER_TEXTURE_PATH = "/models/ocean/waternormals.jpeg";
export const BOAT_MODEL_PATH = `/models/boat/scene-transformed.glb`;
export const CABINET_FILE_PATH = `/models/cabinet/cabinet.glb`;

const PROJECT_INFO = {
  directories: [
    "components",
    "utils",
    "services",
    "useWorldOffset",
    "movement-controllers",
    "api-clients",
    "data-hooks",
    "state-managers",
    "config",
    "middleware",
    "helpers",
    "constants",
    "styles",
    "assets",
    "layouts",
    "navigation",
    "theme",
    "validators",
    "formatters",
    "transitions",
    "animations",
    "hooks",
    "forms",
    "contexts",
    "models",
    "repositories",
    "stores",
    "adapters",
    "sagas",
    "selectors",
  ]
}

export const getGameConfig = () => {
  const boatRef = useRef<TBoatRef>(null);
  const oceanRef = useRef<TOcean>([]);
  const cabinetsRef = useRef<TCabinets>([]);
  const worldOffsetRef = useRef(new Vector3());
  // @ts-ignore
  const projectInfoRef = useRef<TProjectInfoRef>({...PROJECT_INFO});

  return {
    worldOffsetRef,
    boatRef,
    oceanRef,
    cabinetsRef,
    projectInfoRef,
  };
};
