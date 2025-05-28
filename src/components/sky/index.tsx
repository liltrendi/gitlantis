import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Mesh, ShaderMaterial, Vector3, MathUtils, Vector2 } from "three";
import {
  skyMaterialVertexShader,
  skyMaterialFragmentShader,
} from "@/shaders/sky/";

export const Sky = ({
  fov = 40,
  azimuth = 0.4,
  elevation = 0.2,
  fogFade = 0.009,
  nightFactor = 0.0,
}) => {
  const { size } = useThree();
  const timeOfDayRef = useRef(0);
  const meshRef = useRef<Mesh>(null);
  const skyMaterialRef = useRef<ShaderMaterial>(null);

  useFrame((_, delta) => {
    if (!skyMaterialRef.current) return;

    timeOfDayRef.current = (timeOfDayRef.current + delta * 0.005) % 1;
    const timeOfDay = timeOfDayRef.current;

    const azimuth = timeOfDay * Math.PI * 2;
    const elevation = Math.sin(timeOfDay * Math.PI * 2);

    const sunDirection = new Vector3(
      Math.sin(azimuth),
      elevation,
      -Math.cos(azimuth)
    );

    skyMaterialRef.current.uniforms.sunDirection.value.copy(sunDirection);
    skyMaterialRef.current.uniforms.nightFactor.value = MathUtils.clamp(
      1.0 - elevation * 2.0,
      0.0,
      1.0
    );
  });

  useEffect(() => {
    if (skyMaterialRef.current) {
      skyMaterialRef.current.uniforms.resolution.value.set(
        size.width,
        size.height
      );
    }
  }, [size]);

  return (
    <mesh ref={meshRef} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={skyMaterialRef}
        depthWrite={false}
        vertexShader={skyMaterialVertexShader}
        fragmentShader={skyMaterialFragmentShader}
        uniforms={{
          fov: { value: fov },
          fogFade: { value: fogFade },
          nightFactor: { value: nightFactor },
          resolution: { value: new Vector2(size.width, size.height) },
          sunDirection: {
            value: new Vector3(
              Math.sin(azimuth),
              Math.sin(elevation),
              -Math.cos(azimuth)
            ),
          },
        }}
      />
    </mesh>
  );
};