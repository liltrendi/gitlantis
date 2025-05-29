import { useEffect, useState, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, Vector3, Group } from "three";
import { Clone } from "@react-three/drei";
import { useCabinetModel } from "@/hooks/useCabinet";

type TCabinetInstances = Array<{
  key: string;
  position: Vector3;
  sinkOffset: number;
  floatPhase: number;
}>;

export const Cabinets = ({
  boatRef,
  floatingOriginOffset,
  cabinetsRef,
  cabinetCount
}: {
  floatingOriginOffset: RefObject<Vector3>;
  boatRef: RefObject<Group | null>;
  cabinetsRef: RefObject<Array<Object3D | null>>;
  cabinetCount: number;
}) => {
  const model = useCabinetModel();
  const [instances, setInstances] = useState<TCabinetInstances>([]);

  const TILE_SIZE = 1000;
  const SINK_DEPTH_MIN = 5.0;
  const SINK_DEPTH_MAX = 5.0;
  const FLOAT_AMPLITUDE = 2.0;
  const FLOAT_SPEED = 3.0;

  const generateFixedNumberCabinets = (boatPos: Vector3) => {
    const newPositions = [];
    const MIN_DISTANCE = 100;
    const MAX_ATTEMPTS = 50;
  
    const isTooClose = (pos: [number, number], others: Array<[number, number]>) => {
      return others.some(([x, z]) => Math.hypot(pos[0] - x, pos[1] - z) < MIN_DISTANCE);
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
      } while (isTooClose([posX, posZ], newPositions.map((p) => [p.position[0], p.position[2]]) as [number, number][]));
  
      const randSink = Math.random();
      const randFloat = Math.random();
  
      const sinkOffset = SINK_DEPTH_MIN + randSink * (SINK_DEPTH_MAX - SINK_DEPTH_MIN);
      const floatPhase = randFloat * Math.PI * 2;
  
      newPositions.push({
        key: `cabinet-random-${i}`,
        position: [posX - floatingOriginOffset.current.x, -sinkOffset, posZ - floatingOriginOffset.current.z],
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
    setInstances(newInstances);
  }, [boatRef, cabinetCount, floatingOriginOffset]);

  useFrame(({ clock }) => {
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
