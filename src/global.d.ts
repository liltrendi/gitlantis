import type { Object3DNode } from "@react-three/fiber";
import type { RefObject, Group } from "react";
import type { Water } from "three-stdlib";

declare module "@react-three/fiber" {
  interface ThreeElements {
    water: Object3DNode<Water, typeof Water>;
  }
}

declare global {
  type TOcean = Array<Water | null>;
  type TCabinets = Array<Object3D | null>;
  type TBoatRef = RefObject<Group | null> | null;
  type TOceanRef = RefObject<TOcean> | null;
  type TCabinetsRef = RefObject<TCabinets> | null;
  type TWorldOffsetRef = RefObject<Vector3> | null

  type TCabinetInstances = Array<{
    key: string;
    position: Vector3;
    sinkOffset: number;
    floatPhase: number;
  }>;

  type TGameConfig = {
    boatRef: TBoatRef;
    oceanRef: TOceanRef;
    cabinetsRef: TCabinetsRef;
    worldOffsetRef: TWorldOffsetRef;
  };
}
