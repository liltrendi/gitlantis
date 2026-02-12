import { Shape } from "three";

export type TBackdrop = {
  label: string;
  yPosition?: number;
  fontSize?: number;
  color?: string;
  background?: string;
  frontOffset?: number;
  maxWidth?: number;
  flatten?: boolean;
  isFile?: boolean;
};

const textDimensionsCache = new Map<
  string,
  { width: number; height: number; lines: number }
>();

export const getBackdropTextDimensions = (
  text: string,
  fontSize: number,
  maxWidth?: number
) => {
  const cacheKey = `${text}-${fontSize}-${maxWidth || "no-limit"}`;
  if (textDimensionsCache.has(cacheKey))
    return textDimensionsCache.get(cacheKey)!;

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
  const words = text.split(" ");
  const maxCharsPerLine = Math.floor(maxWidth / (averageCharWidth * fontSize));

  let lines = 1;
  let currentLineLength = 0;
  let maxLineWidth = 0;

  for (const word of words) {
    const wordLength = word.length;
    const spaceNeeded = currentLineLength === 0 ? wordLength : wordLength + 1; // +1 for space

    if (
      currentLineLength + spaceNeeded > maxCharsPerLine &&
      currentLineLength > 0
    ) {
      // word doesn't fit, start new line
      maxLineWidth = Math.max(
        maxLineWidth,
        currentLineLength * averageCharWidth * fontSize
      );
      lines++;
      currentLineLength = wordLength;
    } else {
      currentLineLength += spaceNeeded;
    }
  }

  // account for the last line
  maxLineWidth = Math.max(
    maxLineWidth,
    currentLineLength * averageCharWidth * fontSize
  );

  // use maxWidth if text doesn't fill it completely
  const actualWidth = Math.min(maxWidth, maxLineWidth);
  const totalHeight = lines * lineHeight;

  const result = { width: actualWidth, height: totalHeight, lines };
  textDimensionsCache.set(cacheKey, result);
  return result;
};

export const getBackdropShape = ({
  fontSize,
  textDimensions,
}: {
  fontSize: number;
  textDimensions: {
    width: number;
    height: number;
    lines: number;
  };
}) => {
  const paddingX = 0.12 * fontSize;
  const paddingY = 0.1 * fontSize;

  const backgroundWidth = textDimensions.width + paddingX * 2;
  const backgroundHeight = textDimensions.height + paddingY * 2;

  const radius = fontSize * 0.3;

  const shape = new Shape();
  const halfWidth = backgroundWidth / 2;
  const halfHeight = backgroundHeight / 2;

  shape.moveTo(-halfWidth + radius, -halfHeight);
  shape.lineTo(halfWidth - radius, -halfHeight);
  shape.quadraticCurveTo(
    halfWidth,
    -halfHeight,
    halfWidth,
    -halfHeight + radius
  );
  shape.lineTo(halfWidth, halfHeight - radius);
  shape.quadraticCurveTo(halfWidth, halfHeight, halfWidth - radius, halfHeight);
  shape.lineTo(-halfWidth + radius, halfHeight);
  shape.quadraticCurveTo(
    -halfWidth,
    halfHeight,
    -halfWidth,
    halfHeight - radius
  );
  shape.lineTo(-halfWidth, -halfHeight + radius);
  shape.quadraticCurveTo(
    -halfWidth,
    -halfHeight,
    -halfWidth + radius,
    -halfHeight
  );

  return shape;
};
