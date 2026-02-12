import {
  Vector3,
  PlaneGeometry,
  MeshPhongMaterial,
  Color,
  DoubleSide,
  Mesh,
  type Shader,
  Vector2,
  Texture,
  Scene,
} from "three";
import { groundVertexPrefix } from "@/components/terrestial/shaders/ground";

export const setupGroundMaterial = ({
  delta,
  globalCameraPosition,
  noiseTexture,
  radius,
  width,
  resolution,
  grassScene,
}: {
  delta: number;
  globalCameraPosition: Vector2;
  radius: number;
  width: number;
  noiseTexture: Texture;
  resolution: number;
  grassScene: Scene;
}) => {
  const groundBaseGeometry = new PlaneGeometry(
    width,
    width,
    resolution,
    resolution
  );
  groundBaseGeometry.lookAt(new Vector3(0, 1, 0));
  (groundBaseGeometry as any).verticesNeedUpdate = true;

  const groundGeometry = new PlaneGeometry(
    width,
    width,
    resolution,
    resolution
  );
  groundGeometry.setAttribute(
    "basePosition",
    groundBaseGeometry.getAttribute("position")
  );
  groundGeometry.lookAt(new Vector3(0, 1, 0));
  (groundGeometry as any).verticesNeedUpdate = true;

  const groundMaterial = new MeshPhongMaterial({
    color: new Color("rgb(10%, 25%, 2%)"),
    side: DoubleSide,
  });

  let groundShader: Shader | null = null;
  groundMaterial.onBeforeCompile = (shader) => {
    shader.uniforms.delta = { value: delta };
    shader.uniforms.posX = { value: globalCameraPosition.x };
    shader.uniforms.posZ = { value: globalCameraPosition.y };
    shader.uniforms.radius = { value: radius };
    shader.uniforms.width = { value: width };
    shader.uniforms.noiseTexture = { value: noiseTexture };

    shader.vertexShader = groundVertexPrefix + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <beginnormal_vertex>",
      `// Compute ground position and normal
          vec3 pos = vec3(0);
          pos.x = basePosition.x - mod(mod((delta*posX),delta) + delta, delta);
          pos.z = basePosition.z - mod(mod((delta*posZ),delta) + delta, delta);
          pos.y = max(0.0, placeOnSphere(pos)) - radius;
          pos.y += getYPosition(vec2(basePosition.x+delta*floor(posX), basePosition.z+delta*floor(posZ)));
          vec3 objectNormal = getNormal(pos);
          #ifdef USE_TANGENT
            vec3 objectTangent = vec3( tangent.xyz );
          #endif`
    );
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `vec3 transformed = vec3(pos);`
    );
    groundShader = shader;
  };

  const ground = new Mesh(groundGeometry, groundMaterial);
  ground.frustumCulled = false;
  ground.material.side = DoubleSide;
  ground.geometry.computeVertexNormals();

  grassScene.add(ground);

  return {
    ground,
    groundShaderRef: () => groundShader,
  };
};
