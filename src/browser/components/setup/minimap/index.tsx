import { useRef } from "react";
import { OrthographicCamera } from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { OrthographicCamera as MinimapCamera } from "@react-three/drei";
import { useGameContext } from "@/browser/hooks/useGame/context";

export const Minimap = () => {
  const { gl, scene, size } = useThree();
  const virtualCam = useRef<OrthographicCamera>(null);
  const { boatRef } = useGameContext();

  useFrame(() => {
    if (!virtualCam.current || !boatRef?.current) return;

    const targetPos = boatRef.current.position;
    virtualCam.current.position.set(targetPos.x, targetPos.y + 50, targetPos.z);
    virtualCam.current.lookAt(targetPos);
    virtualCam.current.updateMatrixWorld();

    gl.autoClear = false;
    gl.clearDepth();
    gl.setScissorTest(true);

    const width = 120, height = 120;
    const x = size.width - width - 10;
    const y = size.height - height - 10

    gl.setViewport(x, y, width, height);
    gl.setScissor(x, y, width, height);
    gl.render(scene, virtualCam.current);

    gl.setScissorTest(false);
    gl.setViewport(0, 0, size.width, size.height);
  });

  return <MinimapCamera ref={virtualCam} makeDefault={false} zoom={3.5}  />;
};
