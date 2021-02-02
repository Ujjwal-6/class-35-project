var bgImg;
var Balloon,BallonImg;
var database,positions;

function preload(){
  BallonImg = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
  bgImg=loadImage("background.png");
}
function setup() {
   database=firebase.database();
  createCanvas(1500,600);

  

  Balloon = createSprite(400, 200, 50, 50);
  Balloon.addAnimation("ground",BallonImg);
  Balloon.scale=0.5;

  var Balloonposition = database.ref('balloon/position');
  Balloonposition.on("value",readposition,showError)
}
//readHeight
function draw() {
  background(bgImg); 
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    //Balloon.x = Balloon.x -10;
}
else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    //Balloon.x = Balloon.x +10;
}
else if(keyDown(UP_ARROW)){
  updateHeight(0,-10);
  Balloon.addAnimation("ground",BallonImg);
  Balloon.scale=Balloon.scale -0.01;
  //Balloon.y = Balloon.y -10;
}
else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    Balloon.addAnimation("ground",BallonImg);
    Balloon.scale= Balloon.scale +0.01;

    //Balloon.y = Balloon.y +10;

}
  drawSprites();
}
function updateHeight(x,y){
  database.ref('balloon/position').set({
  'x' : position.x + x ,
  'y' : position.y + y
})}

function showError(){
console.log("error");
}
function readposition(data){
  position = data.val();
  Balloon.x = position.x;
  Balloon.y = position.y;

}

