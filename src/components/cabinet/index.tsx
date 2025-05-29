import { useEffect, useRef, useState, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, Vector3, Group } from "three";
import { useCabinetModel } from "@/hooks/useCabinet";

export const CabinetSpawner = ({
  boatRef,
  cabinetsRef,
}: {
  boatRef: RefObject<Group | null>;
  cabinetsRef: RefObject<Array<Object3D | null>>;
}) => {
  const model = useCabinetModel();
  const [instances, setInstances] = useState<any>([]);
  const floatingOriginOffset = useRef(new Vector3());

  const TILE_SIZE = 1000;
  const SPAWN_RADIUS = 2;
  const CABINETS_PER_TILE = 1;

  const seededRandom = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    const x = Math.sin(hash * 12.9898) * 43758.5453;
    return Math.abs(x - Math.floor(x));
  };

  const generateCabinetPositions = (boatPos: Vector3) => {
    const tileX = Math.floor(boatPos.x / TILE_SIZE);
    const tileZ = Math.floor(boatPos.z / TILE_SIZE);
    const newPositions: any[] = [];

    for (let x = -SPAWN_RADIUS; x <= SPAWN_RADIUS; x++) {
      for (let z = -SPAWN_RADIUS; z <= SPAWN_RADIUS; z++) {
        const currentTileX = tileX + x;
        const currentTileZ = tileZ + z;

        for (let i = 0; i < CABINETS_PER_TILE; i++) {
          const key = `cabinet-${currentTileX}-${currentTileZ}-${i}`;

          const seedX = `${currentTileX}_${currentTileZ}_${i}_x`;
          const seedZ = `${currentTileX}_${currentTileZ}_${i}_z`;

          const randX = seededRandom(seedX);
          const randZ = seededRandom(seedZ);

          // calculate world position based on original tile coordinates
          const originalWorldX =
            currentTileX * TILE_SIZE +
            randX * TILE_SIZE * 0.8 +
            TILE_SIZE * 0.1;
          const originalWorldZ =
            currentTileZ * TILE_SIZE +
            randZ * TILE_SIZE * 0.8 +
            TILE_SIZE * 0.1;

          // apply floating origin offset to get current position
          const currentWorldX = originalWorldX - floatingOriginOffset.current.x;
          const currentWorldZ = originalWorldZ - floatingOriginOffset.current.z;

          newPositions.push({
            key,
            position: [currentWorldX, 0, currentWorldZ],
            originalPosition: [originalWorldX, 0, originalWorldZ],
          });
        }
      }
    }
    return newPositions;
  };

  useFrame(() => {
    if (!boatRef.current) return;

    const boatPos = boatRef.current.position;
    const newInstances = generateCabinetPositions(boatPos);

    const currentKeys = instances
      .map((i: any) => i.key)
      .sort()
      .join(",");
    const newKeys = newInstances
      .map((i) => i.key)
      .sort()
      .join(",");

    if (currentKeys !== newKeys) {
      setInstances(newInstances);
    }
  });

  useEffect(() => {
    cabinetsRef.current = cabinetsRef.current.slice(0, instances.length);
  }, [instances.length, cabinetsRef]);

  return (
    <>
      {instances.map((inst: any, idx: number) => (
        // @ts-ignore
        <group key={inst.key} position={inst.position} ref={(el: Object3D | null) => (cabinetsRef.current[idx] = el)}><mesh><boxGeometry args={[50, 50, 50]} /><meshBasicMaterial color="red" /></mesh><primitive object={model.clone()} /></group>
      ))}
    </>
  );
};
