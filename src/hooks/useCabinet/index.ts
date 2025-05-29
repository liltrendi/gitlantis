import { CABINET_FILE_PATH } from "@/config";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Group } from "three";

export const useCabinetModel = () => {
  const cabinet = useGLTF(CABINET_FILE_PATH);
  const wrapper = new Group();
  wrapper.add(cabinet.scene);

  useEffect(() => {
    cabinet.scene.scale.setScalar(20);
    cabinet.scene.updateMatrixWorld(true);
    wrapper.add(cabinet.scene);
  }, [cabinet.scene]);

  return wrapper;
};
