import { sharedShaderPrefix } from "@/components/terrestial/shaders/grass";

export const groundVertexPrefix =
  sharedShaderPrefix +
  `
  attribute vec3 basePosition;
  uniform float delta;
  uniform float posX;
  uniform float posZ;
  uniform float radius;
  uniform float width;

  float placeOnSphere(vec3 v){
    float theta = acos(v.z/radius);
    float phi = acos(v.x/(radius * sin(theta)));
    float sV = radius * sin(theta) * sin(phi);
    if(sV != sV){
      sV = v.y;
    }
    return sV;
  }

  vec3 getPosition(vec3 pos, float epsX, float epsZ){
    vec3 temp;
    temp.x = pos.x + epsX;
    temp.z = pos.z + epsZ;
    temp.y = max(0.0, placeOnSphere(temp)) - radius;
    temp.y += getYPosition(vec2(basePosition.x+epsX+delta*floor(posX), basePosition.z+epsZ+delta*floor(posZ)));
    return temp;
  }

  vec3 getNormal(vec3 pos){
    float eps = 1e-1;
    vec3 tempP = getPosition(pos, eps, 0.0);
    vec3 tempN = getPosition(pos, -eps, 0.0);
    vec3 slopeX = tempP - tempN;
    tempP = getPosition(pos, 0.0, eps);
    tempN = getPosition(pos, 0.0, -eps);
    vec3 slopeZ = tempP - tempN;
    vec3 norm = normalize(cross(slopeZ, slopeX));
    return norm;
  }
`;
