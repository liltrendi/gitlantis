import type { PerspectiveCamera, ShaderMaterial, WebGLRenderer } from "three";
import { ResizeHandler } from "@/components/terrestial/events/resize";
import { MovementControls } from "@/components/terrestial/events/movement";

export class InitTerrestialListeners {
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private skyMaterial: ShaderMaterial;
  private activeWorld: TActiveWorld;

  constructor({
    camera,
    renderer,
    skyMaterial,
    activeWorld,
  }: {
    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
    skyMaterial: ShaderMaterial;
    activeWorld: TActiveWorld;
  }) {
    this.camera = camera;
    this.renderer = renderer;
    this.skyMaterial = skyMaterial;
    this.activeWorld = activeWorld;
  }

  initialize() {
    const resizeHandler = this.attachResizeListener();
    const movementControls = this.attachMovementListener();
    return { resizeHandler, movementControls };
  }

  attachResizeListener() {
    const resizeHandler = new ResizeHandler(
      this.camera,
      this.renderer,
      this.skyMaterial
    );
    if (this.activeWorld === "terrestial") {
      resizeHandler.attach();
    }
    return resizeHandler;
  }

  attachMovementListener() {
    const movementControls = new MovementControls();
    if (this.activeWorld === "terrestial") {
      movementControls.attach();
    }
    return movementControls;
  }
}
