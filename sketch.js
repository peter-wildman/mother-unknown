// in this sketch we're going to send the webcam to the shader, and then invert it's colors

// the shader variable
let camShader;

let pupImg;
let bufferImg;

function preload(){
  // load the shader
  camShader = loadShader('effect.vert', 'effect.frag');
  pupImg = loadImage('textTest.png');

}

function setup() {
  // shaders require WEBGL mode to work
  //createCanvas(windowWidth, windowHeight, WEBGL);
  createCanvas(windowWidth, windowHeight);
  noStroke();
  pixelDensity(1);
  bufferImg = createImage(pupImg.width,pupImg.height)

}

function draw() {
  // shader() sets the active shader with our shader
  // shader(camShader);
  // camShader.setUniform('tex1', pupImg);
  // camShader.setUniform('x', map(mouseX,width,0,0,1));
  // camShader.setUniform('y', map(mouseY,0,height,0,1));
  // // rect gives us some geometry on the screen
  // rect(0,0,10, 10);


  bufferImg.copy(pupImg,0,0,pupImg.width,pupImg.height,0,0,bufferImg.width,bufferImg.height);
  pupImg.loadPixels();
  bufferImg.loadPixels();

     var mX = int(mouseX);
     var mY = int(mouseY);
     var smudgeSize = 180;

      for(var y = mY-smudgeSize; y < mY+smudgeSize; y++){
        for(var x = mX-smudgeSize; x <mX+smudgeSize; x++){
          var index = (x+y*pupImg.width)*4;
          var displacement;

          //up positive
          var vertDir;
          //left positive
          var horizDir;
          //1 on and 0 off
          var vertBool = 1;
          var horizBool = 1;

          if(mouseX<pmouseX){
            horizDir = 1;
            //horizBool = 1;
          } else if(mouseX > pmouseX){
            horizDir = -1;
            //horizBool = 1;
          } else {
            horizBool = 0;
            horizDir = 1;
          }

          if(mouseY < pmouseY){
            vertDir = 1;
          } else if(mouseY > pmouseY){
            vertDir = -1;
          } else {
            vertBool = 0;
            vertDir = 1;
          }


          //this algorithm coŒvers all settings
          displacement = index+((pupImg.width*4)*vertDir*vertBool)+horizBool*4*horizDir;

          pupImg.pixels[index]   = bufferImg.pixels[displacement];
          pupImg.pixels[index+1] = bufferImg.pixels[displacement+1];
          pupImg.pixels[index+2] = bufferImg.pixels[displacement+2];
          pupImg.pixels[index+3] = 255;

        }
      }
  pupImg.updatePixels();
  bufferImg.updatePixels();
  image(bufferImg,0,0);


}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
