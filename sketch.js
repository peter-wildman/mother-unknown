
let archiveImg;
let bufferImg;
let dispMap;

function preload(){
  archiveImg = loadImage('mortonObituary.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  pixelDensity(1);
  dispMap = createGraphics(600, 600);
  bufferImg = createImage(archiveImg.width,archiveImg.height);
  dispMap.fill(0);
  dispMap.textSize(790);
  dispMap.text('G',10,580);
  //dispMap.ellipse(dispMap.width/2,dispMap.height/2,dispMap.width)
}

function draw() {

  bufferImg.copy(archiveImg,0,0,archiveImg.width,archiveImg.height,0,0,bufferImg.width,bufferImg.height);
  archiveImg.loadPixels();
  bufferImg.loadPixels();
  dispMap.loadPixels();

     var mX = int(mouseX);
     var mY = int(mouseY);
     var smudgeSize = 300;
     var xCount = 0;
     var yCount = 0;

      for(var y = mY-smudgeSize; y < mY+smudgeSize; y++){
        for(var x = mX-smudgeSize; x <mX+smudgeSize; x++){
          var index = (x+y*archiveImg.width)*4;
          var mapIndex = (xCount+yCount*dispMap.width)*4;
          var displacement;

          //up positive
          var vertDir;
          //left positive
          var horizDir;
          //1 on and 0 off
          var vertBool = 1;
          var horizBool = 1;
          //check horizontal mouse direction
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
          //check vertical mouse direction
          if(mouseY < pmouseY){
            vertDir = 1;
          } else if(mouseY > pmouseY){
            vertDir = -1;
          } else {
            vertBool = 0;
            vertDir = 1;
          }

          //this takes the black pixels as the map
          if(dispMap.pixels[mapIndex+3] != 0){
            //this algorithm covers all settings
            displacement = index+((archiveImg.width*4)*vertDir*vertBool)+horizBool*4*horizDir;
            //replace
            archiveImg.pixels[index]   = bufferImg.pixels[displacement];
            archiveImg.pixels[index+1] = bufferImg.pixels[displacement+1];
            archiveImg.pixels[index+2] = bufferImg.pixels[displacement+2];
            archiveImg.pixels[index+3] = 255;
            //dispMap.pixels[mapIndex+3] = 0;
          }
          xCount++;
        }
        yCount++;
        xCount = 0;
      }


  archiveImg.updatePixels();
  bufferImg.updatePixels();
  dispMap.updatePixels();
  image(archiveImg,0,0);
  //image(dispMap,mouseX-dispMap.width/2,mouseY-dispMap.height/2);
  //noLoop();

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
