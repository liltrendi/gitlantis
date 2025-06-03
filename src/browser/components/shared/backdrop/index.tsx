import { Text } from "@react-three/drei";
import { useMemo } from "react";
import { Shape } from "three";

const textDimensionsCache = new Map<string, { width: number; height: number; lines: number }>();

const getTextDimensions = (text: string, fontSize: number, maxWidth: number) => {
  const cacheKey = `${text}-${fontSize}-${maxWidth || 'no-limit'}`;
  if (textDimensionsCache.has(cacheKey)) return textDimensionsCache.get(cacheKey)!;
  
  const averageCharWidth = 0.7;
  const lineHeight = fontSize * 1.7; // typical line height multiplier
  
  if (!maxWidth) {
    // no wrapping
    const width = text.length * averageCharWidth * fontSize;
    const result = { width, height: lineHeight, lines: 1 };
    textDimensionsCache.set(cacheKey, result);
    return result;
  }
  
  // calculate wrapping
  const words = text.split(' ');
  const maxCharsPerLine = Math.floor(maxWidth / (averageCharWidth * fontSize));
  
  let lines = 1;
  let currentLineLength = 0;
  let maxLineWidth = 0;
  
  for (const word of words) {
    const wordLength = word.length;
    const spaceNeeded = currentLineLength === 0 ? wordLength : wordLength + 1; // +1 for space
    
    if (currentLineLength + spaceNeeded > maxCharsPerLine && currentLineLength > 0) {
      // word doesn't fit, start new line
      maxLineWidth = Math.max(maxLineWidth, currentLineLength * averageCharWidth * fontSize);
      lines++;
      currentLineLength = wordLength;
    } else {
      currentLineLength += spaceNeeded;
    }
  }
  
  // account for the last line
  maxLineWidth = Math.max(maxLineWidth, currentLineLength * averageCharWidth * fontSize);
  
  // use maxWidth if text doesn't fill it completely
  const actualWidth = Math.min(maxWidth, maxLineWidth);
  const totalHeight = lines * lineHeight;
  
  const result = { width: actualWidth, height: totalHeight, lines };
  textDimensionsCache.set(cacheKey, result);
  return result;
};

export const Backdrop = ({
  label,
  yPosition = 1.5,
  fontSize = 0.2,
  color = "#f2bc07",
  frontOffset = 0,
  maxWidth = 10,
}: {
  label: string;
  yPosition?: number;
  fontSize?: number;
  color?: string;
  frontOffset?: number;
  maxWidth?: number;
}) => {
  if (!label) return null;

  const textDimensions = useMemo(() => {
    return getTextDimensions(label, fontSize, maxWidth);
  }, [label, fontSize, maxWidth]);

  const paddingX = 0.12 * fontSize;
  const paddingY = 0.1 * fontSize;
  
  const backgroundWidth = textDimensions.width + paddingX * 2;
  const backgroundHeight = textDimensions.height + paddingY * 2;
  const radius = fontSize * 0.3; // slightly smaller radius for better proportion with wrapped text

  const shape = useMemo(() => {
    const shape = new Shape();
    const halfWidth = backgroundWidth / 2;
    const halfHeight = backgroundHeight / 2;
    
    shape.moveTo(-halfWidth + radius, -halfHeight);
    shape.lineTo(halfWidth - radius, -halfHeight);
    shape.quadraticCurveTo(halfWidth, -halfHeight, halfWidth, -halfHeight + radius);
    shape.lineTo(halfWidth, halfHeight - radius);
    shape.quadraticCurveTo(halfWidth, halfHeight, halfWidth - radius, halfHeight);
    shape.lineTo(-halfWidth + radius, halfHeight);
    shape.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth, halfHeight - radius);
    shape.lineTo(-halfWidth, -halfHeight + radius);
    shape.quadraticCurveTo(-halfWidth, -halfHeight, -halfWidth + radius, -halfHeight);
    
    return shape;
  }, [backgroundWidth, backgroundHeight, radius]);

  return (
    // @ts-expect-error
    <group position={[frontOffset, yPosition, 0]}>
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
        color={color}
        anchorX="center"
        anchorY="middle"
        rotation-y={-Math.PI / 2}
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