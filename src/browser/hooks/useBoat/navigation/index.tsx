import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboard } from "@/browser/hooks/useBoat/keyboard";
import { useGameStore } from "@/browser/hooks/useGame/store";

export const useNavigation = ({ boatRef }: { boatRef: TBoatRef }) => {
  const keys = useKeyboard();
  const { settings } = useGameStore();

  const config = {
    maxSpeed: settings.boatSpeed,
    acceleration: settings.acceleration,
    deceleration: settings.deceleration,
    turnSpeed: settings.turnSpeed,
    turnDeceleration: settings.turnDeceleration,
  };

  const state = useRef({
    velocity: { x: 0, z: 0 },
    angularVelocity: 0,
    speed: 0,
  });

  useFrame((_, delta) => {
    if (!boatRef?.current) return;
    const boat = boatRef.current;
    if (!boat) return;

    const deltaMultiplier = Math.min(delta * 60, 2);
    const currentState = state.current;

    // handle forward/backward input
    let targetSpeed = 0;
    if (keys.forward) targetSpeed = config.maxSpeed;
    if (keys.backward) targetSpeed = -config.maxSpeed * 0.5;

    // accelerate or decelerate towards target speed
    if (targetSpeed !== 0) {
      currentState.speed +=
        (targetSpeed - currentState.speed) * config.acceleration;
    } else {
      currentState.speed *= 1 - config.deceleration;
    }

    // handle turning
    let targetTurn = 0;
    const isMovingBackward = currentState.speed < 0;
    if (keys.left) {
      targetTurn = isMovingBackward ? -config.turnSpeed : config.turnSpeed;
    }
    if (keys.right) {
      targetTurn = isMovingBackward ? config.turnSpeed : -config.turnSpeed;
    }

    // apply turning
    if (targetTurn !== 0) {
      currentState.angularVelocity +=
        (targetTurn - currentState.angularVelocity) * 0.1;
    } else {
      currentState.angularVelocity *= 1 - config.turnDeceleration;
    }

    // apply rotation
    if (Math.abs(currentState.angularVelocity) > 0.001) {
      boat.rotateY(currentState.angularVelocity * deltaMultiplier);
    }

    // apply forward movement in the boat's current direction
    if (Math.abs(currentState.speed) > 0.001) {
      boat.translateX(currentState.speed * deltaMultiplier);
    }

    // clean up tiny values
    if (Math.abs(currentState.speed) < 0.001) currentState.speed = 0;
    if (Math.abs(currentState.angularVelocity) < 0.001)
      currentState.angularVelocity = 0;
  });

  return {
    speed: state.current.speed,
    angularVelocity: state.current.angularVelocity,
    isBoatMoving:
      Math.abs(state.current.speed) > 0.001 ||
      Math.abs(state.current.angularVelocity) > 0.001,
  };
};
