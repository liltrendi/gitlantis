import { useFrame, useThree } from "@react-three/fiber";
import { useRef, type RefObject } from "react";
import { Object3D, Vector3 } from "three";
import type { Water } from "three-stdlib";

export const useFloatingOrigin = ({
  boatRef,
  oceanTilesRef,
  cabinetsRef,
  threshold = 500,
}: {
  boatRef: TBoatRef;
  oceanTilesRef: RefObject<Array<Water | null>>;
  cabinetsRef: RefObject<Array<Object3D | null>>;
  threshold?: number;
}) => {
  const { camera } = useThree();
  const worldOffset = useRef(new Vector3());
  const origin = new Vector3();

  useFrame(() => {
    const boat = boatRef.current;
    if (!boat) return;

    const distance = boat.position.distanceTo(origin);
    if (distance > threshold) {
      const offset = boat.position.clone();

      // Reset boat position
      boat.position.sub(offset);
      camera.position.sub(offset);
      worldOffset.current.add(offset);

      // Reset ocean tiles
      for (const tileRef of oceanTilesRef.current) {
        if (tileRef) tileRef.position.sub(offset);
      }

      // Reset cabinet instances
      for (const cabinetRef of (cabinetsRef.current ?? [])) {
        if (cabinetRef) cabinetRef.position.sub(offset);
      }
    }
  });

  return worldOffset;
};