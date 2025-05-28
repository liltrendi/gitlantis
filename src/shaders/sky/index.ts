export const skyMaterialVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4( position, 1.0 );    
  }
`;

export const skyMaterialFragmentShader = `
  varying vec2 vUv;
  uniform vec2 resolution;
  uniform vec3 sunDirection;
  uniform float fogFade;
  uniform float fov;
  uniform float nightFactor;

  const vec3 skyColour = 0.6 * vec3(0.02, 0.2, 0.9);
  // Darken sky when looking up
  vec3 getSkyColour(vec3 rayDir){
    float sunHeight = sunDirection.y; // -1 (below) to +1 (overhead)
    
    vec3 daySky = mix(0.35 * skyColour, skyColour, pow(1.0 - rayDir.y, 4.0));
    vec3 nightSky = vec3(0.005, 0.005, 0.01); // deep blue-black

    return mix(daySky, nightSky, nightFactor);
  }

  // Fog function (based on Iñigo Quílez)
  vec3 applyFog(vec3 rgb, vec3 rayOri, vec3 rayDir, vec3 sunDir){
    float dist = 4000.0;
    if(abs(rayDir.y) < 0.0001){rayDir.y = 0.0001;}
    float fogAmount = 1.0 * exp(-rayOri.y*fogFade) * (1.0 - exp(-dist*rayDir.y*fogFade))/(rayDir.y*fogFade);
    float sunAmount = max(dot(rayDir, sunDir), 0.0);
    vec3 fogColor = mix(vec3(0.35, 0.5, 0.9), vec3(1.0, 1.0, 0.75), pow(sunAmount, 16.0));
    return mix(rgb, fogColor, clamp(fogAmount, 0.0, 1.0));
  }

  vec3 ACESFilm(vec3 x){
    float a = 2.51;
    float b = 0.03;
    float c = 2.43;
    float d = 0.59;
    float e = 0.14;
    return clamp((x*(a*x+b))/(x*(c*x+d)+e), 0.0, 1.0);
  }

  vec3 rayDirection(float fieldOfView, vec2 fragCoord) {
    vec2 xy = fragCoord - resolution.xy / 2.0;
    float z = (0.5 * resolution.y) / tan(radians(fieldOfView) / 2.0);
    return normalize(vec3(xy, -z));
  }

  // LookAt matrix (reproducing the camera orientation)
  mat3 lookAt(vec3 camera, vec3 at, vec3 up){
    vec3 zaxis = normalize(at - camera);    
    vec3 xaxis = normalize(cross(zaxis, up));
    vec3 yaxis = cross(xaxis, zaxis);
    return mat3(xaxis, yaxis, -zaxis);
  }

  float getGlow(float dist, float radius, float intensity){
    dist = max(dist, 1e-6);
    return pow(radius/dist, intensity);  
  }

  void main() {
    vec3 target = vec3(0.0, 0.0, 0.0);
    vec3 up = vec3(0.0, 1.0, 0.0);
    vec3 rayDir = rayDirection(fov, gl_FragCoord.xy);
    mat3 viewMatrix_ = lookAt(cameraPosition, target, up);
    rayDir = viewMatrix_ * rayDir;
    vec3 col = getSkyColour(rayDir);
    vec3 sunDir = normalize(sunDirection);
    float mu = dot(sunDir, rayDir);
    col += vec3(1.0, 1.0, 0.8) * getGlow(1.0-mu, 0.00005, 0.9);
    col += applyFog(col, vec3(0,1000,0), rayDir, sunDir);
    col = ACESFilm(col);
    col = pow(col, vec3(0.4545));
    gl_FragColor = vec4(col, 1.0);
  }
`;