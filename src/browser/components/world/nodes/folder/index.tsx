import { Clone } from "@react-three/drei";
import { Backdrop } from "@/browser/components/world/backdrop";
import type { TNodeProps } from "@/browser/components/world/nodes/";

export const Folder = ({
  instance,
  index,
  label,
  model,
  nodeRef,
  isColliding,
  isBrowserEnvironment,
  isMinimapFullScreen,
  openOnClick,
}: TNodeProps) => {
  return (
    // @ts-expect-error
    <group position-y={2.5} onClick={openOnClick}>
      <Clone
        ref={(el) => {
          if (!nodeRef?.current || !el) return;
          el.traverse((child) => {
            child.userData = { ...child.userData, openOnClick };
          });
          nodeRef.current[index] = el;
        }}
        position={instance.position}
        object={model}
        scale={isMinimapFullScreen ? 9 : 7}
      >
        <Backdrop
          label={label}
          yPosition={isMinimapFullScreen ? 3.5 : 23}
          fontSize={isMinimapFullScreen ? 2.7 : 1.8}
          flatten={isMinimapFullScreen}
          frontOffset={isMinimapFullScreen ? -7 : undefined}
          maxWidth={isMinimapFullScreen ? undefined : label.length + 15}
        />
        {isMinimapFullScreen && isColliding ? (
          <Backdrop
            label={"Press SHIFT+ENTER"}
            yPosition={3.5}
            fontSize={2.3}
            flatten={true}
            frontOffset={7}
          />
        ) : null}
        {isColliding && !isMinimapFullScreen ? (
          <Backdrop
            label={
              isBrowserEnvironment
                ? "Download the extension to open folders"
                : "Press SHIFT + ENTER"
            }
            color="white"
            yPosition={3.5}
            fontSize={0.75}
            frontOffset={-5}
            maxWidth={isBrowserEnvironment ? 9 : 7.8}
          />
        ) : null}
      </Clone>
      {/* @ts-expect-error */}
    </group>
  );
};
