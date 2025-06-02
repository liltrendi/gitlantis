import { Clone } from "@react-three/drei";
import type { Group } from "three";
import { Backdrop } from "@/components/shared/backdrop";

export const File = ({
  instance,
  index,
  label,
  model,
  modelRef,
}: {
  label: string;
  index: number;
  model: Group;
  modelRef: TCabinetsRef;
  instance: TCabinetInstance;
}) => {
  return (
    // @ts-expect-error
    <group position-y={13}>
      <Clone
        ref={(el) => {
          if (!modelRef?.current) return;
          modelRef.current[index] = el;
        }}
        position={instance.position}
        object={model}
        scale={27}
      >
        <Backdrop label={label} yPosition={2.68} fontSize={0.35} />
      </Clone>
      {/* @ts-expect-error */}
    </group>
  );
};
