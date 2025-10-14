// @ts-nocheck
import { useGLTF } from "@react-three/drei";
import { BOAT_MODEL_PATH, CLOUDFRONT_ROOT_URL } from "@/browser/config";
import { useNavigation } from "@/browser/hooks/useBoat/navigation";
import { useGameContext } from "@/browser/hooks/useGame/context";
import { useBoatColors } from "@/browser/hooks/useBoat/colors";
import { Vector3 } from "three";

const globalUris = (window as any).__GLOBAL_URIS__ || {
  boat: BOAT_MODEL_PATH,
};

export const Boat = () => {
  const { boatRef, floatingRef, isBrowserEnvironment, isMinimapFullScreen } =
    useGameContext();
  const { nodes, materials } = useGLTF(
    `${isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : ""}${globalUris.boat}`
  );

  const { walls, roof, hull, rails, body, floaters } = useBoatColors({
    materials,
  });

  useNavigation({ boatRef, floatingRef });

  const boatScale = ((isFullScreen) => {
    const scale = isFullScreen ? 0.06 : 0.03;
    return new Vector3(scale, scale, scale);
  })(isMinimapFullScreen);

  return (
    <group ref={boatRef} position={[0, -5.5, -20]} dispose={null}>
      <group ref={floatingRef} rotation={[Math.PI, 0, 0]}>
        <mesh
          scale={[boatScale.x, boatScale.y, boatScale.z]}
          material={walls}
          geometry={nodes?.Object_2?.geometry}
        />
        <mesh
          scale={[boatScale.x, boatScale.y, boatScale.z]}
          geometry={nodes?.Object_3?.geometry}
          material={floaters}
        />
        <mesh
          scale={[boatScale.x, boatScale.y, boatScale.z]}
          geometry={nodes?.Object_5?.geometry}
          material={hull}
        />
        <mesh
          scale={[boatScale.x, boatScale.y, boatScale.z]}
          geometry={nodes?.Object_9?.geometry}
          material={materials?.PaletteMaterial002}
        />
        <mesh
          scale={[boatScale.x, boatScale.y, boatScale.z]}
          geometry={nodes?.Object_10?.geometry}
          material={roof}
        />
        <mesh
          scale={[boatScale.x, boatScale.y, boatScale.z]}
          geometry={nodes?.Object_12?.geometry}
          material={rails}
        />
        <mesh
          scale={[boatScale.x, boatScale.y, boatScale.z]}
          geometry={nodes?.Object_15?.geometry}
          material={body}
        />
      </group>
    </group>
  );
};
