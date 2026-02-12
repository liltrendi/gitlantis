import { Euler, Matrix4, Quaternion, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

export const useNodeMovement = ({
  nodes,
  boatRef,
  nodeRef,
  isMinimapFullScreen,
}: {
  nodes: TNodeInstances;
  boatRef: TBoatRef;
  nodeRef: TNodeRef;
  isMinimapFullScreen: boolean;
}) => {
  const FLOAT_AMPLITUDE = 2.0;
  const FLOAT_SPEED = 3.0;

  const fixedQuat = new Quaternion().setFromEuler(new Euler(0, -Math.PI, 0));

  useFrame(({ clock }) => {
    if (!boatRef?.current || !nodeRef?.current) return;

    const boatPos = boatRef.current.position.clone();
    const time = clock.getElapsedTime();

    nodeRef.current.forEach((node, idx) => {
      if (!node || !nodes[idx]) return;

      const instance = nodes[idx];
      const floatOffset =
        Math.sin(time * FLOAT_SPEED + instance.floatPhase) * FLOAT_AMPLITUDE;

      node.position.y = -instance.sinkOffset + floatOffset;

      if (isMinimapFullScreen) {
        node.quaternion.copy(fixedQuat);
        return;
      }

      const from = node.position.clone();
      const to = boatPos.clone().setY(from.y);

      const lookAtMatrix = new Matrix4().lookAt(from, to, new Vector3(0, 1, 0));
      const targetQuat = new Quaternion().setFromRotationMatrix(lookAtMatrix);

      const correction = new Quaternion().setFromEuler(
        new Euler(0, -Math.PI / 2, 0)
      );
      targetQuat.multiply(correction);

      node.quaternion.slerp(targetQuat, 0.1);
    });
  });
};
