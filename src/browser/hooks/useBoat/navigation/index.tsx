import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboard } from "@/browser/hooks/useBoat/keyboard";
import { useGameStore } from "@/browser/hooks/useGame/store";
import type { Group } from "three";

const INTENDED_DIRECTION = {
  FORWARD: 1,
  BACKWARD: -1,
  NEUTRAL: 0,
};

export const useNavigation = ({ boatRef }: { boatRef: TBoatRef }) => {
  const floatingRef = useRef<TBoatRef>(null);
  const keys = useKeyboard();
  const { settings } = useGameStore();

  const config = {
    maxSpeed: settings.boatSpeed,
    acceleration: settings.acceleration,
    deceleration: settings.deceleration,
    turnSpeed: settings.turnSpeed,
    turnDeceleration: settings.turnDeceleration,
    rockingAmplitude: settings.rockingAmplitude,
    rockingSpeed: settings.rockingSpeed,
    bobbingAmplitude: settings.bobbingAmplitude,
    bobbingSpeed: settings.bobbingSpeed,
  };

  const state = useRef({
    velocity: { x: 0, z: 0 },
    angularVelocity: 0,
    speed: 0,
    intendedDirection: INTENDED_DIRECTION.NEUTRAL,
  });

  useFrame((_, delta) => {
    const boat = boatRef?.current;
    const floating = floatingRef?.current;
    if (!boat || !floating) return;

    const deltaMultiplier = Math.min(delta * 60, 2);
    const currentState = state.current;

    const movementFactor =
      1 - Math.min(Math.abs(state.current.speed) / config.maxSpeed, 1);

    const time = performance.now() / 1000;

    (floating as unknown as Group).rotation.y =
      Math.sin(time * config.rockingSpeed * Math.PI * 2) *
      config.rockingAmplitude *
      movementFactor;

    (floating as unknown as Group).position.y =
      Math.sin(time * config.bobbingSpeed * Math.PI * 2) *
      config.bobbingAmplitude *
      movementFactor;

    // handle forward/backward input and track intent
    let targetSpeed = 0;
    let intendedDirection = INTENDED_DIRECTION.NEUTRAL;

    if (keys.forward) {
      targetSpeed = config.maxSpeed;
      intendedDirection = INTENDED_DIRECTION.FORWARD;
    } else if (keys.backward) {
      targetSpeed = -config.maxSpeed * 0.5;
      intendedDirection = INTENDED_DIRECTION.BACKWARD;
    }

    // update intended direction
    currentState.intendedDirection = intendedDirection;

    if (targetSpeed !== 0) {
      currentState.speed +=
        (targetSpeed - currentState.speed) * config.acceleration;
    } else {
      currentState.speed *= 1 - config.deceleration;
    }

    // use intended direction for turning logic
    let targetTurn = 0;
    const isStationary = Math.abs(currentState.speed) < 0.001;

    if (keys.left) {
      if (isStationary) {
        targetTurn = config.turnSpeed;
      } else {
        targetTurn =
          currentState.intendedDirection === INTENDED_DIRECTION.BACKWARD
            ? -config.turnSpeed
            : config.turnSpeed;
      }
    }

    if (keys.right) {
      if (isStationary) {
        targetTurn = -config.turnSpeed;
      } else {
        targetTurn =
          currentState.intendedDirection === INTENDED_DIRECTION.BACKWARD
            ? config.turnSpeed
            : -config.turnSpeed;
      }
    }

    if (targetTurn !== 0) {
      currentState.angularVelocity +=
        (targetTurn - currentState.angularVelocity) * 0.1;
    } else {
      currentState.angularVelocity *= 1 - config.turnDeceleration;
    }

    if (Math.abs(currentState.angularVelocity) > 0.001) {
      boat.rotateY(currentState.angularVelocity * deltaMultiplier);
    }

    if (Math.abs(currentState.speed) > 0.001) {
      boat.translateX(-currentState.speed * deltaMultiplier);
    }

    if (Math.abs(currentState.speed) < 0.001) currentState.speed = 0;
    if (Math.abs(currentState.angularVelocity) < 0.001)
      currentState.angularVelocity = 0;
  });

  return { floatingRef };
};
