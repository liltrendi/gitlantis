import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useGameContext } from "@/browser/hooks/useGame/context";

export const useReset = () => {
  const { camera } = useThree();
  const origin = new Vector3();
  const threshold = 400;

  const { worldOffsetRef, boatRef, oceanRef, nodeRef } = useGameContext();

  useFrame(() => {
    if (
      !worldOffsetRef?.current ||
      !boatRef?.current ||
      !oceanRef?.current ||
      !nodeRef?.current
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

      // reset node instances
      for (const ref of nodeRef.current ?? []) {
        if (ref) ref.position.sub(offset);
      }
    }
  });
};