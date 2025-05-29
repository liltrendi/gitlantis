import { useEffect, useState, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, Vector3, Group } from "three";
import { Clone } from "@react-three/drei";
import { useCabinetModel } from "@/hooks/useCabinet";

export const Cabinets = ({
  boatRef,
  floatingOriginOffset,
  cabinetsRef,
}: {
  floatingOriginOffset: RefObject<Vector3>;
  boatRef: RefObject<Group | null>;
  cabinetsRef: RefObject<Array<Object3D | null>>;
}) => {
  const model = useCabinetModel();
  const [instances, setInstances] = useState<
    Array<{
      key: string;
      position: Vector3;
      sinkOffset: number;
      floatPhase: number;
    }>
  >([]);

  const TILE_SIZE = 1000;
  const SPAWN_RADIUS = 3;
  const CABINETS_PER_TILE = 3;
  const CULLING_DISTANCE = 1500;
  const SINK_DEPTH_MIN = 5.0;
  const SINK_DEPTH_MAX = 5.0;
  const FLOAT_AMPLITUDE = 2.0;
  const FLOAT_SPEED = 3.0;

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
          const seedSink = `${currentTileX}_${currentTileZ}_${i}_sink`;
          const seedFloat = `${currentTileX}_${currentTileZ}_${i}_float`;

          const randX = seededRandom(seedX);
          const randZ = seededRandom(seedZ);
          const randSink = seededRandom(seedSink);
          const randFloat = seededRandom(seedFloat);

          const getCoordinate = (coord: number, rand: number) =>
            coord * TILE_SIZE + rand * TILE_SIZE * 0.8 + TILE_SIZE * 0.1;

          const originalWorldX = getCoordinate(currentTileX, randX);
          const originalWorldZ = getCoordinate(currentTileZ, randZ);

          const currentWorldX = originalWorldX - floatingOriginOffset.current.x;
          const currentWorldZ = originalWorldZ - floatingOriginOffset.current.z;

          const distanceFromBoat = Math.sqrt(
            Math.pow(currentWorldX - boatPos.x, 2) +
              Math.pow(currentWorldZ - boatPos.z, 2)
          );

          if (distanceFromBoat > CULLING_DISTANCE) {
            continue;
          }

          const sinkOffset =
            SINK_DEPTH_MIN + randSink * (SINK_DEPTH_MAX - SINK_DEPTH_MIN);
          const floatPhase = randFloat * Math.PI * 2;

          newPositions.push({
            key,
            position: [currentWorldX, -sinkOffset, currentWorldZ],
            sinkOffset,
            floatPhase,
          });
        }
      }
    }
    return newPositions;
  };

  useFrame(({ clock }) => {
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

    const time = clock.getElapsedTime();
    cabinetsRef.current.forEach((cabinet, idx) => {
      if (cabinet && instances[idx]) {
        const instance = instances[idx];
        const floatOffset =
          Math.sin(time * FLOAT_SPEED + instance.floatPhase) * FLOAT_AMPLITUDE;
        cabinet.position.y = -instance.sinkOffset + floatOffset;
      }
    });
  });

  useEffect(() => {
    cabinetsRef.current = cabinetsRef.current.slice(0, instances.length);
  }, [instances.length, cabinetsRef]);

  return (
    <>
      {instances.map((instance, idx) => (
        <Clone
          key={instance.key}
          ref={(el) => {
            cabinetsRef.current[idx] = el;
          }}
          position={instance.position}
          object={model}
          scale={2.5}
        />
      ))}
    </>
  );
};
