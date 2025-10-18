import { Light, Mesh, Scene, WebGLRenderer } from "three";

type Disposable = {
  dispose: () => void;
};

const dispose = (object: any, _name: string = "") => {
  if (object && typeof object.dispose === "function") {
    try {
      object.dispose();
    } catch (err) {
      console.log(`Error disposing ${_name}`, err);
    }
  }
};

export function disposeGameResources({
  materials = [],
  geometries = [],
  textures = [],
  lights = [],
  scenes = [],
  renderTargets = [],
  meshes = [],
  listeners = [],
  renderers = [],
  cleanups = [],
}: {
  materials?: Disposable[];
  geometries?: Disposable[];
  textures?: Disposable[];
  lights?: Light[];
  scenes?: Scene[];
  renderTargets?: Disposable[];
  meshes?: Mesh[];
  listeners?: {
    detach: () => void;
  }[];
  renderers: WebGLRenderer[];
  cleanups?: (() => void)[];
}) {
  materials.forEach((m, i) => dispose(m, `material[${i}]`));
  geometries.forEach((g, i) => dispose(g, `geometry[${i}]`));
  textures.forEach((t, i) => dispose(t, `texture[${i}]`));
  renderTargets.forEach((rt, i) => dispose(rt, `renderTarget[${i}]`));

  lights.forEach((light, i) => {
    scenes.forEach((scene) => scene.remove(light));
    dispose(light, `light[${i}]`);
  });

  meshes.forEach((mesh, i) => {
    scenes.forEach((scene) => scene.remove(mesh));
    dispose(mesh.geometry, `mesh[${i}].geometry`);
    dispose(mesh.material, `mesh[${i}].material`);
    dispose(mesh, `mesh[${i}]`);
  });

  listeners.forEach((listener) => {
    listener.detach();
  });

  renderers.forEach((renderer) => {
    renderer.dispose();
  });

  cleanups?.forEach((cleanup) => {
    cleanup();
  });
}
