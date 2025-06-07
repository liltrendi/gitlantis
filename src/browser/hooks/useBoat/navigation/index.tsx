import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboard } from "@/browser/hooks/useBoat/keyboard";
import { useGameStore } from "@/browser/hooks/useGame/store";

export const useNavigation = ({
  boatRef,
  floatingRef,
}: {
  boatRef: TBoatRef;
  floatingRef: TBoatRef;
}) => {
  const keys = useKeyboard();
  const { settings } = useGameStore();

  const config = {
    maxSpeed: settings.boatSpeed,
    acceleration: settings.acceleration,
    deceleration: settings.deceleration,
    turnSpeed: settings.turnSpeed,
    turnDeceleration: settings.turnDeceleration,
    rockingAmplitude: 0.05,
    rockingSpeed: 0.3,
    bobbingAmplitude: 0.05,
    bobbingSpeed: 0.8,
  };

  const state = useRef({
    velocity: { x: 0, z: 0 },
    angularVelocity: 0,
    speed: 0,
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
    floating.rotation.z =
      Math.sin(time * config.rockingSpeed * Math.PI * 2) *
      config.rockingAmplitude *
      movementFactor;
    floating.position.y =
      Math.sin(time * config.bobbingSpeed * Math.PI * 2) *
      config.bobbingAmplitude *
      movementFactor;

    // handle forward/backward input
    let targetSpeed = 0;
    if (keys.forward) targetSpeed = config.maxSpeed;
    if (keys.backward) targetSpeed = -config.maxSpeed * 0.5;

    if (targetSpeed !== 0) {
      currentState.speed +=
        (targetSpeed - currentState.speed) * config.acceleration;
    } else {
      currentState.speed *= 1 - config.deceleration;
    }

    let targetTurn = 0;
    const isMovingBackward = currentState.speed < 0;
    if (keys.left) {
      targetTurn = isMovingBackward ? -config.turnSpeed : config.turnSpeed;
    }
    if (keys.right) {
      targetTurn = isMovingBackward ? config.turnSpeed : -config.turnSpeed;
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
      boat.translateX(currentState.speed * deltaMultiplier);
    }

    if (Math.abs(currentState.speed) < 0.001) currentState.speed = 0;
    if (Math.abs(currentState.angularVelocity) < 0.001)
      currentState.angularVelocity = 0;
  });
};
