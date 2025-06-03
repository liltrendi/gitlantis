import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

export const useNodeCollision = ({
  boatRef,
  nodeRef,
}: {
  boatRef: TBoatRef;
  nodeRef: TNodeRef;
}) => {
  useFrame(() => {
    if (!boatRef?.current || !nodeRef?.current) return;

    const boat = boatRef.current;

    const AVOIDANCE_RADIUS = 100;
    const PUSH_STRENGTH = 2.5;

    let avoidanceVector = new Vector3(0, 0, 0);

    for (let i = 0; i < nodeRef.current.length; i++) {
      const node = nodeRef.current[i];
      if (!node) continue;

      const toNode = new Vector3().subVectors(
        boat.position,
        node.position
      );
      toNode.y = 0;
      const distance = toNode.length();

      if (distance < AVOIDANCE_RADIUS && distance > 0.01) {
        const strength = (AVOIDANCE_RADIUS - distance) / AVOIDANCE_RADIUS;
        toNode.normalize().multiplyScalar(strength * PUSH_STRENGTH);
        avoidanceVector.add(toNode);
      }
    }

    boat.position.add(avoidanceVector);
  });
};
