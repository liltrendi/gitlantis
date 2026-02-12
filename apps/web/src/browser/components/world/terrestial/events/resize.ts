import { PerspectiveCamera, WebGLRenderer, ShaderMaterial } from "three";

export class ResizeHandler {
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private skyMaterial?: ShaderMaterial;
  private FOV: number;
  private onResize = () => {};

  constructor(
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
    skyMaterial: ShaderMaterial
  ) {
    this.camera = camera;
    this.renderer = renderer;
    this.FOV = camera.fov;
    this.skyMaterial = skyMaterial;

    this.onResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      if (this.skyMaterial?.uniforms?.resolution) {
        this.skyMaterial.uniforms.resolution.value.set(
          this.renderer.domElement.width,
          this.renderer.domElement.height
        );
      }

      this.camera.updateProjectionMatrix();

      if (this.skyMaterial?.uniforms?.fov) {
        this.skyMaterial.uniforms.fov.value = this.FOV;
      }
    };
  }

  attach() {
    window.addEventListener("resize", this.onResize, false);
    this.onResize();
  }

  detach() {
    window.removeEventListener("resize", this.onResize);
  }
}
