var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 4;
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghostImg",ghostImg);
  climbersGroup = new Group();
  doorsGroup = new Group();
  invisibleBlockGroup = new Group();
  ghost.debug = true;
  ghost.setCollider("circle",0,0,148);
}

function draw() {

  background(0);
  if (gameState==="play") {
  if(tower.y > 400){
      tower.y = 300
    } 
  spawnDoors();
  
  if (keyDown("left_arrow")) {
  ghost.x = ghost.x-7;   
  }

  if (keyDown("right_arrow")) {
    ghost.x = ghost.x+7;   
    }
    if (keyDown("space")) {
      ghost.velocityY = -12;  
    }
    ghost.velocityY = ghost.velocityY+0.5;
  if (climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600) {
  ghost.destroy();
  gameState = "end";

}
drawSprites(); 
  }
  if (gameState==="end") {
    stroke("yellow");
    fill("yellow");
   textSize(30);
   text("Game Over",230,250);
  }

  
  
 
}
function spawnDoors(){
if(frameCount%100===0){
var door = createSprite(200,-50);
var climber = createSprite(200,10);
var invisibleBlock = createSprite(200,15);
invisibleBlock.width = climber.width;
invisibleBlock.height = 2;
door.x = Math.round(random(120,400));
climber.x = door.x;
invisibleBlock.x = door.x;
door.addImage(doorImg);  
climber.addImage(climberImg);
door.velocityY = 4;
climber.velocityY = 4;
invisibleBlock.velocityY = 4;
ghost.depth = door.depth;
ghost.depth = ghost.depth+=4;
door.lifetime = 800;
invisibleBlock.lifetime = 800;
climber.lifetime = 800;
doorsGroup.add(door);
climbersGroup.add(climber);
invisibleBlockGroup.add(invisibleBlock);
invisibleBlock.debug = true;

}
}
