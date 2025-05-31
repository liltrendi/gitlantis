import { Clone } from "@react-three/drei";
import { useCabinetModel } from "@/hooks/useCabinet";
import { useCabinetMovement } from "@/hooks/useCabinetMovement";
import { useCabinetGeneration } from "@/hooks/useCabinetGeneration";
import { useCabinetCollision } from "@/hooks/useCabinetCollision";
import { useGameContext } from "@/hooks/useGameContext";

export const Cabinets = () => {
  const model = useCabinetModel();
  const { worldOffsetRef, boatRef, cabinetsRef } = useGameContext();

  const { cabinets } = useCabinetGeneration({
    boatRef,
    cabinetsRef,
    worldOffsetRef,
  });

  useCabinetMovement({ cabinets, boatRef, cabinetsRef });

  useCabinetCollision({ boatRef, cabinetsRef });

  return (
    <>
      {cabinets.map((instance, idx) => (
        <Clone
          key={instance.key}
          ref={(el) => {
            if (!cabinetsRef?.current) return;
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
