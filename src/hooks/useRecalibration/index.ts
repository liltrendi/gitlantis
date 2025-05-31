import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useGameContext } from "@/hooks/useGameContext";

export const useRecalibration = () => {
  const { camera } = useThree();
  const origin = new Vector3();
  const threshold = 500;

  const { worldOffsetRef, boatRef, oceanRef, cabinetsRef } = useGameContext();

  useFrame(() => {
    if (
      !worldOffsetRef?.current ||
      !boatRef?.current ||
      !oceanRef?.current ||
      !cabinetsRef?.current
    )
      return;

    const boat = boatRef.current;

    const distance = boat.position.distanceTo(origin);
    if (distance > threshold) {
      const offset = boat.position.clone();

      // reset boat position
      boat.position.sub(offset);
      camera.position.sub(offset);
      worldOffsetRef.current.add(offset);

      // reset ocean tiles
      for (const tileRef of oceanRef.current) {
        if (tileRef) tileRef.position.sub(offset);
      }

      // reset cabinet instances
      for (const cabinetRef of cabinetsRef.current ?? []) {
        if (cabinetRef) cabinetRef.position.sub(offset);
      }
    }
  });
};
