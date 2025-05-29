import type { RefObject } from "react";
import type { Object3D, Vector3 } from "three";
import type { Water } from "three-stdlib";
import { Lights } from "@/components/lights";
import { useRecalibration } from "@/hooks/useRecalibration";

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
  
  useRecalibration({
    boatRef,
    oceanTilesRef,
    cabinetsRef,
    floatingOriginOffset,
  });

  return (
    <>
      <Lights />
    </>
  )
};
