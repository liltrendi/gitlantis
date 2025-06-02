import { Text } from "@react-three/drei";
import { useMemo } from "react";
import { Shape } from "three";

const widthCache = new Map<string, number>();

const getEstimatedTextSize = (text: string) => {
  if (widthCache.has(text)) return widthCache.get(text)!;

  const averageCharWidth = 0.12;
  const width = text.length * averageCharWidth;
  widthCache.set(text, width);
  return width;
};

export const Backdrop = ({ text }: { text: string }) => {
  const paddingX = 0.12;
  const width = getEstimatedTextSize(text) + paddingX * 2;

  const height = 0.5;
  const radius = 0.1;

  const shape = useMemo(() => {
    const shape = new Shape();

    shape.moveTo(-width / 2 + radius, -height / 2);
    shape.lineTo(width / 2 - radius, -height / 2);
    shape.quadraticCurveTo(
      width / 2,
      -height / 2,
      width / 2,
      -height / 2 + radius
    );
    shape.lineTo(width / 2, height / 2 - radius);
    shape.quadraticCurveTo(
      width / 2,
      height / 2,
      width / 2 - radius,
      height / 2
    );
    shape.lineTo(-width / 2 + radius, height / 2);
    shape.quadraticCurveTo(
      -width / 2,
      height / 2,
      -width / 2,
      height / 2 - radius
    );
    shape.lineTo(-width / 2, -height / 2 + radius);
    shape.quadraticCurveTo(
      -width / 2,
      -height / 2,
      -width / 2 + radius,
      -height / 2
    );

    return shape;
  }, [width, height, radius]);

  return (
    // @ts-expect-error
    <group position={[0, 1.53, 0]}>
      {/* @ts-expect-error */}
      <mesh position={[0, 0, -0.01]} rotation-y={-Math.PI / 2}>
        {/* @ts-expect-error */}
        <shapeGeometry args={[shape]} />
        {/* @ts-expect-error */}
        <meshBasicMaterial color="#302c29" transparent opacity={0.85} />
        {/* @ts-expect-error */}
      </mesh>
      <Text
        fontSize={0.2}
        color="#f2bc07"
        anchorX="center"
        anchorY="middle"
        rotation-y={-Math.PI / 2}
        position-x={-0.1}
      >
        {text}
      </Text>
      {/* @ts-expect-error */}
    </group>
  );
};
