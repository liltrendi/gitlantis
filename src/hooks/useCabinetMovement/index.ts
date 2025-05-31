import { Euler, Matrix4, Quaternion, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

export const useCabinetMovement = ({
  cabinets,
  boatRef,
  cabinetsRef,
}: {
  cabinets: TCabinetInstances;
  boatRef: TBoatRef;
  cabinetsRef: TCabinetsRef;
}) => {
  const FLOAT_AMPLITUDE = 2.0;
  const FLOAT_SPEED = 3.0;

  useFrame(({ clock }) => {
    if (!boatRef?.current || !cabinetsRef?.current) return;

    const boatPos = boatRef.current.position.clone();
    const time = clock.getElapsedTime();

    cabinetsRef.current.forEach((cabinet, idx) => {
      if (!cabinet || !cabinets[idx]) return;

      const instance = cabinets[idx];

      const floatOffset =
        Math.sin(time * FLOAT_SPEED + instance.floatPhase) * FLOAT_AMPLITUDE;

      cabinet.position.y = -instance.sinkOffset + floatOffset;

      const from = cabinet.position.clone();
      const to = boatPos.clone().setY(from.y);

      const lookAtMatrix = new Matrix4().lookAt(from, to, new Vector3(0, 1, 0));
      const targetQuat = new Quaternion().setFromRotationMatrix(lookAtMatrix);

      const correction = new Quaternion().setFromEuler(
        new Euler(0, -Math.PI / 2, 0)
      );
      targetQuat.multiply(correction);

      cabinet.quaternion.slerp(targetQuat, 0.1);
    });
  });
};
