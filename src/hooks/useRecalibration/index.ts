import { useFrame, useThree } from "@react-three/fiber";
import { type RefObject } from "react";
import { Object3D, Vector3 } from "three";
import type { Water } from "three-stdlib";

export const useRecalibration = ({
  boatRef,
  oceanTilesRef,
  cabinetsRef,
  worldOffset,
}: {
  boatRef: TBoatRef;
  oceanTilesRef: RefObject<Array<Water | null>>;
  cabinetsRef: RefObject<Array<Object3D | null>>;
  worldOffset: RefObject<Vector3>;
}) => {
  const { camera } = useThree();
  const origin = new Vector3();
  const threshold = 500;

  useFrame(() => {
    const boat = boatRef.current;
    if (!boat) return;

    const distance = boat.position.distanceTo(origin);
    if (distance > threshold) {
      const offset = boat.position.clone();

      // reset boat position
      boat.position.sub(offset);
      camera.position.sub(offset);
      worldOffset.current.add(offset);

      // reset ocean tiles
      for (const tileRef of oceanTilesRef.current) {
        if (tileRef) tileRef.position.sub(offset);
      }

      // reset cabinet instances
      for (const cabinetRef of cabinetsRef.current ?? []) {
        if (cabinetRef) cabinetRef.position.sub(offset);
      }
    }
  });

  return { worldOffset };
};
