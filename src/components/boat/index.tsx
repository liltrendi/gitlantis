import { type Group } from "three";
import { forwardRef, useRef } from "react";
import { useBoat } from "@/hooks/useBoat";

export const Boat = forwardRef<Group>((_, ref) => {
  const internalRef = useRef<Group>(null);
  const groupRef = (ref as TBoatRef) || internalRef;

  const {
    boatModel: { nodes, materials },
  } = useBoat(groupRef);

  return (
    // @ts-ignore
    <group ref={groupRef} dispose={null}><group position={[0, -4.5, 0]} rotation={[-Math.PI, Math.PI, 0]}><mesh scale={[0.03, 0.03, 0.03]} material={materials?.boat_body} geometry={nodes?.Object_2?.geometry} /><mesh scale={[0.03, 0.03, 0.03]} material={materials?.boat_buffer} geometry={nodes?.Object_3?.geometry} /><mesh scale={[0.03, 0.03, 0.03]} geometry={nodes?.Object_5?.geometry} material={materials?.PaletteMaterial001} /><mesh scale={[0.03, 0.03, 0.03]} geometry={nodes?.Object_9?.geometry} material={materials?.PaletteMaterial002} /><mesh scale={[0.03, 0.03, 0.03]} geometry={nodes?.Object_10?.geometry} material={materials?.boat_roof_accessory} /><mesh scale={[0.03, 0.03, 0.03]} geometry={nodes?.Object_12?.geometry} material={materials?.PaletteMaterial003} /><mesh scale={[0.03, 0.03, 0.03]} geometry={nodes?.Object_15?.geometry} material={materials?.PaletteMaterial004} /></group></group>
  );
});
