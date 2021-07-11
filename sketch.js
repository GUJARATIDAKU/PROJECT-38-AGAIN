//variable for gamestates
var PLAY = 1;
var END = 0;
var gameState  = 1;

var score = 0;

// variable for background.
var background1,backgroundimg;
 
// variable for spaceship.
var spaceship,spaceshipimg1;

// variable for coin.
var coin,coinimage;

// variable for obstacles.
var obstacles,obstacle1,obstacle2,obstacle3,obstacle1img,obstacle2img,obstacle3img;

//Vvariable for gameover.
var gameover,gameoverimg;

function preload(){
  
// loading the image of background.
  backgroundimg = loadImage("BACKGROUND IMAGE.jpg");
  
// loading the image for spaceship.
  spaceshipimg1 = loadImage("spaceship.png");

// loading the image of coin.
 coinimage = loadImage("GOLD IMAGE.png");
  
// loading the images of obstacles.
  obstacle1img = loadImage("OBSTACLE IMAGE 1.png");
  obstacle2img = loadImage("OBSTACLE IMAGE 2.png");
  obstacle3img = loadImage("OBSTACLE IMAGE 3.png");
  
// loading the gameover image.
  gameoverimg = loadImage("GAMEOVER IMAGE.png");
    
// Loading the sound og gameover.
  gameoversound = loadSound("roblox-death-sound-effect.mp3");
  
// loading the coin sound.
  coinsound = loadSound("super-mario-coin-sound.mp3")
  

} 
function setup() {
  
// creating the canvas.
  createCanvas(windowWidth  , windowHeight );

// creating background.
  background1 = createSprite(300,-500);
  background1.addImage("hii",backgroundimg);
  background1.scale = 5;

// creating the spaceship.
  spaceship = createSprite(250,500);
  spaceship.addImage("hi",spaceshipimg1);
  spaceship.scale = 0.3;

// creating groups for coins and obstacles
  coingroup = new Group();
  obstaclegroup = new Group();  

// creating sprite of gameover.
  gameover = createSprite(300,300);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.3;


  
}

function draw() {
  
// creating background.
  background(220);
 

  
  drawSprites();



  // things that should happen in gamestate play.  
  if(gameState === PLAY){

    background1.velocityY = 10;  
    
// moving the background
  if(background1.y > 600){
    background1.y = 350;
  }

// to move the spaceship with arrow keys.
  if(keyDown(LEFT_ARROW)){
    spaceship.x = spaceship.x-5;
  }
    if(keyDown(RIGHT_ARROW)){
    spaceship.x = spaceship.x+5;
  }
    if(keyDown(UP_ARROW)){
    spaceship.y = spaceship.y-5;
  }
    if(keyDown(DOWN_ARROW)){
    spaceship.y = spaceship.y+5;
  }
    
  if(spaceship.isTouching(coingroup)){
    coingroup.destroyEach();
    score = score+5;
    coinsound.play();
  }
    
  // to display score
  textSize(30);
  stroke("white");
  fill("white"); 
  text("Score: "+ score, windowWidth - 100 , camera.y);  
  

  camera.y = spaceship.y

    if(spaceship.isTouching(obstaclegroup)){
      gameState = END;
      gameoversound.play();
    }



   
    
    
// for functions of coins and obstacles.  
  coins();
  spawnobstacle(); 

  gameover.visible = false;
}
  else if
    (gameState === END){
      gameover.visible = true;
      background1.velocityY = 0;
      coingroup.destroyEach();
      obstaclegroup.destroyEach();
      spaceship.visible = false;
      score = 0;
    
      textSize(30);
      stroke("white");
      fill("white");
      text("PRESS SPACE KEY TO RESTART",100,500);
    
    }
    if(keyDown("space")){
      gameState = PLAY;
      spaceship.visible = true;
    }
      
    

  
  


}

function coins(){
  
// to spawn coins.
  if(World.frameCount%100 === 0){
    coin = createSprite(10,5,1,1);
    coin.addAnimation("OP",coinimage);
    coin.scale = 0.1;
    coin.x = Math.round(random(100,300));
    coin.velocityY = 5;
    coin.lifetime = 250;
    coingroup.add(coin);
  }
}

function spawnobstacle (){

// to spawn obstacles.
  if(World.frameCount%200===0){
    obstacles = createSprite(Math.round(random(50,340)),20,0,0);
    obstacles.velocityY = (7+score/4);
    
    r = Math.round(random(1,3));
    if(r == 1){
     obstacles.addImage(obstacle1img);
      obstacles.scale = 0.1;
      } else if (r == 2){
      obstacles.addImage(obstacle2img);
      obstacles.scale = 0.1;
    } else if (r == 3){
      obstacles.addImage(obstacle3img);
      obstacles.scale = 0.5;
    }
    

    
    obstacles.lifetime = 100;
    
    
    obstaclegroup.add(obstacles);
    }
  
}
