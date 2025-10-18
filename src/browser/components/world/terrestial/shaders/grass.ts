export const sharedShaderPrefix = `
  uniform sampler2D noiseTexture;
  float getYPosition(vec2 p){
      return 8.0*(2.0*texture2D(noiseTexture, p/800.0).r - 1.0);
  }
`;

const bladeHeight = 1;

export const grassVertexSource =
  sharedShaderPrefix +
  `
  precision mediump float;
  attribute vec3 position;
  attribute vec3 normal;
  attribute vec3 offset;
  attribute vec2 uv;
  attribute vec2 halfRootAngle;
  attribute float scale;
  attribute float index;
  uniform float time;
  uniform float delta;
  uniform float posX;
  uniform float posZ;
  uniform float radius;
  uniform float width;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float frc;
  varying float idx;
  const float PI = 3.1415;
  const float TWO_PI = 2.0 * PI;
  // Rotate a vector by a quaternion
  vec3 rotateVectorByQuaternion(vec3 v, vec4 q){
    return 2.0 * cross(q.xyz, v * q.w + cross(q.xyz, v)) + v;
  }
  float placeOnSphere(vec3 v){
    float theta = acos(v.z/radius);
    float phi = acos(v.x/(radius * sin(theta)));
    float sV = radius * sin(theta) * sin(phi);
    if(sV != sV){
      sV = v.y;
    }
    return sV;
  }
  void main() {
    frc = position.y / float(${bladeHeight});
    vec3 vPosition = position;
    vPosition.y *= scale;
    vNormal = normal;
    vNormal.y /= scale;
    vec4 direction = vec4(0.0, halfRootAngle.x, 0.0, halfRootAngle.y);
    vPosition = rotateVectorByQuaternion(vPosition, direction);
    vNormal = rotateVectorByQuaternion(vNormal, direction);
    vUv = uv;
    vec3 pos;
    vec3 globalPos;
    vec3 tile;
    globalPos.x = offset.x - posX*delta;
    globalPos.z = offset.z - posZ*delta;
    tile.x = floor((globalPos.x + 0.5 * width) / width);
    tile.z = floor((globalPos.z + 0.5 * width) / width);
    pos.x = globalPos.x - tile.x * width;
    pos.z = globalPos.z - tile.z * width;
    pos.y = max(0.0, placeOnSphere(pos)) - radius;
    pos.y += getYPosition(vec2(pos.x+delta*posX, pos.z+delta*posZ));
    vec2 fractionalPos = 0.5 + offset.xz / width;
    fractionalPos *= TWO_PI;
    float noise = 0.5 + 0.5 * sin(fractionalPos.x + time);
    float halfAngle = -noise * 0.1;
    noise = 0.5 + 0.5 * cos(fractionalPos.y + time);
    halfAngle -= noise * 0.05;
    direction = normalize(vec4(sin(halfAngle), 0.0, -sin(halfAngle), cos(halfAngle)));
    vPosition = rotateVectorByQuaternion(vPosition, direction);
    vNormal = rotateVectorByQuaternion(vNormal, direction);
    vPosition += pos;
    idx = index;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
  }
`;

export const grassFragmentSource = `
  precision mediump float;
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
  varying float frc;
  varying float idx;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  vec3 ACESFilm(vec3 x){
    float a = 2.51;
    float b = 0.03;
    float c = 2.43;
    float d = 0.59;
    float e = 0.14;
    return clamp((x*(a*x+b))/(x*(c*x+d)+e), 0.0, 1.0);
  }
  void main() {
    if(texture2D(alphaMap, vUv).r < 0.15){
      discard;
    }
    vec3 normal;
    if(gl_FrontFacing){
      normal = normalize(vNormal);
    } else {
      normal = normalize(-vNormal);
    }
    vec3 textureColour = pow(texture2D(map, vUv).rgb, vec3(2.2));
    vec3 mixColour = idx > 0.75 ? vec3(0.2, 0.8, 0.06) : vec3(0.5, 0.8, 0.08);
    textureColour = mix(0.1 * mixColour, textureColour, 0.75);
    vec3 lightTimesTexture = lightColour * textureColour;
    vec3 ambient = textureColour;
    vec3 lightDir = normalize(sunDirection);
    float dotNormalLight = dot(normal, lightDir);
    float diff = max(dotNormalLight, 0.0);
    vec3 diffuse = diff * lightTimesTexture;
    float sky = max(dot(normal, vec3(0, 1, 0)), 0.0);
    vec3 skyLight = sky * vec3(0.12, 0.29, 0.55);
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    vec3 halfwayDir = normalize(lightDir + viewDirection);
    float spec = pow(max(dot(normal, halfwayDir), 0.0), shininess);
    vec3 specular = spec * specularColour * lightColour;
    vec3 diffuseTranslucency = vec3(0);
    vec3 forwardTranslucency = vec3(0);
    float dotViewLight = dot(-lightDir, viewDirection);
    if(dotNormalLight <= 0.0){
      diffuseTranslucency = lightTimesTexture * translucencyStrength * -dotNormalLight;
      if(dotViewLight > 0.0){
        forwardTranslucency = lightTimesTexture * translucencyStrength * pow(dotViewLight, 16.0);
      }
    }
    vec3 col = 0.3 * skyLight * textureColour + ambientStrength * ambient + diffuseStrength * diffuse + specularStrength * specular + diffuseTranslucency + forwardTranslucency;
    col = mix(0.35*vec3(0.1, 0.25, 0.02), col, frc);
    col = ACESFilm(col);
    col = pow(col, vec3(0.4545));
    gl_FragColor = vec4(col, 1.0);
  }
`;
