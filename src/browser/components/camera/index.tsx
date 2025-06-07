import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { PerspectiveCamera } from "@react-three/drei";
import { useGameContext } from "@/browser/hooks/useGame/context";

export const Camera = () => {
  const { boatRef } = useGameContext();
  const { camera } = useThree();
  const idealCameraPosition = useRef(new Vector3());
  const idealLookAt = useRef(new Vector3());

  useFrame(() => {
    if (!boatRef?.current) return;

    const boatPosition = new Vector3();
    const boatQuaternion = new Quaternion();
    boatRef.current.getWorldPosition(boatPosition);
    boatRef.current.getWorldQuaternion(boatQuaternion);

    const offsetVector = new Vector3(150, 25, 25);
    offsetVector.applyQuaternion(boatQuaternion);
    idealCameraPosition.current.copy(boatPosition).add(offsetVector);

    const lookAtOffset = new Vector3(0, 20, -0.5);
    lookAtOffset.applyQuaternion(boatQuaternion);
    idealLookAt.current.copy(boatPosition).add(lookAtOffset);

    camera.position.lerp(idealCameraPosition.current, 0.1);
    camera.lookAt(idealLookAt.current);
  });

  return (
    <PerspectiveCamera
      makeDefault
      fov={40}
      near={1}
      far={5000}
      position={[0, -50, 100]}
    />
  );
};
