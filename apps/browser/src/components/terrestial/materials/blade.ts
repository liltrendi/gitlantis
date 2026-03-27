import {
  PlaneGeometry,
  Vector3,
  Quaternion,
  InstancedBufferGeometry,
  InstancedBufferAttribute,
} from "three";

export const applyBladeGeometry = ({ width }: { width: number }) => {
  const joints = 4;
  const bladeWidth = 0.12;
  const bladeHeight = 1;

  let instances = 40000;

  const grassBaseGeometry = new PlaneGeometry(
    bladeWidth,
    bladeHeight,
    1,
    joints
  );
  grassBaseGeometry.translate(0, bladeHeight / 2, 0);

  const vertex = new Vector3();
  const quaternion0 = new Quaternion();
  const quaternion1 = new Quaternion();
  let angle = 0.05;
  let sinAngle = Math.sin(angle / 2.0);
  let rotationAxis = new Vector3(0, 1, 0);
  quaternion0.set(
    rotationAxis.x * sinAngle,
    rotationAxis.y * sinAngle,
    rotationAxis.z * sinAngle,
    Math.cos(angle / 2.0)
  );
  angle = 0.3;
  sinAngle = Math.sin(angle / 2.0);
  rotationAxis.set(1, 0, 0);
  quaternion1.set(
    rotationAxis.x * sinAngle,
    rotationAxis.y * sinAngle,
    rotationAxis.z * sinAngle,
    Math.cos(angle / 2.0)
  );
  quaternion0.multiply(quaternion1);
  angle = 0.1;
  sinAngle = Math.sin(angle / 2.0);
  rotationAxis.set(0, 0, 1);
  quaternion1.set(
    rotationAxis.x * sinAngle,
    rotationAxis.y * sinAngle,
    rotationAxis.z * sinAngle,
    Math.cos(angle / 2.0)
  );
  quaternion0.multiply(quaternion1);

  const quaternion2 = new Quaternion();
  for (
    let v = 0;
    v <
    (grassBaseGeometry.attributes.position.array as unknown as number[]).length;
    v += 3
  ) {
    quaternion2.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);
    vertex.set(
      (grassBaseGeometry.attributes.position.array as unknown as number[])[v],
      (grassBaseGeometry.attributes.position.array as unknown as number[])[
        v + 1
      ],
      (grassBaseGeometry.attributes.position.array as unknown as number[])[
        v + 2
      ]
    );
    const frac = vertex.y / bladeHeight;
    quaternion2.slerp(quaternion0, frac);
    vertex.applyQuaternion(quaternion2);
    (grassBaseGeometry.attributes.position.array as unknown as number[])[v] =
      vertex.x;
    (grassBaseGeometry.attributes.position.array as unknown as number[])[
      v + 1
    ] = vertex.y;
    (grassBaseGeometry.attributes.position.array as unknown as number[])[
      v + 2
    ] = vertex.z;
  }
  grassBaseGeometry.computeVertexNormals();

  const instancedGeometry = new InstancedBufferGeometry();
  instancedGeometry.index = grassBaseGeometry.index;
  instancedGeometry.setAttribute(
    "position",
    grassBaseGeometry.attributes.position
  );
  instancedGeometry.setAttribute("uv", grassBaseGeometry.attributes.uv);
  instancedGeometry.setAttribute("normal", grassBaseGeometry.attributes.normal);

  const instanceIndices: number[] = [];
  const offsets: number[] = [];
  const scales: number[] = [];
  const halfRootAngles: number[] = [];

  for (let i = 0; i < instances; i++) {
    instanceIndices.push(i / instances);
    const x = Math.random() * width - width / 2;
    const z = Math.random() * width - width / 2;
    offsets.push(x, 0, z);
    const angle = Math.PI - Math.random() * (2 * Math.PI);
    halfRootAngles.push(Math.sin(0.5 * angle), Math.cos(0.5 * angle));
    if (i % 3 !== 0) {
      scales.push(2.0 + Math.random() * 1.25);
    } else {
      scales.push(2.0 + Math.random());
    }
  }

  instancedGeometry.setAttribute(
    "offset",
    new InstancedBufferAttribute(new Float32Array(offsets), 3)
  );
  instancedGeometry.setAttribute(
    "scale",
    new InstancedBufferAttribute(new Float32Array(scales), 1)
  );
  instancedGeometry.setAttribute(
    "halfRootAngle",
    new InstancedBufferAttribute(new Float32Array(halfRootAngles), 2)
  );
  instancedGeometry.setAttribute(
    "instanceIndex",
    new InstancedBufferAttribute(new Float32Array(instanceIndices), 1)
  );

  instancedGeometry.instanceCount = instances;

  return { instancedGeometry };
};
