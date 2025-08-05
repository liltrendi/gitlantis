import { Splash } from "@/browser/components/ui/splash";
import { GlobalSettings } from "@/browser/components/ui/settings";
import { Breadcrumbs } from "@/browser/components/ui/breadcrumbs";
import { Donate } from "@/browser/components/ui/donate";
import { Compass } from "@/browser/components/ui/compass";
import { MinimapToggle } from "@/browser/components/world/minimap/toggle";
import { Joystick } from "@/browser/components/world/joystick";

export const UILayer = () => {
  return (
    <>
      <Splash />
      <Breadcrumbs />
      <Donate />
      <Compass />
      <Joystick />
      <GlobalSettings />
      <MinimapToggle />
    </>
  );
};
