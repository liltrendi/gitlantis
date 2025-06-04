import { useGameContext } from "@/browser/hooks/useGame/context";
import { Sky as ThreeSky } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Vector3 as ThreeVector3 } from "three";

export const Sky = () => {
  const { worldOffsetRef } = useGameContext();
  const timeRef = useRef(0);

  const skyConfig = {
    cycleSpeed: 0.02, // How fast the day/night cycle runs (lower = slower)
    sunHeight: 0.4, // Maximum height of sun (0-1)
    sunRadius: 0.8, // How far the sun travels horizontally
  };

  useFrame((_, delta) => {
    timeRef.current += delta * skyConfig.cycleSpeed;
  });

  const sunWorldPosition = useMemo(() => {
    const time = timeRef.current;
    
    // Create circular motion for sun (sunrise to sunset)
    const angle = time % (Math.PI * 2);
    const x = Math.sin(angle) * skyConfig.sunRadius;
    const y = Math.max(0.05, Math.cos(angle) * skyConfig.sunHeight + 0.1);
    const z = Math.cos(angle) * skyConfig.sunRadius;
    
    return new ThreeVector3(x, y, z);
  }, [timeRef.current]);

  const relativeSunPosition = useMemo(() => {
    const offset = worldOffsetRef?.current || new ThreeVector3(0, 0, 0);
    return sunWorldPosition.clone().sub(offset);
  }, [sunWorldPosition, worldOffsetRef?.current]);

  const skyParams = useMemo(() => {
    const sunY = sunWorldPosition.y;
    const isDay = sunY > 0.15;
    const isSunrise = sunY > 0.05 && sunY <= 0.25;
    const isSunset = sunY > 0.05 && sunY <= 0.2 && sunWorldPosition.x < 0;
    
    if (isSunrise || isSunset) {
      // Sunrise/Sunset - warm colors
      return {
        rayleigh: 2,
        turbidity: 15,
        mieDirectionalG: 0.8,
        mieCoefficient: 0.1,
      };
    } else if (isDay) {
      // Daytime - clear blue sky
      return {
        rayleigh: 4,
        turbidity: 0.5,
        mieDirectionalG: 0.7,
        mieCoefficient: 0.05,
      };
    } else {
      // Night/Early morning - deeper colors
      return {
        rayleigh: 6,
        turbidity: 2,
        mieDirectionalG: 0.9,
        mieCoefficient: 0.01,
      };
    }
  }, [sunWorldPosition]);

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