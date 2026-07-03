export const signalStormVertex = /* glsl */ `
  attribute float aSpeed;
  attribute float aSize;
  varying float vSpeed;

  void main() {
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPos;
    gl_PointSize = aSize * 6.0 * (300.0 / max(-mvPos.z, 0.1));
    vSpeed = aSpeed;
  }
`;

export const signalStormFragment = /* glsl */ `
  uniform float uMaxSpeed;
  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;
  varying float vSpeed;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    if (r > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, r) * 0.55;
    float t = clamp(vSpeed / uMaxSpeed, 0.0, 1.0);
    vec3 color = mix(uColorLow, uColorHigh, smoothstep(0.0, 1.0, t));
    gl_FragColor = vec4(color, alpha);
  }
`;
