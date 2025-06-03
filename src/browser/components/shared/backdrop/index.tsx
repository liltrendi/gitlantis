import { Text } from "@react-three/drei";
import { useMemo } from "react";
import { Shape } from "three";

const widthCache = new Map<string, number>();

const getApproximateLabelWidth = (text: string, fontSize: number) => {
  const cacheKey = `${text}-${fontSize}`;
  if (widthCache.has(cacheKey)) return widthCache.get(cacheKey)!;

  const averageCharWidth = 0.6; // this value is in fontSize-relative units
  const width = text.length * averageCharWidth * fontSize;
  widthCache.set(cacheKey, width);
  return width;
}

export const Backdrop = ({
  label,
  yPosition = 1.5,
  fontSize = 0.2
}: {
  label: string;
  yPosition?: number;
  fontSize?: number;
}) => {
  const paddingX = 0.12 * fontSize;
  const width = getApproximateLabelWidth(label, fontSize) + paddingX * 2;

  const height = fontSize * 2.5;
  const radius = fontSize * 0.5;

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
    <group position={[0, yPosition, 0]}>
      {/* @ts-expect-error */}
      <mesh position={[0, 0, -0.01]} rotation-y={-Math.PI / 2}>
        {/* @ts-expect-error */}
        <shapeGeometry args={[shape]} />
        {/* @ts-expect-error */}
        <meshBasicMaterial color="#222" transparent opacity={0.85} />
        {/* @ts-expect-error */}
      </mesh>
      <Text
        fontSize={fontSize}
        color="#f2bc07"
        anchorX="center"
        anchorY="middle"
        rotation-y={-Math.PI / 2}
        position-x={-0.1}
      >
        {label}
      </Text>
      {/* @ts-expect-error */}
    </group>
  );
};
