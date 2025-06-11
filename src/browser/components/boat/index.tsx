// @ts-nocheck
import { useGLTF } from "@react-three/drei";
import { BOAT_MODEL_PATH, CLOUDFRONT_ROOT_URL } from "@/browser/config";
import { useNavigation } from "@/browser/hooks/useBoat/navigation";
import { useGameContext } from "@/browser/hooks/useGame/context";
import { useRef } from "react";

const globalUris = (window as any).__GLOBAL_URIS__ || {
  boat: BOAT_MODEL_PATH,
};

export const Boat = () => {
  const { boatRef, floatingRef, isBrowserEnvironment } = useGameContext();
  const { nodes, materials } = useGLTF(`${isBrowserEnvironment ? CLOUDFRONT_ROOT_URL:""}${globalUris.boat}`);

  useNavigation({ boatRef, floatingRef });

  return (
    <group ref={boatRef} position={[0, -5.5, -20]} dispose={null}>
      <group ref={floatingRef} rotation={[Math.PI, 0, 0]}>
        <axesHelper args={[3]} />
        <mesh
          scale={[0.03, 0.03, 0.03]}
          material={materials?.boat_body}
          geometry={nodes?.Object_2?.geometry}
        />
        <mesh
          scale={[0.03, 0.03, 0.03]}
          material={materials?.boat_buffer}
          geometry={nodes?.Object_3?.geometry}
        />
        <mesh
          scale={[0.03, 0.03, 0.03]}
          geometry={nodes?.Object_5?.geometry}
          material={materials?.PaletteMaterial001}
        />
        <mesh
          scale={[0.03, 0.03, 0.03]}
          geometry={nodes?.Object_9?.geometry}
          material={materials?.PaletteMaterial002}
        />
        <mesh
          scale={[0.03, 0.03, 0.03]}
          geometry={nodes?.Object_10?.geometry}
          material={materials?.boat_roof_accessory}
        />
        <mesh
          scale={[0.03, 0.03, 0.03]}
          geometry={nodes?.Object_12?.geometry}
          material={materials?.PaletteMaterial003}
        />
        <mesh
          scale={[0.03, 0.03, 0.03]}
          geometry={nodes?.Object_15?.geometry}
          material={materials?.PaletteMaterial004}
        />
      </group>
    </group>
  );
};
