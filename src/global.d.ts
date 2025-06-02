import type { Object3DNode } from "@react-three/fiber";
import type { RefObject, Group } from "react";
import type { Water } from "three-stdlib";
import type { TDirectoryContent } from "./extension/types";

declare module "@react-three/fiber" {
  interface ThreeElements {
    water: Object3DNode<Water, typeof Water>;
  }
}

declare global {
  type TOcean = Array<Water | null>;
  type TNodes = Array<Object3D | null>;
  type TBoatRef = RefObject<Group | null> | null;
  type TOceanRef = RefObject<TOcean> | null;
  type TNodeRef = RefObject<TNodes> | null;
  type TNodeInstance = {
    key: string;
    position: [number, number, number];
    sinkOffset: number;
    floatPhase: number;
  }
  type TWorldOffsetRef = RefObject<Vector3> | null;
  type TProjectInfoRef = RefObject<{directories: TDirectoryContent[]}>

  type TNodeInstances = Array<{
    key: string;
    position: Vector3;
    sinkOffset: number;
    floatPhase: number;
    data: TDirectoryContent
  }>;

  type TGameConfig = {
    boatRef: TBoatRef;
    oceanRef: TOceanRef;
    nodeRef: TNodeRef;
    worldOffsetRef: TWorldOffsetRef;
    projectInfoRef: TProjectInfoRef;
  };
}
