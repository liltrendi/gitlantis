import { Clone } from "@react-three/drei";
import type { Group } from "three";
import { Backdrop } from "@/components/shared/backdrop";

export const Folder = ({
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
    <group position-y={2.5}>
      <Clone
        ref={(el) => {
          if (!modelRef?.current) return;
          modelRef.current[index] = el;
        }}
        position={instance.position}
        object={model}
        scale={7}
      >
        <Backdrop label={label} yPosition={23} fontSize={1.8} />
      </Clone>
      {/* @ts-expect-error */}
    </group>
  );
};
