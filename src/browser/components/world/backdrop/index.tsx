import { Text } from "@react-three/drei";
import { useMemo } from "react";
import {
  getBackdropShape,
  getBackdropTextDimensions,
  type TBackdrop,
} from "@/browser/components/world/backdrop/utils";

export const Backdrop = ({
  label,
  color,
  fontSize = 0.2,
  yPosition = 1.5,
  frontOffset = 0,
  flatten = false,
  maxWidth = undefined,
}: TBackdrop) => {
  const textDimensions = useMemo(() => {
    return getBackdropTextDimensions(label, fontSize, maxWidth);
  }, [label, fontSize, maxWidth]);

  const shape = useMemo(() => {
    const backdropShape = getBackdropShape({ fontSize, textDimensions });
    return backdropShape;
  }, [fontSize, textDimensions]);

  const zRotation = flatten ? -1.2 : 0;
  const yRotation = -Math.PI / 2;

  if (!label) return null;

  return (
    // @ts-expect-error
    <group position={[frontOffset, yPosition, 0]} rotation-z={zRotation}>
      {/* @ts-expect-error */}
      <mesh position={[0, 0, -0.01]} rotation-y={yRotation}>
        {/* @ts-expect-error */}
        <shapeGeometry args={[shape]} />
        {/* @ts-expect-error */}
        <meshBasicMaterial color="#222" transparent opacity={0.85} />
        {/* @ts-expect-error */}
      </mesh>
      <Text
        fontSize={fontSize}
        color={color ?? "#f2bc07"}
        anchorX="center"
        anchorY="middle"
        rotation-y={yRotation}
        position-x={-0.1}
        maxWidth={maxWidth}
        textAlign="center"
      >
        {label}
      </Text>
      {/* @ts-expect-error */}
    </group>
  );
};
