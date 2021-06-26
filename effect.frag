precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture and image coming from p5
uniform sampler2D tex0;
uniform sampler2D tex1;

uniform float x;
uniform float y;
vec4 pup;

// how much to displace by (controlled by mouse)
uniform float amt;

void main() {
  vec2 mouse = vec2(x,y);
  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;
  //try to make it between 0.55 and 0.45
  float dispAmt = 0.55;
  // then spread it between -1 and 1
  dispAmt = dispAmt * 2.0 - 1.0;

  // we will displace the image by the average color times the amt of displacement
  float mouseDist = distance(mouse,uv);
  float mouseDistMapped = mouseDist * 2.0 -1.0;
  float disp = dispAmt * mouseDistMapped;
  //float disp = avg * amt;

  // displacement works by moving the texture coordinates of one image with the colors of another image
  // add the displacement to the texture coordinages
  vec4 pup = texture2D(tex1, uv + disp);


  // output the image
  gl_FragColor = pup;
}
