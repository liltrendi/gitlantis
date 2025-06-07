import { useGameContext } from "@/browser/hooks/useGame/context";
import { Sky as ThreeSky } from "@react-three/drei";
import { useMemo } from "react";
import { Vector3 as ThreeVector3 } from "three";

export const Sky = () => {
  const { worldOffsetRef } = useGameContext();

  const sunWorldPosition = useMemo(() => {
    const x = 0.3;
    const y = 0.1;
    const z = 0.4;
    
    return new ThreeVector3(x, y, z);
  }, []);

  const relativeSunPosition = useMemo(() => {
    const offset = worldOffsetRef?.current || new ThreeVector3(0, 0, 0);
    return sunWorldPosition.clone().sub(offset);
  }, [sunWorldPosition, worldOffsetRef?.current]);

  const skyParams = {
    rayleigh: 2,      // Controls blue scattering (higher = more blue)
    turbidity: 5,   // Atmospheric haze (lower = clearer)
    mieDirectionalG: 0.8,
    mieCoefficient: 0.05,
  };

  return (
    <ThreeSky
      distance={450000}
      sunPosition={relativeSunPosition}
      rayleigh={skyParams.rayleigh}
      turbidity={skyParams.turbidity}
      mieDirectionalG={skyParams.mieDirectionalG}
      mieCoefficient={skyParams.mieCoefficient}
    />
  );
};