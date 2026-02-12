import {
  AnimationMixer,
  DirectionalLight,
  AmbientLight,
  Scene,
  LoopRepeat,
  Mesh,
  MeshStandardMaterial,
} from "three";
import { GLTFLoader, type GLTF } from "three-stdlib";
import { PLAYER_ANIMATIONS } from "@/components/terrestial/player/utils";
import {
  CLOUDFRONT_ROOT_URL,
  globalUris,
} from "@/packages/shared/browser-config";

export const addPlayerToWorld = ({
  grassScene,
  gltfModelLoader,
  isBrowserEnvironment,
}: {
  grassScene: Scene;
  gltfModelLoader: GLTFLoader;
  isBrowserEnvironment: boolean;
}) => {
  const playerAmbientLight = new AmbientLight(0xffffff, 0.5);
  const playerDirectionalLight = new DirectionalLight(0xffffff, 2);

  let playerModel: GLTF | null = null;
  let playerAnimationMixer: AnimationMixer;
  let initialAnimationPlayed = false;
  const MODEL_PATH = `${isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : ""}${globalUris.player}`;

  gltfModelLoader.load(MODEL_PATH, (loadedModel: GLTF) => {
    playerModel = loadedModel;

    playerModel.scene.scale.setScalar(3.5);
    playerModel.scene.position.set(-20, -1.75, 18);

    playerModel.scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;

        if (mesh.material) {
          const materials = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];

          materials.forEach((material) => {
            const mat = material as MeshStandardMaterial;
            if (mat.map) {
              mat.emissiveMap = mat.map;
              mat.emissive.set(0xffffff);
              mat.emissiveIntensity = 0.08;
            }
            mat.metalness = 0.5;
            mat.roughness = 1;
          });
        }
      }
    });

    grassScene.add(
      playerAmbientLight,
      playerDirectionalLight,
      playerModel.scene
    );

    playerAnimationMixer = new AnimationMixer(playerModel.scene);

    const idleAnimation = playerAnimationMixer.clipAction(
      playerModel.animations.find((a) => a.name === PLAYER_ANIMATIONS.idle)!
    );
    idleAnimation.setLoop(LoopRepeat, Infinity);
    idleAnimation.reset().play();
    setTimeout(() => {
      initialAnimationPlayed = true;
    }, 1250);
  });

  return {
    playerDirectionalLight,
    playerModelRef: () => playerModel,
    playerAnimationMixerRef: () => playerAnimationMixer,
    wasInitialAnimationPlayed: () => initialAnimationPlayed,
  };
};
