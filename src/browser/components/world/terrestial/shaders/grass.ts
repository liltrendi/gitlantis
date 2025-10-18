export const sharedShaderPrefix = `
  uniform sampler2D noiseTexture;
  float getYPosition(vec2 p){
      return 8.0*(2.0*texture(noiseTexture, p/800.0).r - 1.0);
  }
`;

export const grassVertexSource =
  sharedShaderPrefix +
  `
  precision mediump float;

  in vec3 position;
  in vec3 normal;
  in vec3 offset;
  in vec2 uv;
  in vec2 halfRootAngle;
  in float scale;
  in float instanceIndex;

  uniform float time;
  uniform float delta;
  uniform float posX;
  uniform float posZ;
  uniform float radius;
  uniform float width;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;

  out vec2 vUv;
  out vec3 vNormal;
  out vec3 vPosition;
  out float frc;
  out float idx;

  const float PI = 3.141592653589793;
  const float TWO_PI = 2.0 * PI;

  float safeAcos(float x) {
    return acos(clamp(x, -1.0, 1.0));
  }

  vec3 rotateVectorByQuaternion(vec3 v, vec4 q) {
    return 2.0 * cross(q.xyz, v * q.w + cross(q.xyz, v)) + v;
  }

  float placeOnSphere(vec3 v, float r) {
    float lenXZ = length(v.xz);
    if (r <= 0.0 || lenXZ <= 1e-5) return v.y;
    float theta = safeAcos(clamp(v.z / r, -1.0, 1.0));
    float phi = safeAcos(clamp(v.x / (r * sin(max(theta, 1e-5))), -1.0, 1.0));
    float sV = r * sin(theta) * sin(phi);
    return (isnan(sV) ? v.y : sV);
  }

  void main() {
    frc = position.y;
    vUv = uv;

    vec3 vPos = position;
    vPos.y *= scale;
    vNormal = normal;
    vNormal.y /= max(scale, 1e-5);

    vec4 direction = vec4(0.0, halfRootAngle.x, 0.0, halfRootAngle.y);
    vPos = rotateVectorByQuaternion(vPos, direction);
    vNormal = rotateVectorByQuaternion(vNormal, direction);

    vec3 pos;
    vec3 globalPos;
    vec3 tile;

    globalPos.x = offset.x - posX * delta;
    globalPos.z = offset.z - posZ * delta;

    tile.x = floor((globalPos.x + 0.5 * width) / width);
    tile.z = floor((globalPos.z + 0.5 * width) / width);

    pos.x = globalPos.x - tile.x * width;
    pos.z = globalPos.z - tile.z * width;

    pos.y = max(0.0, placeOnSphere(pos, radius)) - radius;
    pos.y += getYPosition(vec2(pos.x + delta * posX, pos.z + delta * posZ));

    vec2 fractionalPos = 0.5 + offset.xz / width;
    fractionalPos *= TWO_PI;

    float noiseX = 0.5 + 0.5 * sin(fractionalPos.x + time);
    float noiseY = 0.5 + 0.5 * cos(fractionalPos.y + time);
    float halfAngle = -noiseX * 0.1 - noiseY * 0.05;

    direction = normalize(vec4(sin(halfAngle), 0.0, -sin(halfAngle), cos(halfAngle)));
    vPos = rotateVectorByQuaternion(vPos, direction);
    vNormal = rotateVectorByQuaternion(vNormal, direction);

    vPosition = vPos + pos;
    idx = instanceIndex;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
  }
`;

export const grassFragmentSource = `
  precision mediump float;

  in float frc;
  in float idx;
  in vec2 vUv;
  in vec3 vNormal;
  in vec3 vPosition;

  uniform vec3 cameraPosition;
  uniform float ambientStrength;
  uniform float diffuseStrength;
  uniform float specularStrength;
  uniform float translucencyStrength;
  uniform float shininess;
  uniform vec3 lightColour;
  uniform vec3 sunDirection;
  uniform sampler2D map;
  uniform sampler2D alphaMap;
  uniform vec3 specularColour;

  out vec4 fragColor;

  vec3 ACESFilm(vec3 x) {
    float a = 2.51;
    float b = 0.03;
    float c = 2.43;
    float d = 0.59;
    float e = 0.14;
    return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
  }

  void main() {
    float alpha = texture(alphaMap, vUv).r;
    if (alpha < 0.15) discard;

    vec3 normal = normalize(gl_FrontFacing ? vNormal : -vNormal);
    vec3 textureColour = pow(texture(map, vUv).rgb, vec3(2.2));
    vec3 mixColour = idx > 0.75 ? vec3(0.2, 0.8, 0.06) : vec3(0.5, 0.8, 0.08);
    textureColour = mix(0.1 * mixColour, textureColour, 0.75);

    vec3 lightTimesTexture = lightColour * textureColour;
    vec3 ambient = textureColour * ambientStrength;

    vec3 lightDir = normalize(sunDirection);
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * lightTimesTexture * diffuseStrength;

    float sky = max(dot(normal, vec3(0, 1, 0)), 0.0);
    vec3 skyLight = sky * vec3(0.12, 0.29, 0.55) * 0.3;

    vec3 viewDirection = normalize(cameraPosition - vPosition);
    vec3 halfwayDir = normalize(lightDir + viewDirection);
    float spec = pow(max(dot(normal, halfwayDir), 0.0), shininess);
    vec3 specular = spec * specularColour * lightColour * specularStrength;

    vec3 diffuseTranslucency = vec3(0.0);
    vec3 forwardTranslucency = vec3(0.0);
    float dotNormalLight = dot(normal, lightDir);
    float dotViewLight = dot(-lightDir, viewDirection);

    if (dotNormalLight <= 0.0) {
      diffuseTranslucency = lightTimesTexture * translucencyStrength * -dotNormalLight;
      if (dotViewLight > 0.0) {
        forwardTranslucency = lightTimesTexture * translucencyStrength * pow(dotViewLight, 16.0);
      }
    }

    vec3 col = skyLight + ambient + diffuse + specular + diffuseTranslucency + forwardTranslucency;
    col = mix(0.35 * vec3(0.1, 0.25, 0.02), col, frc);
    col = ACESFilm(col);
    col = pow(col, vec3(0.4545));

    fragColor = vec4(col, 1.0);
  }
`;
