import {
  Vector3,
  DoubleSide,
  RawShaderMaterial,
  AmbientLight,
  Mesh,
  Vector2,
  PerspectiveCamera,
  Scene,
  Texture,
} from "three";
import { applyBladeGeometry } from "@/browser/components/world/terrestial/materials/blade";
import {
  grassFragmentSource,
  grassVertexSource,
} from "@/browser/components/world/terrestial/shaders/grass";

export const setupGrassMaterial = ({
  azimuth,
  camera,
  delta,
  elevation,
  globalCameraPosition,
  radius,
  grassScene,
  width,
  noiseTexture,
  grassTexture,
  alphaMapTexture,
}: {
  delta: number;
  globalCameraPosition: Vector2;
  radius: number;
  width: number;
  azimuth: number;
  elevation: number;
  camera: PerspectiveCamera;
  grassScene: Scene;
  noiseTexture: Texture;
  grassTexture: Texture;
  alphaMapTexture: Texture;
}) => {
  const ambientStrength = 0.7;
  const translucencyStrength = 1.5;
  const specularStrength = 0.5;
  const diffuseStrength = 1.5;
  const shininess = 256;
  const sunColour = new Vector3(1.0, 1.0, 1.0);
  const specularColour = new Vector3(1.0, 1.0, 1.0);

  // bend blades
  const { instancedGeometry } = applyBladeGeometry({
    width,
  });

  const grassMaterial = new RawShaderMaterial({
    uniforms: {
      time: { value: 0 },
      delta: { value: delta },
      posX: { value: globalCameraPosition.x },
      posZ: { value: globalCameraPosition.y },
      radius: { value: radius },
      width: { value: width },
      map: { value: grassTexture },
      alphaMap: { value: alphaMapTexture },
      noiseTexture: { value: noiseTexture },
      sunDirection: {
        value: new Vector3(
          Math.sin(azimuth),
          Math.sin(elevation),
          -Math.cos(azimuth)
        ),
      },
      cameraPosition: { value: camera.position },
      ambientStrength: { value: ambientStrength },
      translucencyStrength: { value: translucencyStrength },
      diffuseStrength: { value: diffuseStrength },
      specularStrength: { value: specularStrength },
      shininess: { value: shininess },
      lightColour: { value: sunColour },
      specularColour: { value: specularColour },
    },
    vertexShader: grassVertexSource,
    fragmentShader: grassFragmentSource,
    side: DoubleSide,
  });

  grassScene.add(camera);

  const grassAmbience = new AmbientLight(0xffffff, 0.5);
  grassScene.add(grassAmbience);

  const grass = new Mesh(instancedGeometry, grassMaterial);
  grass.frustumCulled = false;
  grassScene.add(grass);

  return { grassMaterial, grassAmbience };
};
