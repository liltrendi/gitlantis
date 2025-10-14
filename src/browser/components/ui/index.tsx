import { Splash } from "@/browser/components/ui/splash";
import { GlobalSettings } from "@/browser/components/ui/settings";
import { Breadcrumbs } from "@/browser/components/ui/breadcrumbs";
import { Compass } from "@/browser/components/ui/compass";
import { MinimapToggle } from "@/browser/components/world/marine/minimap/toggle";
import { Joystick } from "@/browser/components/world/marine/joystick";

export const UILayer = () => {
  return (
    <>
      <Splash />
      <Breadcrumbs />
      <Compass />
      <Joystick />
      <GlobalSettings />
      <MinimapToggle />
    </>
  );
};
