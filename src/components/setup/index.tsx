import { useFloatingOrigin } from "@/hooks/useFloatingOrigin";
import type { RefObject } from "react";
import type { Object3D, Vector3 } from "three";
import type { Water } from "three-stdlib";

export const Setup = ({
  boatRef,
  cabinetsRef,
  floatingOriginOffset,
  oceanTilesRef,
}: {
  boatRef: TBoatRef;
  oceanTilesRef: RefObject<Array<Water | null>>;
  cabinetsRef: RefObject<Array<Object3D | null>>;
  floatingOriginOffset: RefObject<Vector3>;
}) => {
  useFloatingOrigin({
    boatRef,
    oceanTilesRef,
    cabinetsRef,
    floatingOriginOffset,
  });

  return null;
};
