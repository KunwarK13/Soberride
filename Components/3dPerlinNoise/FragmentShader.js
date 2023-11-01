const fragmentShader = `
uniform float u_intensity;
uniform float u_time;
uniform float u_color_const;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    float distort = 2.0 * vDisplacement * u_intensity * sin(vUv.y * 10.0 + u_time);
    vec3 color = vec3(abs(vUv - 0.5) * u_color_const * (1.0 - distort), u_color_const - 1.0);
    gl_FragColor = vec4(color, 1.0);
}

`;

export default fragmentShader;
