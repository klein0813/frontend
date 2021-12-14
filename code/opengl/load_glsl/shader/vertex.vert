#version 330
in vec3 apos;

void main () {
  gl_Position = vec4(apos, 1.0);
}
