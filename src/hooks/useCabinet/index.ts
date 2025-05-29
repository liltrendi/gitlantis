import { CABINET_FILE_PATH } from '@/config';
import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export const useCabinetModel = () => {
  const gltf = useGLTF(CABINET_FILE_PATH);

  useEffect(() => {
    gltf.scene.scale.setScalar(10);
    gltf.scene.updateMatrixWorld(true);
  }, [gltf.scene]);

  return gltf.scene;
};
