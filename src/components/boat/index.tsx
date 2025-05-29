import { type Group } from "three";
import { forwardRef, type RefObject } from "react";
import { useGLTF } from "@react-three/drei";
import { BOAT_MODEL_PATH } from "@/config";
import { useAdvancedNavigation } from "@/hooks/useNavigation";

export const Boat = forwardRef<Group>((_, ref) => {
  const boatRef = ref as RefObject<Group | null>;
  const {nodes, materials} = useGLTF(BOAT_MODEL_PATH);

	useAdvancedNavigation({ boatRef});

  // @ts-ignore
  return <group ref={boatRef} dispose={null}><group position={[0, -4.5, 0]} rotation={[-Math.PI, Math.PI, 0]}><mesh scale={[0.03, 0.03, 0.03]} material={materials?.boat_body} geometry={nodes?.Object_2?.geometry} /><mesh scale={[0.03, 0.03, 0.03]} material={materials?.boat_buffer} geometry={nodes?.Object_3?.geometry} /><mesh scale={[0.03, 0.03, 0.03]} geometry={nodes?.Object_5?.geometry} material={materials?.PaletteMaterial001} /><mesh scale={[0.03, 0.03, 0.03]} geometry={nodes?.Object_9?.geometry} material={materials?.PaletteMaterial002} /><mesh scale={[0.03, 0.03, 0.03]} geometry={nodes?.Object_10?.geometry} material={materials?.boat_roof_accessory} /><mesh scale={[0.03, 0.03, 0.03]} geometry={nodes?.Object_12?.geometry} material={materials?.PaletteMaterial003} /><mesh scale={[0.03, 0.03, 0.03]} geometry={nodes?.Object_15?.geometry} material={materials?.PaletteMaterial004} /></group></group>
});
