import { useGameContext } from "@/browser/hooks/useGame/context";
import { useState, useEffect } from "react";
import { Euler } from "three";

export const useBoatCompass = () => {
  const { boatRef } = useGameContext();
  const [currentRotation, setCurrentRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (boatRef?.current) {
        const yawRadians = new Euler().setFromQuaternion(
          boatRef.current.quaternion,
          "YXZ"
        ).y;
        let yawDegrees = -(yawRadians * (180 / Math.PI));
        yawDegrees = ((yawDegrees % 360) + 360) % 360;
        setCurrentRotation(yawDegrees);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [boatRef]);

  const cardinals = [
    { label: "N", degree: 0 },
    { label: "NE", degree: 45 },
    { label: "E", degree: 90 },
    { label: "SE", degree: 135 },
    { label: "S", degree: 180 },
    { label: "SW", degree: 225 },
    { label: "W", degree: 270 },
    { label: "NW", degree: 315 },
  ];

  const getClosestCardinal = (degree: number) => {
    const normalizedDegree = ((degree % 360) + 360) % 360;
    let closestDirection = "";
    let minDifference = Infinity;

    for (const point of cardinals) {
      let difference = Math.abs(normalizedDegree - point.degree);

      if (difference > 180) {
        difference = 360 - difference;
      }

      if (difference < minDifference) {
        minDifference = difference;
        closestDirection = point.label;
      }
    }

    return closestDirection;
  };

  const createScrollableCompass = () => {
    const strip: Array<{ label: string; degree: number; key: string }> = [];
    for (let circle = -2; circle <= 2; circle++) {
      cardinals.forEach((cardinal) => {
        const adjustedDegree = cardinal.degree + circle * 360;
        strip.push({
          ...cardinal,
          degree: adjustedDegree,
          key: `${cardinal.label}-${circle}`,
        });
      });
    }
    return strip.sort((a, b) => a.degree - b.degree);
  };

  const compassStrip = createScrollableCompass();
  const compassWidth = 320;
  const markerWidth = 40;

  const degreesLabel = `${Math.round(currentRotation) ?? 0}° ${
    getClosestCardinal(Math.round(currentRotation)) ?? ""
  }`;

  return {
    currentRotation,
    compassWidth,
    markerWidth,
    compassStrip,
    degreesLabel,
  };
};
