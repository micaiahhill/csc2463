let mailman; // stores the sprite sheet image
let girlypopImg; // stores the sprite sheet image  for the second character
let robotImg; // stores the sprite sheet image for the third character 
let warriorImg; // stores the sprite sheet image for the fourth character
let character; // player controlled character
let girlypop; // player controlled character
let robot; // player controlled character
let warrior; // player controlled character

function preload() {
  mailman= loadImage("Media/spreadsheet.png");
  girlypopImg= loadImage("Media/56407.png");
  robotImg= loadImage("Media/56429.png");
  warriorImg= loadImage("Media/56413.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  let positions = [
    { x: width / 5, y: height / 2 },
    { x: (2 * width) / 5, y: height / 2 },
    { x: (3 * width) / 5, y: height / 2 },
    { x: (4 * width) / 5, y: height / 2 }
  ];

  girlypop = new Character(positions[0].x, positions[0].y);
  girlypop.addAnimation("down", new SpriteAnimation(girlypopImg, 6, 5, 6));
  girlypop.addAnimation("up", new SpriteAnimation(girlypopImg, 0, 5, 6));
  girlypop.addAnimation("stand", new SpriteAnimation(girlypopImg, 0, 0, 1));
  girlypop.addAnimation("left", new SpriteAnimation(girlypopImg, 0, 4, 6));
  girlypop.addAnimation("right", new SpriteAnimation(girlypopImg, 6, 4, 6));
  girlypop.currentAnimation = "stand";

  character = new Character(positions[1].x, positions[1].y);
  character.addAnimation("down", new SpriteAnimation(mailman, 6, 5, 6));
  character.addAnimation("up", new SpriteAnimation(mailman, 0, 5, 6));
  character.addAnimation("stand", new SpriteAnimation(mailman, 0, 0, 1));
  character.addAnimation("left", new SpriteAnimation(mailman, 0, 4, 6));
  character.addAnimation("right", new SpriteAnimation(mailman, 6, 4, 6));
  character.currentAnimation = "stand";

  robot = new Character(positions[2].x, positions[2].y);
  robot.addAnimation("down", new SpriteAnimation(robotImg, 6, 5, 6));
  robot.addAnimation("up", new SpriteAnimation(robotImg, 0, 5, 6));
  robot.addAnimation("stand", new SpriteAnimation(robotImg, 0, 0, 1));
  robot.addAnimation("left", new SpriteAnimation(robotImg, 0, 4, 6));
  robot.addAnimation("right", new SpriteAnimation(robotImg, 6, 4, 6));
  robot.currentAnimation = "stand";

  warrior = new Character(positions[3].x, positions[3].y);
  warrior.addAnimation("down", new SpriteAnimation(warriorImg, 6, 5, 6));
  warrior.addAnimation("up", new SpriteAnimation(warriorImg, 0, 5, 6));
  warrior.addAnimation("stand", new SpriteAnimation(warriorImg, 0, 0, 1));
  warrior.addAnimation("left", new SpriteAnimation(warriorImg, 0, 4, 6));
  warrior.addAnimation("right", new SpriteAnimation(warriorImg, 6, 4, 6));
  warrior.currentAnimation = "stand";
}

function draw() {
  background(220);
  girlypop.draw();
  character.draw();
  robot.draw();
  warrior.draw(); 

}

function keyPressed(){
  character.keyPressed();
  girlypop.keyPressed();
  robot.keyPressed();
  warrior.keyPressed();
}

function keyReleased(){
  character.keyReleased();
  girlypop.keyReleased();
  robot.keyReleased();
  warrior.keyReleased();
}

class Character{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.currentAnimation=null;
    this.animations={};
    
  } 

  addAnimation(key,animation){
    this.animations[key]=animation;
  }

  draw(){
    let animation=this.animations[this.currentAnimation];
    if(animation){
      switch(this.currentAnimation){
        case "up":
          this.y-=2;
          break;
        case "down":
          this.y+=2;
          break;
        case "left":
          this.x-=2;
          break;
        case "right": 
          this.x+=2;
          break;
      }
      push();
      translate(this.x,this.y); 
      animation.draw();
      pop();  
    }
  }

  keyPressed(){
    switch(keyCode){
      case UP_ARROW:
        this.currentAnimation="up";
        break;
      case DOWN_ARROW:
        this.currentAnimation="down";
        break;
      case LEFT_ARROW:
        this.currentAnimation="left";
        this.animations[this.currentAnimation].flipped= true;
        break;
      case RIGHT_ARROW:
      this.currentAnimation="right";
      this.animations[this.currentAnimation].flipped= false;  
    }
    }
    
    keyReleased(){
      this.currentAnimation="stand";
      this.animations[this.currentAnimation].flipped= true;
    }
}
class SpriteAnimation{
  constructor(spritesheet,startU,startV, duration){
    this.spritesheet= spritesheet; // member of the class
    this.u= startU; // current frame
    this.v= startV; // current row  
    this.duration= duration; // number of frames
    this.startU= startU; // start frame
    this.frameCount=0;  // frame counter
    this.flipped = false;
  }
 
  draw(){

    let s = (this.flipped) ? -1 : 1;
    scale(s,1);
    image(this.spritesheet, 0, 0,80,80,this.u*80,this.v*80,80,80); 
    
    this.frameCount++;
    if(this.frameCount%10==0)
    this.u++; 

    if(this.u>=this.startU +this.duration)
      this.u=this.startU; 
  }
}
