import { Splash } from "@/packages/components/splash";
import { GlobalSettings } from "@/packages/components/settings";
import { Breadcrumbs } from "@/packages/components/breadcrumbs";
import { Compass } from "@/packages/components/compass";
import { MinimapToggle } from "@/components/marine/minimap/toggle";
import { Joystick } from "@/components/marine/joystick";
import { WorldToggle } from "@/packages/components/world-toggle";

export const UILayer = () => {
  return (
    <>
      <Splash />
      <Breadcrumbs />
      <Compass />
      <Joystick />
      <GlobalSettings />
      <MinimapToggle />
      <WorldToggle />
    </>
  );
};
