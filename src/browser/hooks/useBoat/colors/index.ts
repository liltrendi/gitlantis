import { useEffect } from "react";
import { Material, MeshStandardMaterial } from "three";
import { useGameStore } from "@/browser/hooks/useGame/store";

export const useBoatColors = ({
  materials,
}: {
  materials: { [name: string]: Material };
}) => {
  const { settings } = useGameStore();
  const walls = materials["boat_body"];
  const roof = materials["boat_roof_accessory"];
  const hull = materials["PaletteMaterial001"];
  const rails = materials["PaletteMaterial003"];
  const body = materials["PaletteMaterial004"];
  const floaters = materials["boat_buffer"];

  useEffect(() => {
    if (walls) {
      materials["boat_body"] = new MeshStandardMaterial({
        color: settings.boatColors.walls,
        roughness: 0.8,
        metalness: 0.8,
      });
    }
    if (floaters) {
      materials["boat_buffer"] = new MeshStandardMaterial({
        color: settings.boatColors.floaters,
        roughness: 0.4,
        metalness: 0.4,
      });
    }
    if (roof) {
      materials["boat_roof_accessory"] = new MeshStandardMaterial({
        color: settings.boatColors.roof,
        roughness: 0.8,
        metalness: 0.8,
      });
    }
    if (hull) {
      materials["PaletteMaterial001"] = new MeshStandardMaterial({
        color: settings.boatColors.hull,
        roughness: 0.8,
        metalness: 0.8,
      });
    }
    if (body) {
      (body as MeshStandardMaterial).color.set(settings.boatColors.body);
    }
    if (rails) {
      (rails as MeshStandardMaterial).color.set(settings.boatColors.rails);
    }
  }, [materials, settings.boatColors]);

  return {
    walls,
    roof,
    hull,
    rails,
    body,
    floaters,
  };
};
