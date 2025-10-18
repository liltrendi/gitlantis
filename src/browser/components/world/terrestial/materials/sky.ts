import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  ShaderMaterial,
  Vector3,
  Vector2,
  PlaneGeometry,
  Mesh,
  MathUtils,
} from "three";
import {
  skyMaterialFragmentShader,
  skyMaterialVertexShader,
} from "@/browser/components/world/terrestial/shaders/sky";

let timeOfDay = 0;

export const animateSkyFromDayToNight = ({
  globalDelta,
  skyMaterial,
}: {
  globalDelta: number;
  skyMaterial: ShaderMaterial;
}) => {
  timeOfDay = (timeOfDay + globalDelta * 0.005) % 1;

  const elevation = Math.sin(timeOfDay * Math.PI * 2);
  const azimuth = timeOfDay * Math.PI * 2;

  const sunDir = new Vector3(Math.sin(azimuth), elevation, -Math.cos(azimuth));

  skyMaterial.uniforms.sunDirection.value.copy(sunDir);

  skyMaterial.uniforms.nightFactor.value = MathUtils.clamp(
    1.0 - elevation * 2.0,
    0.0,
    1.0
  );
};

export const setupSkyMaterial = ({
  FOV,
  azimuth,
  skyScene,
  elevation,
  fogFade,
  renderer,
  camera,
}: {
  renderer: WebGLRenderer;
  azimuth: number;
  elevation: number;
  fogFade: number;
  FOV: number;
  skyScene: Scene;
  camera: PerspectiveCamera;
}) => {
  const skyMaterial = new ShaderMaterial({
    uniforms: {
      sunDirection: {
        value: new Vector3(
          Math.sin(azimuth),
          Math.sin(elevation),
          -Math.cos(azimuth)
        ),
      },
      resolution: {
        value: new Vector2(
          renderer.domElement.width,
          renderer.domElement.height
        ),
      },
      fogFade: { value: fogFade },
      fov: { value: FOV },
      nightFactor: { value: 0.0 },
    },
    vertexShader: skyMaterialVertexShader,
    fragmentShader: skyMaterialFragmentShader,
    depthWrite: false,
  });

  const backgroundGeometry = new PlaneGeometry(2, 2, 1, 1);
  const background = new Mesh(backgroundGeometry, skyMaterial);

  skyScene.frustumCulled = false;
  background.frustumCulled = false;

  skyScene.add(background);
  skyScene.add(camera);

  return { skyMaterial };
};
