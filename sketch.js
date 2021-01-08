var PLAY = 1;
var END = 0;
var gameState = PLAY;
var boy,boyImage1,boyImage2,boyImage3,boy_running,boy_standing,restart,restartImg,boyStand;
var corona, coronaImage,covid,covidImg;
var handsanitizer,handsanitizerImage;
var grassbackground,grassbackgroundImage,invisibleground;
var diseaseGroup,handsanitizerGroup;
var score=0;
var jumpSound ,  dieSound;

function preload()
{   
boy_running=loadAnimation("run1.png","run2.png","run3.png");
boy_standing=loadAnimation("run1.png");
coronaImage=loadImage("corona.png");
covidImg=loadImage("covid1.jpg");
grassbackgroundImage=loadImage("background.png");
handsanitizerImage=loadImage("hand sanitizer.png");
restartImg=loadImage("restart.png");
jumpSound=loadSound("jump.mp3");
dieSound=loadSound("die.mp3"); 
}
function setup() 
{
createCanvas(450,450);
grassbackground = createSprite(100,100,400,20); 
grassbackground.addImage("grassbackground",grassbackgroundImage);
grassbackground.setVelocity(-7,0);
grassbackground.x =grassbackground.width/2;
 
boy=createSprite(80,100);
boy.addAnimation("boy_running",boy_running);
boy.addAnimation("boy_standing",boy_standing);
boy.setCollider("circle",0,0,40);
boy.scale=0.2;
  
invisibleground = createSprite(400,380,800,10);
invisibleground.velocityX = -5;
invisibleground.visible = false;
  
restart = createSprite(200,150);
restart.addImage(restartImg);
restart.visible=false;
covid = createSprite(190,60);
covid.addImage(covidImg);
covid.visible=false;
covid.scale=0.07;
  
protectionGroup = new Group();
diseaseGroup = new Group(); 
  
score=0;
}

function draw() {
 background(0);
if (grassbackground.x < 0)
{
grassbackground.x = grassbackground.width/2;
}
 
if (invisibleground.x < 0)
{
invisibleground.x = invisibleground.width/2;
} 
if (gameState===PLAY)
{
   
if(keyDown("space")&& boy.y >= 260) {
boy.velocityY = -16;
jumpSound.play();
}
   
boy.velocityY = boy.velocityY + 0.7;
boy.collide(invisibleground);
  
if(protectionGroup.isTouching(boy))
{    
score = score + 5;
protectionGroup.destroyEach();
}
  
if(diseaseGroup.isTouching(boy))
{
gameState = END;
dieSound.play();  
}
  
}
else if (gameState === END) 
{
      
restart.visible = true;
covid.visible=true;
diseaseGroup.visible=false;
   
//set velcity of each game object to 0
grassbackground.velocityX = 0;
boy.velocityY = 0;
boy.velocityX = 0;
diseaseGroup.setVelocityXEach(0);
protectionGroup.setVelocityXEach(0);
    
diseaseGroup.setLifetimeEach(-1);
protectionGroup.setLifetimeEach(-1);
boy.changeAnimation("boy_standing",boy_standing);
    
//set lifetime of the game objects so that they are never destroyed
diseaseGroup.destroyEach();
protectionGroup.destroyEach();
  
if(mousePressedOver(restart)) 
{
reset();
}
}
disease();
protection();
drawSprites();
fill (255);
textSize(32);
text("Score: "+ score, 300,50); 
}
function disease()
{  
if (frameCount % 80 === 0){
corona = createSprite(400,400,10,40);
corona.addImage(coronaImage);
corona.scale = 0.2;
corona.velocityX = -4;
corona.setLifetime = 100;   
diseaseGroup.add(corona);
}
}

function protection()
{
if (frameCount % 300 === 0){
handsanitizer = createSprite(400,370,20,20);
handsanitizer.addImage("handsanitizer",handsanitizerImage)
handsanitizer.scale = 0.2;
handsanitizer.velocityX = -4;
handsanitizer.seLifetime = 100;   
protectionGroup.add(handsanitizer);  
}   
}

function reset()
{
gameState = PLAY; 
restart.visible = false;
covid.visible=false;
console.log("end3")
boy.changeAnimation("boy_running",boy_running); 
grassbackground.setVelocity(-7,0);
grassbackground.x =grassbackground.width/2; 
score = 0;  
}
