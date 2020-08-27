//Global Variables
var bananaImage, obstacleImage, background, backImage, score, player, foodGroup, obstacleGroup, banana;


function preload(){
  backImage = loadImage("jungle2.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
}


function setup() {
  createCanvas(600,300);
  
  background = createSprite(300,50,600,300);
  background.addImage(backImage);
  background.velocityX= -3;
  background.x = background.width/2;
  
  ground = createSprite(300,280,1200,20);
  ground.visible = false;
  
  player = createSprite(100,240,20,50);
  player.addAnimation("running",player_running);
  player.scale = 0.09;
  
  score = 0;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw(){
 //background(255); 
if(background.x<100) {
  background.x = background.width/2;
}
  
if(keyDown("space")) {
   player.velocityY = -15;
}
  
  stroke("white");
  textSize(20);
  fill("white");
  //score = Math.ceil(frameCount/frameRate());
  score = World.frameCount;
  
  player.velocityY = player.velocityY + 1;
  player.collide(ground);

  if(foodGroup.isTouching(player)) {
    score = score + 2;
    foodGroup.destroyEach();
     
    switch(score) {
  case 10: player.scale = 0.12;
    break;
  case 20: player.scale = 0.14;
    break;
  case 30: player.scale = 0.16;
    break;
  case 40: player.scale = 0.18;
    break;
    default: break;
}
  }
  
  if(obstacleGroup.isTouching(player)) {
    player.scale = 0.09;
  }
  
    food();
    obstacles();
    
  drawSprites();
  
  text("Score: ", + score, 200,50);
}

  function food() {
  
  if(World.frameCount % 100 === 0) {
  banana = createSprite(600,150,30,30);
  banana.y = random(100,150);
  banana.addAnimation("banana", bananaImage);
  banana.scale = 0.05;
  banana.velocityX = -5;
  banana.lifetime = 200;
  
  foodGroup.add(banana);
}
  }

function obstacles() {
  if(World.frameCount % 300 === 0) {
    obstacle = createSprite(600,245,30,30);
    obstacle.addAnimation("Stone",obstacleImage);
    obstacle.scale = 0.13;
    obstacle.velocityX = -4;
    obstacle.lifetime = 150;
    
    obstacleGroup.add(obstacle);
  }
}
