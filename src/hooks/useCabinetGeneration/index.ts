import { useEffect, useState, type RefObject } from "react";
import type { Group, Object3D, Vector3 } from "three";

export const useCabinetGeneration = ({
  boatRef,
  cabinetCount,
  cabinetsRef,
  worldOffset,
}: {
  worldOffset: RefObject<Vector3>;
  boatRef: RefObject<Group | null>;
  cabinetsRef: RefObject<Array<Object3D | null>>;
  cabinetCount: number;
}) => {
  const [cabinetInstances, setCabinetInstances] = useState<TCabinetInstances>(
    []
  );

  const TILE_SIZE = 1000;
  const SINK_DEPTH_MIN = 5.0;
  const SINK_DEPTH_MAX = 5.0;

  const generateFixedNumberCabinets = (boatPos: Vector3) => {
    const newPositions = [];
    const MIN_DISTANCE = 100;
    const MAX_ATTEMPTS = 50;

    const isTooClose = (
      pos: [number, number],
      others: Array<[number, number]>
    ) => {
      return others.some(
        ([x, z]) => Math.hypot(pos[0] - x, pos[1] - z) < MIN_DISTANCE
      );
    };

    for (let i = 0; i < cabinetCount; i++) {
      let attempts = 0;
      let posX: number, posZ: number;

      do {
        const randX = Math.random();
        const randZ = Math.random();
        posX = boatPos.x + (randX - 0.5) * TILE_SIZE * 3;
        posZ = boatPos.z + (randZ - 0.5) * TILE_SIZE * 3;
        attempts++;
        if (attempts > MAX_ATTEMPTS) break;
      } while (
        isTooClose(
          [posX, posZ],
          newPositions.map((p) => [p.position[0], p.position[2]]) as [
            number,
            number
          ][]
        )
      );

      const randSink = Math.random();
      const randFloat = Math.random();

      const sinkOffset =
        SINK_DEPTH_MIN + randSink * (SINK_DEPTH_MAX - SINK_DEPTH_MIN);
      const floatPhase = randFloat * Math.PI * 2;

      newPositions.push({
        key: `cabinet-random-${i}`,
        position: [
          posX - worldOffset.current.x,
          -sinkOffset,
          posZ - worldOffset.current.z,
        ],
        sinkOffset,
        floatPhase,
      });
    }
    return newPositions;
  };

  useEffect(() => {
    if (!boatRef.current) return;
    const boatPos = boatRef.current.position;
    const newInstances = generateFixedNumberCabinets(
      boatPos
    ) as unknown as TCabinetInstances;
    setCabinetInstances(newInstances);
  }, [boatRef, cabinetCount, worldOffset]);

  useEffect(() => {
    cabinetsRef.current = cabinetsRef.current.slice(0, cabinetInstances.length);
  }, [cabinetInstances.length, cabinetsRef]);

  return { cabinetInstances };
};
