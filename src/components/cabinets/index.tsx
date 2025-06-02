import { Clone } from "@react-three/drei";
import { useCabinetModel } from "@/hooks/useCabinet";
import { useCabinetMovement } from "@/hooks/useCabinetMovement";
import { useCabinetGeneration } from "@/hooks/useCabinetGeneration";
import { useCabinetCollision } from "@/hooks/useCabinetCollision";
import { useGameContext } from "@/hooks/useGameContext";
import { Backdrop } from "../shared/backdrop";

export const Cabinets = () => {
  const { worldOffsetRef, boatRef, cabinetsRef, projectInfoRef } =
    useGameContext();

  const model = useCabinetModel();

  const { cabinets } = useCabinetGeneration({
    boatRef,
    cabinetsRef,
    worldOffsetRef,
  });

  useCabinetMovement({ cabinets, boatRef, cabinetsRef });
  useCabinetCollision({ boatRef, cabinetsRef });

  return (
    <>
      {cabinets
        .filter(
          (_, filterIndex) =>
            projectInfoRef?.current?.directories?.[filterIndex]?.name?.length >
            0
        )
        .map((instance, index) => {
          const text = projectInfoRef?.current?.directories?.[index]
            ?.name as string;
          return (
            // @ts-expect-error
            <group key={`cabinet-${index}-${instance.key}`}>
              <Clone
                ref={(el) => {
                  if (!cabinetsRef?.current) return;
                  cabinetsRef.current[index] = el;
                }}
                position={instance.position}
                object={model}
                scale={60}
              >
                <Backdrop text={text} />
              </Clone>
              {/* @ts-expect-error */}
            </group>
          );
        })}
    </>
  );
};
