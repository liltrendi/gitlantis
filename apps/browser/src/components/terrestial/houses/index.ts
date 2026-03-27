import {
  Scene,
  PerspectiveCamera,
  Vector3,
  Group,
  Object3D,
  OrthographicCamera,
} from "three";
import { GLTFLoader } from "three-stdlib";
import { MOCK_DONATIONS } from "@/components/terrestial/utils/donations";
import type { Donation } from "@/components/terrestial/utils/donations";
import {
  HeightMap,
  getSphereOffset,
} from "@/components/terrestial/utils/height";
import {
  CLOUDFRONT_ROOT_URL,
  globalUris,
} from "@/packages/shared/browser-config";

export interface HouseUIState {
  id: string;
  name: string;
  url: string;
  message: string;
  amount: number;
  x: number;
  y: number;
  visible: boolean;
  distance: number;
  scale: number;
}

const COLLISION_RADIUS = 8.0;

export const setupHouses = ({
  grassScene,
  gltfModelLoader,
  setHousesUI,
  heightMap,
  isBrowserEnvironment,
}: {
  grassScene: Scene;
  gltfModelLoader: GLTFLoader;
  setHousesUI: (state: HouseUIState[]) => void;
  heightMap: HeightMap;
  isBrowserEnvironment: boolean;
}) => {
  const rootUrl = isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : "";
  const houseModelPath = `${rootUrl}${globalUris.baselineHouse}`;

  const housesGroup = new Group();
  grassScene.add(housesGroup);

  const housesData: {
    mesh: Object3D;
    donation: Donation;
    baseX: number;
    baseZ: number;
  }[] = [];

  const WRAP_SIZE = 300;
  const HALF_WRAP = WRAP_SIZE / 2;

  Promise.all([
    heightMap.waitForLoad(),
    new Promise<Object3D>((resolve) => {
      gltfModelLoader.load(houseModelPath, (gltf) => {
        const model = gltf.scene;
        model.scale.setScalar(0.1);
        resolve(model);
      });
    }),
  ]).then(([_, baseModel]) => {
    const sortedDonations = [...MOCK_DONATIONS].sort(
      (a, b) => b.amount - a.amount
    );

    sortedDonations.forEach((donation, index) => {
      const houseMesh = baseModel.clone();

      const angle = index * Math.PI * 2.3999;
      const radius = 30 + index * 15;

      const randomJitterX = (Math.random() - 0.5) * 8;
      const randomJitterZ = (Math.random() - 0.5) * 8;

      let baseX = Math.cos(angle) * radius + randomJitterX;
      let baseZ = Math.sin(angle) * radius + randomJitterZ;

      housesGroup.add(houseMesh);
      housesData.push({
        mesh: houseMesh,
        donation,
        baseX,
        baseZ,
      });
    });
  });

  const update = ({
    globalCameraPosition,
    camera,
    delta,
    radius,
    width,
  }: {
    globalCameraPosition: { x: number; y: number };
    camera: PerspectiveCamera | OrthographicCamera;
    delta: number;
    radius: number;
    width: number;
  }) => {
    const newUIState: HouseUIState[] = [];
    const tempVec = new Vector3();

    housesData.forEach((house) => {
      let localX = house.baseX - globalCameraPosition.x * delta;
      let localZ = house.baseZ - globalCameraPosition.y * delta;

      localX = (localX + HALF_WRAP) % WRAP_SIZE;
      if (localX < 0) localX += WRAP_SIZE;
      localX -= HALF_WRAP;

      localZ = (localZ + HALF_WRAP) % WRAP_SIZE;
      if (localZ < 0) localZ += WRAP_SIZE;
      localZ -= HALF_WRAP;

      const worldX = localX + globalCameraPosition.x * delta;
      const worldZ = localZ + globalCameraPosition.y * delta;

      const noiseY = heightMap.getYPosition(worldX, worldZ);
      const sphereDrop = getSphereOffset(localX, localZ, radius);

      const sinkOffset = -0.5;
      house.mesh.position.set(localX, noiseY + sphereDrop + sinkOffset, localZ);

      tempVec.copy(house.mesh.position);

      const isMap = (camera as OrthographicCamera).isOrthographicCamera;
      let distanceToCamera = 0;

      if (isMap) {
        distanceToCamera = Math.hypot(
          house.mesh.position.x - camera.position.x,
          house.mesh.position.z - camera.position.z
        );
      } else {
        distanceToCamera = camera.position.distanceTo(house.mesh.position);
        tempVec.y += 1.2;
      }

      tempVec.project(camera);

      const x = (tempVec.x * 0.5 + 0.5) * window.innerWidth;
      let y = -(tempVec.y * 0.5 - 0.5) * window.innerHeight;

      if (isMap) {
        y += 30;
      }

      const inFrustum = tempVec.z >= -1 && tempVec.z <= 1;
      let visible =
        inFrustum &&
        (isMap
          ? distanceToCamera < width * 2.0
          : distanceToCamera < width * 0.6);

      const scale = isMap ? 0.7 : Math.max(0.6, 1.1 - distanceToCamera / 100);

      newUIState.push({
        id: house.donation.id,
        name: house.donation.name,
        url: house.donation.url,
        message: house.donation.message,
        amount: house.donation.amount,
        x,
        y,
        visible,
        distance: distanceToCamera,
        scale,
      });
    });

    newUIState.sort((a, b) => b.distance - a.distance);
    setHousesUI(newUIState);
  };

  const checkCollision = (
    playerLocalX: number,
    playerLocalZ: number,
    camX: number,
    camY: number,
    delta: number
  ) => {
    let closestDist = Infinity;
    let normalX = 0;
    let normalZ = 0;
    let colliding = false;

    for (const house of housesData) {
      let hLocalX = house.baseX - camX * delta;
      let hLocalZ = house.baseZ - camY * delta;

      hLocalX = (hLocalX + HALF_WRAP) % WRAP_SIZE;
      if (hLocalX < 0) hLocalX += WRAP_SIZE;
      hLocalX -= HALF_WRAP;

      hLocalZ = (hLocalZ + HALF_WRAP) % WRAP_SIZE;
      if (hLocalZ < 0) hLocalZ += WRAP_SIZE;
      hLocalZ -= HALF_WRAP;

      const dist = Math.hypot(hLocalX - playerLocalX, hLocalZ - playerLocalZ);
      if (dist < COLLISION_RADIUS && dist < closestDist) {
        closestDist = dist;
        colliding = true;
        if (dist > 0.0001) {
          normalX = (playerLocalX - hLocalX) / dist;
          normalZ = (playerLocalZ - hLocalZ) / dist;
        } else {
          normalX = 1;
          normalZ = 0;
        }
      }
    }
    return { colliding, normalX, normalZ };
  };

  return { update, checkCollision };
};
