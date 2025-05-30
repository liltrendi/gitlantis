import { type RefObject } from "react";
import { Object3D, Vector3, Group } from "three";
import { Clone } from "@react-three/drei";
import { useCabinetModel } from "@/hooks/useCabinet";
import { useCabinetMovement } from "@/hooks/useCabinetMovement";
import { useCabinetGeneration } from "@/hooks/useCabinetGeneration";
import { useCabinetCollision } from "@/hooks/useCabinetCollision";

export const Cabinets = ({
  boatRef,
  worldOffset,
  cabinetsRef,
  cabinetCount,
}: {
  worldOffset: RefObject<Vector3>;
  boatRef: RefObject<Group | null>;
  cabinetsRef: RefObject<Array<Object3D | null>>;
  cabinetCount: number;
}) => {
  const model = useCabinetModel();

  const { cabinetInstances } = useCabinetGeneration({
    boatRef,
    cabinetCount,
    cabinetsRef,
    worldOffset,
  });

  useCabinetMovement({ cabinetInstances, boatRef, cabinetsRef });

  useCabinetCollision({ boatRef, cabinetsRef });

  return (
    <>
      {cabinetInstances.map((instance, idx) => (
        <Clone
          key={instance.key}
          ref={(el) => {
            cabinetsRef.current[idx] = el;
          }}
          position={instance.position}
          object={model}
          scale={2.5}
        />
      ))}
    </>
  );
};
