import { CABINET_FILE_PATH } from '@/config';
import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import { Group } from 'three';

export const useCabinetModel = () => {
  const gltf = useGLTF(CABINET_FILE_PATH);
  const wrapper = new Group();
  wrapper.add(gltf.scene);

  useEffect(() => {
    gltf.scene.scale.setScalar(20);
    gltf.scene.updateMatrixWorld(true);
    wrapper.add(gltf.scene);
  }, [gltf.scene]);

  return wrapper;
};
