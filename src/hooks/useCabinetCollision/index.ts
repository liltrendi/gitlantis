import { useFrame } from "@react-three/fiber";
import type { RefObject } from "react";
import { Group, Vector3, type Object3D } from "three";

export const useCabinetCollision = ({
  boatRef,
  cabinetsRef,
}: {
  boatRef: RefObject<Group | null>;
  cabinetsRef: RefObject<Array<Object3D | null>>;
}) => {
  useFrame(() => {
    if (!boatRef.current) return;

    const boat = boatRef.current;

    const AVOIDANCE_RADIUS = 100;
    const PUSH_STRENGTH = 2.5;

    let avoidanceVector = new Vector3(0, 0, 0);

    for (let i = 0; i < cabinetsRef.current.length; i++) {
      const cabinet = cabinetsRef.current[i];
      if (!cabinet) continue;

      const toCabinet = new Vector3().subVectors(
        boat.position,
        cabinet.position
      );
      toCabinet.y = 0;
      const distance = toCabinet.length();

      if (distance < AVOIDANCE_RADIUS && distance > 0.01) {
        const strength = (AVOIDANCE_RADIUS - distance) / AVOIDANCE_RADIUS;
        toCabinet.normalize().multiplyScalar(strength * PUSH_STRENGTH);
        avoidanceVector.add(toCabinet);
      }
    }

    boat.position.add(avoidanceVector);
  });
};
