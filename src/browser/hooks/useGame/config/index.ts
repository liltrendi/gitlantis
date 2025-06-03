import type { TDirectoryContent } from "@/extension/types";
import { useRef } from "react";
import { Vector3 } from "three";

export const useGameConfig = (directories: TDirectoryContent[]) => {
  const boatRef = useRef<TBoatRef>(null);
  const oceanRef = useRef<TOcean>([]);
  const nodeRef = useRef<TNodes>([]);
  const worldOffsetRef = useRef(new Vector3());
  const projectInfoRef = useRef<{ directories: TDirectoryContent[] }>({
    directories,
  });

  return {
    worldOffsetRef,
    boatRef,
    oceanRef,
    nodeRef,
    projectInfoRef,
  };
};
