import { Clone } from "@react-three/drei";
import type { Group } from "three";
import { Backdrop } from "@/browser/components/world/backdrop";

export const File = ({
  instance,
  index,
  label,
  model,
  nodeRef,
  isColliding,
  isBrowserEnvironment,
}: {
  label: string;
  index: number;
  model: Group;
  nodeRef: TNodeRef;
  instance: TNodeInstance;
  isColliding: boolean;
  isBrowserEnvironment: boolean;
}) => {
  return (
    // @ts-expect-error
    <group position-y={13}>
      <Clone
        ref={(el) => {
          if (!nodeRef?.current) return;
          nodeRef.current[index] = el;
        }}
        position={instance.position}
        object={model}
        scale={27}
      >
        <Backdrop label={label} yPosition={2.68} fontSize={0.35} />
        {isColliding ? (
          <Backdrop
            label={
              isBrowserEnvironment
                ? "Download the extension to open files"
                : "SHIFT+ENTER to explore"
            }
            color="white"
            yPosition={0.8}
            fontSize={isBrowserEnvironment ? 0.25 : 0.25}
            frontOffset={-1}
            maxWidth={isBrowserEnvironment ? 3 : 2.5}
          />
        ) : null}
      </Clone>
      {/* @ts-expect-error */}
    </group>
  );
};
