import type { Object3DNode } from "@react-three/fiber";
import type { RefObject, Group, Dispatch, SetStateAction } from "react";
import type { Water } from "three-stdlib";
import type { TDirectoryContent } from "@/extension/types";

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
    position: Vector3;
    sinkOffset: number;
    floatPhase: number;
    data: TDirectoryContent;
  };
  type TWorldOffsetRef = RefObject<Vector3> | null;
  type TProjectInfoRef = RefObject<{ directories: TDirectoryContent[] }>;

  type TNodeInstances = Array<{
    key: string;
    position: Vector3;
    sinkOffset: number;
    floatPhase: number;
    data: TDirectoryContent;
  }>;

  type TGameConfig = {
    boatRef: TBoatRef;
    oceanRef: TOceanRef;
    nodeRef: TNodeRef;
    worldOffsetRef: TWorldOffsetRef;
    directories: TDirectoryContent[];
    settings: Pick<TGameStore, "settings">["settings"];
    showSplashScreen: boolean,
    setShowSplashScreen: Dispatch<SetStateAction<boolean>>
  };

  type TGameStore = {
    settings: TDefaultSettings;
    extension: {isLoaded: boolean}
    setMinimap: (value: TShowHide) => void;
    setBreadcrumbs: (value: TShowHide) => void;
    setCompass: (value: TShowHide) => void;
    setNodesToShow: (value: TNodesToShow) => void;
    setBoatSpeed: (boatSpeed: number) => void;
    setBoatAcceleration: (acceleration: number) => void;
    setBoatDeceleration: (deceleration: number) => void;
    setBoatTurnSpeed: (turnSpeed: number) => void;
    setBoatTurnDeceleration: (turnDeceleration: number) => void;
    setCollisionRadius: (collisionRadius: number) => void;
    setCollisionPushStrength: (collisionPushStrength: number) => void;
    setVolume: (volume: number) => void;
    persistState: () => void;
    initializeStore: (persistedSettings?: Partial<TDefaultSettings>) => void;
  };
}
