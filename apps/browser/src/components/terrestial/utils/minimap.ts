import {
  OrthographicCamera,
  Scene,
  WebGLRenderer,
  Vector4,
  Vector2,
  Color,
  Object3D,
} from "three";
import type { GLTF } from "three-stdlib";

export class TerrestialMinimap {
  public camera: OrthographicCamera;
  private viewSize: number;

  private storedViewport = new Vector4();
  private storedScissor = new Vector4();
  private storedScissorTest: boolean = false;
  private storedClearColor = new Color();
  private storedClearAlpha: number = 0;
  private currentSize = new Vector2();

  constructor(viewSize: number = 100) {
    this.viewSize = viewSize;

    this.camera = new OrthographicCamera(-1, 1, 1, -1, 1, 1000);
    this.camera.position.set(0, 100, 0);
    this.camera.up.set(0, 0, -1);
  }

  render({
    renderer,
    scene,
    playerModel,
    isFullScreen,
    ground,
    grass,
  }: {
    renderer: WebGLRenderer;
    scene: Scene;
    playerModel: GLTF;
    isFullScreen: boolean;
    ground: Object3D;
    grass: Object3D;
  }) {
    if (!isFullScreen) return;

    const playerPosition = playerModel.scene.position;

    renderer.getSize(this.currentSize);
    const { width, height } = this.currentSize;

    const aspect = width / height;
    const frustumHeight = this.viewSize;
    const frustumWidth = frustumHeight * aspect;

    this.camera.left = -frustumWidth / 2;
    this.camera.right = frustumWidth / 2;
    this.camera.top = frustumHeight / 2;
    this.camera.bottom = -frustumHeight / 2;
    this.camera.updateProjectionMatrix();

    this.camera.position.set(playerPosition.x, 100, playerPosition.z);
    this.camera.lookAt(playerPosition.x, 0, playerPosition.z);
    this.camera.rotation.z = 0;

    renderer.getViewport(this.storedViewport);
    renderer.getScissor(this.storedScissor);
    this.storedScissorTest = renderer.getScissorTest();
    renderer.getClearColor(this.storedClearColor);
    this.storedClearAlpha = renderer.getClearAlpha();

    const storedFog = scene.fog;
    scene.fog = null;

    const originalGroundScale = ground.scale.clone();
    const originalGrassScale = grass.scale.clone();

    ground.scale.set(3, 1, 3);
    grass.scale.set(3, 1, 3);

    renderer.setScissorTest(false);
    renderer.setViewport(0, 0, width, height);
    renderer.setClearColor(0x1a1a1a, 1);
    renderer.clear();
    renderer.render(scene, this.camera);

    ground.scale.copy(originalGroundScale);
    grass.scale.copy(originalGrassScale);

    renderer.setViewport(this.storedViewport);
    renderer.setScissor(this.storedScissor);
    renderer.setScissorTest(this.storedScissorTest);
    renderer.setClearColor(this.storedClearColor, this.storedClearAlpha);
    scene.fog = storedFog;
  }
}
