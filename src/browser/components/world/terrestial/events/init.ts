import type { PerspectiveCamera, ShaderMaterial, WebGLRenderer } from "three";
import { ResizeHandler } from "@/browser/components/world/terrestial/events/resize";
import { MovementControls } from "@/browser/components/world/terrestial/events/movement";

export class InitTerrestialListeners {
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private skyMaterial: ShaderMaterial;

  constructor({
    camera,
    renderer,
    skyMaterial,
  }: {
    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
    skyMaterial: ShaderMaterial;
  }) {
    this.camera = camera;
    this.renderer = renderer;
    this.skyMaterial = skyMaterial;
  }

  initialize() {
    const resizeHandler = this.attachResizeListener();
    const movementControls = this.attachMovementListener();
    return { resizeHandler, movementControls };
  }

  attachResizeListener() {
    const resizeHandler = new ResizeHandler(this.camera, this.renderer);
    resizeHandler.attach(this.skyMaterial);
    return resizeHandler;
  }

  attachMovementListener() {
    const movementControls = new MovementControls();
    movementControls.attach();
    return movementControls;
  }
}
