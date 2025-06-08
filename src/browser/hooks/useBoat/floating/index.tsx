import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export const useFloating = ({
  boatRef,
  isBoatMoving,
  keys,
}: {
  boatRef: TBoatRef;
  isBoatMoving: boolean;
  keys: any;
}) => {
  const floatingState = useRef({
    time: 0,
    baseY: -5,
    waveHeight: 0.4,
    waveSpeed: 0.7,
    roughness: 0.1,
    wasFloating: false,
  });

  useFrame((_, delta) => {
    // don't float if any movement keys are pressed OR if motion detected
    const anyKeyPressed =
      keys.forward || keys.backward || keys.left || keys.right;
    const shouldFloat = !isBoatMoving && !anyKeyPressed;

    if (!boatRef?.current) return;

    const boat = boatRef.current;
    const state = floatingState.current;

    if (shouldFloat) {
      // only run floating logic when completely stationary
      state.time += delta * state.waveSpeed;
      const time = state.time;

      // get boat's world position for position-based waves
      const boatPos = boat.position;

      // create position-based wave simulation
      const positionWave =
        Math.sin(boatPos.x * 0.1 + time) * Math.cos(boatPos.z * 0.1 + time);

      // multiple wave layers for realism
      const primaryWave = Math.sin(time * 0.6) * state.waveHeight;
      const secondaryWave =
        Math.sin(time * 1.3 + Math.PI / 3) * (state.waveHeight * 0.4);
      const chop = Math.sin(time * 2.8) * (state.waveHeight * state.roughness);

      // combine all wave effects
      const totalFloat =
        primaryWave + secondaryWave + chop + positionWave * 0.2;

      // apply floating motion
      boat.position.y = state.baseY + totalFloat;

      // realistic boat tilting based on wave motion
      const tiltStrength = 0.03;
      boat.rotation.x = Math.sin(time * 0.9 + Math.PI / 4) * tiltStrength;
      boat.rotation.z = Math.cos(time * 0.7) * tiltStrength * 0.8;

      state.wasFloating = true;
    } else {
      // reset X and Z rotations when movement starts
      if (state.wasFloating) {
        boat.rotation.x = 0;
        boat.rotation.z = 0;
        state.wasFloating = false;
      }
    }
  });
};
