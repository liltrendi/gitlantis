import { Clone } from "@react-three/drei";
import { Backdrop } from "@/browser/components/world/backdrop";
import type { TNodeProps } from "@/browser/components/world/nodes/";

export const File = ({
  instance,
  index,
  label,
  model,
  nodeRef,
  isColliding,
  isBrowserEnvironment,
  isMinimapFullScreen,
}: TNodeProps) => {
  return (
    // @ts-expect-error
    <group position-y={isMinimapFullScreen ? 20 : 13}>
      <Clone
        ref={(el) => {
          if (!nodeRef?.current) return;
          nodeRef.current[index] = el;
        }}
        position={instance.position}
        object={model}
        scale={isMinimapFullScreen ? 30 : 27}
      >
        <Backdrop
          label={label}
          fontSize={isMinimapFullScreen ? 0.8 : 0.35}
          yPosition={isMinimapFullScreen ? 0.1 : 2.68}
          frontOffset={isMinimapFullScreen ? -1.9 : undefined}
          flatten={isMinimapFullScreen}
          maxWidth={isMinimapFullScreen ? undefined : label.length + 15}
        />
        {isColliding && !isMinimapFullScreen ? (
          <Backdrop
            label={
              isBrowserEnvironment
                ? "Download the extension to open files"
                : "SHIFT+ENTER to explore"
            }
            color="white"
            yPosition={0.8}
            fontSize={0.25}
            frontOffset={-1}
            maxWidth={isBrowserEnvironment ? 3 : 2.5}
          />
        ) : null}
      </Clone>
      {/* @ts-expect-error */}
    </group>
  );
};
