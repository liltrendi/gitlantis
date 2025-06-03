import { useFrame } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import { Vector3 } from "three";
import { useNodeShortcuts } from "@/browser/hooks/useNode/shortcuts";

export const useNodeCollision = ({
  nodes,
  boatRef,
  nodeRef,
}: {
  nodes: TNodeInstances
  boatRef: TBoatRef;
  nodeRef: TNodeRef;
}) => {
  const [trackedCollisions, setTrackedCollisions] = useState<boolean[]>([]);

  const trackCollisions = useCallback((index: number, isColliding: boolean) => {
    setTrackedCollisions((prev) => {
      const newStates = [...prev];
      newStates[index] = isColliding;
      return newStates;
    });
  }, []);

  const collisionStateRef = useRef<boolean[]>([]);

  useFrame(() => {
    if (!boatRef?.current || !nodeRef?.current) return;

    const boat = boatRef.current;

    const AVOIDANCE_RADIUS = 150;
    const PUSH_STRENGTH = 2.5;

    let avoidanceVector = new Vector3(0, 0, 0);

    if (collisionStateRef.current.length !== nodeRef.current.length) {
      collisionStateRef.current = new Array(nodeRef.current.length).fill(false);
    }

    for (let i = 0; i < nodeRef.current.length; i++) {
      const node = nodeRef.current[i];
      const previousState = collisionStateRef.current[i];

      if (!node) {
        if (previousState !== false) {
          collisionStateRef.current[i] = false;
          trackCollisions?.(i, false);
        }
        continue;
      }

      const toNode = new Vector3().subVectors(boat.position, node.position);
      toNode.y = 0;
      const distance = toNode.length();

      const isColliding = distance < AVOIDANCE_RADIUS && distance > 0.01;

      // notify only when state changes
      if (previousState !== isColliding) {
        collisionStateRef.current[i] = isColliding;
        trackCollisions?.(i, isColliding);
      }

      if (isColliding) {
        const strength = (AVOIDANCE_RADIUS - distance) / AVOIDANCE_RADIUS;
        toNode.normalize().multiplyScalar(strength * PUSH_STRENGTH);
        avoidanceVector.add(toNode);
      }
    }

    boat.position.add(avoidanceVector);
  });

  useNodeShortcuts({nodes, collisionStateRef})

  return { trackedCollisions };
};
