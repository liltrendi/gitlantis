import { Clone, Text } from "@react-three/drei";
import { useCabinetModel } from "@/hooks/useCabinet";
import { useCabinetMovement } from "@/hooks/useCabinetMovement";
import { useCabinetGeneration } from "@/hooks/useCabinetGeneration";
import { useCabinetCollision } from "@/hooks/useCabinetCollision";
import { useGameContext } from "@/hooks/useGameContext";

export const Cabinets = () => {
  const { worldOffsetRef, boatRef, cabinetsRef, projectInfoRef } = useGameContext();

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
      {cabinets.map((instance, index) => {
        const text = projectInfoRef?.current?.directories?.[index];
        const backgroundWidth = text.length * 0.15;
        const textYRotation = -Math.PI / 2;

        return (
          // @ts-expect-error
          <group key={instance.key}>s
            <Clone
              ref={(el) => {
                if (!cabinetsRef?.current) return;
                cabinetsRef.current[index] = el;
              }}
              position={instance.position}
              object={model}
              scale={60}
            >
              {/* @ts-expect-error */}
              <group position={[0, 1.53, 0]}>
              {/* @ts-expect-error */}
                <mesh position={[0, 0, -0.01]} rotation-y={textYRotation}><planeGeometry args={[backgroundWidth, 0.5]} /><meshBasicMaterial color="#000" transparent opacity={0.85} /></mesh>
                <Text
                  fontSize={0.2}
                  color="#f2bc07"
                  anchorX="center"
                  anchorY="middle"
                  rotation-y={textYRotation}
                  position-x={-0.1}
                >
                  {text}
                </Text>
                {/* @ts-expect-error */}
              </group>
            </Clone>
            {/* @ts-expect-error */}
          </group>
        );
      })}
    </>
  );
};
