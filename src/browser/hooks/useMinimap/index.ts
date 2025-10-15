import {
  type OrthographicCamera,
  Raycaster,
  Scene,
  Vector2,
  WebGLRenderer,
} from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import { useGameContext } from "@/browser/hooks/useGame/context";

export const useMinimapCamera = () => {
  const { gl, size, scene } = useThree();
  const { boatRef, settings, isMinimapFullScreen } = useGameContext();

  const virtualCam = useRef<OrthographicCamera>(null);

  const minimapSize = isMinimapFullScreen
    ? { width: size.width, height: size.height }
    : { width: 120, height: 120 };

  const minimapPosition = isMinimapFullScreen
    ? {
        x: (size.width - minimapSize.width) / 2,
        y: (size.height - minimapSize.height) / 2,
      }
    : {
        x: size.width - minimapSize.width - 10,
        y: 10,
      };

  useFrame(() => {
    if (!virtualCam.current || !boatRef?.current || settings.minimap === "Hide")
      return;

    const targetPos = boatRef.current.position;
    virtualCam.current.position.set(targetPos.x, targetPos.y + 50, targetPos.z);
    virtualCam.current.lookAt(targetPos);
    virtualCam.current.rotateZ(Math.PI / 2);
    virtualCam.current.updateMatrixWorld();

    gl.autoClear = false;
    gl.clearDepth();
    gl.setScissorTest(true);

    gl.setViewport(
      minimapPosition.x,
      minimapPosition.y,
      minimapSize.width,
      minimapSize.height
    );
    gl.setScissor(
      minimapPosition.x,
      minimapPosition.y,
      minimapSize.width,
      minimapSize.height
    );
    gl.render(scene, virtualCam.current);

    gl.setScissorTest(false);
    gl.setViewport(0, 0, size.width, size.height);
  });

  return { gl, scene, virtualCam, minimapPosition, minimapSize };
};

export const useMinimapClickHandler = ({
  minimapPosition,
  minimapSize,
  virtualCam,
  scene,
  gl,
}: {
  minimapPosition: { x: number; y: number };
  minimapSize: { width: number; height: number };
  virtualCam: RefObject<OrthographicCamera | null>;
  scene: Scene;
  gl: WebGLRenderer;
}) => {
  const raycaster = new Raycaster();
  const pointer = new Vector2();

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const { clientX, clientY } = event;
      const inside =
        clientX >= minimapPosition.x &&
        clientX <= minimapPosition.x + minimapSize.width &&
        clientY >= minimapPosition.y &&
        clientY <= minimapPosition.y + minimapSize.height;

      if (!inside || !virtualCam.current) return;

      pointer.x = ((clientX - minimapPosition.x) / minimapSize.width) * 2 - 1;
      pointer.y = -((clientY - minimapPosition.y) / minimapSize.height) * 2 + 1;

      raycaster.setFromCamera(pointer, virtualCam.current);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length) {
        const object = intersects[0].object;
        object.userData?.openOnClick();
      }
    }

    gl.domElement.addEventListener("click", onClick);
    return () => gl.domElement.removeEventListener("click", onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, minimapPosition, minimapSize]);
};
