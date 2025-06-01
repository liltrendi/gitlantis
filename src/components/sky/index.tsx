import { useGameContext } from "@/hooks/useGameContext";
import { Sky as ThreeSky } from "@react-three/drei";
import { useMemo } from "react";
import type { Vector3 } from "three";

export const Sky = () => {
  const { worldOffsetRef } = useGameContext();

  const globalSunPosition = [0, 1, 0];

  const sunPosition = useMemo(() => {
    const offset = worldOffsetRef?.current;
    if (!offset) return globalSunPosition;

    return [
      globalSunPosition[0] - offset.x,
      globalSunPosition[1] - offset.y,
      globalSunPosition[2] - offset.z,
    ];
  }, [worldOffsetRef?.current]);

  return (
    <ThreeSky
      rayleigh={5}
      turbidity={0.1}
      mieDirectionalG={0.8}
      mieCoefficient={0.005}
      sunPosition={sunPosition as unknown as Vector3}
    />
  );
};
