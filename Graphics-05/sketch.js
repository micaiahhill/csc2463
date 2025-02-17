let sprite_sheet; // Declare variable to hold the sprite sheet
let sprite_animation = []; // Declare variable to hold the sprite animation
let bugs = []; // Declare variable to hold the bugs
let numBugs = 10; // Declare variable to hold the number of bugs
let squishedSprite; // Declare variable to hold the squished bug sprite


let GameStates =Object.freeze( { // Define the different game states ,
  START: "start",
  PLAY: "play",
  END: "end"  
});
let gameState = GameStates.START; // Set the initial game state to START
let score = 0; // set the initial score to 0
let time = 30; // set the initial time to 10
let highScore = 0; // set the initial high score to 0
let textPadding = 15; // set the padding for the text to 15
let currentFrame = 0;
let frameSpeed = 5;





function preload(){
  // Load the font
  gamefont = loadFont('media/PressStart2P-Regular.ttf');
 // specify width and height of each frame and the number of frames
 sprite_sheet = loadImage('media/ladybug2.png');
  squishedSprite = loadImage('media/squished.png');

}
function setup() {
  createCanvas(600, 600);
  loop(); // Start the draw loop
  textFont(gamefont); // set the font to the font we loaded

  for(let i = 0; i < 31; i++){
    let x = (i % 5) * 192;
    let y = Math.floor(i / 5) * 192;
    let frame = sprite_sheet.get(x,y,192,192);
    sprite_animation.push(frame);
    console.log(`Frame ${i}: x=${x}, y=${y}`); // Debugging statement to check frame coordinates
    console.log(`Sprite width: ${sprite_animation[0].width}, height: ${sprite_animation[0].height}`);

  }

  for (let i = 0; i < numBugs; i++) {
    let x = random(width - 32);
    let y = random(height - 32);
    bugs.push(new Bug(x, y));
  }
}

function draw() {
  background(220);
 
 if (frameCount % frameSpeed === 0){
   currentFrame = (currentFrame + 1) % sprite_animation.length; 
 }

  switch(gameState){ // draw diffrent things dependt on what the state is in
    case GameStates.START:
      image(sprite_animation[currentFrame],204,100);
      
      textAlign(CENTER,CENTER); // set the text to be drawn in the center of the canvas 
      textSize(18); // set the text    
      text("Press ENTER to start",width/2,height/2); // draws at midpoint on the canvas 
      break;
    case GameStates.PLAY:
      textAlign(LEFT,TOP); // set the text to be drawn in the top left of the canvas
      text("Score:"+ score,textPadding,textPadding);
      textAlign(RIGHT,TOP); // set the text to be drawn in the top right of the canvas
      text("Time:" + Math.ceil(time), width - textPadding,textPadding);
      
      for (let bug of bugs) {
        bug.update();
        bug.show();
      }


      time -= deltaTime/1000;
      if(time <= 0){
        gameState = GameStates.END;
      }
      if(frameCount% frameSpeed === 0){ 
        currentFrame = (currentFrame + 1) % sprite_animation.length;
      }

     
      break;
    case GameStates.END:
      textAlign(CENTER,CENTER);
      text("Game Over",width/2,height/2-20);

      text("Score:" + score,width/2,height/2);  
      if(score > highScore)
        highScore = score;
      text("High Score:" + highScore, width/2, height/2 + 20);
      break;
  }
}
 
function keyPressed(){
  switch(gameState){
    case GameStates.START:
      if(keyCode === ENTER){ // if they press enter we will start playing the game
        gameState = GameStates.PLAY;
      }
      break;
    case GameStates.PLAY:
      break;
    case GameStates.END:
      break;

  }
}

 
let sizeModifier = 1;
let maxSpeed = 5;
let bugSize = 150; // Initial bug size 
let bugSpeedIncrement  = 0.1;
class Bug {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.squishTime =0;
    this.size = 150;
    this.currentFrame = floor(random(sprite_animation.length));
    this.squished = false; // Track if the bug is squished
  
  }

  
  update() {
    if (!this.squished) {
      this.x += this.speedX;
      this.y += this.speedY;

    
      
      this.size = 150* sizeModifier;
      this.size = max(this.size , 32);
      // Check for bounds and reverse direction if necessary
      if (this.x < 0 || this.x > width - this.size) {this.speedX *= -1;
        this.x = constrain(this.x, 0, width - this.size);
      }
      if (this.y < 0 || this.y > height - this.size) {this.speedY *= -1
        this.y = constrain(this.y, 0, height - this.size);
      };

      if (frameCount % frameSpeed === 0) {
        this.currentFrame = (this.currentFrame + 1) % sprite_animation.length;
      }
    }else{
        // If squished, check if 1 second has passed
        if (millis() - this.squishTime > 1000) {
          // Remove the bug after 1 second
          let index = bugs.indexOf(this);
          if (index !== -1) {
            bugs.splice(index, 1);
          }
        }
    }
  }


  show() {
    if (this.squished) {
      image(squishedSprite, this.x, this.y,this.size,this.size); // Show squished bug
    } else {
      image(sprite_animation[this.currentFrame], this.x, this.y,this.size,this.size);
    }
  }

  squish() {
   
    this.squished = true;
    this.squishTime = millis();
    score += 1; // Increase score when squished
   sizeModifier*= 0.95;
   
   // Increase the difficulty
   for (let bug of bugs) {
    bug.speedX += bugSpeedIncrement;
    bug.speedY += bugSpeedIncrement;

    // Cap the speed to the max value to prevent bugs from going too fast
    bug.speedX = constrain(bug.speedX, -maxSpeed, maxSpeed);
    bug.speedY = constrain(bug.speedY, -maxSpeed, maxSpeed);
  }

  // Add a new bug after one is squished
  let newBug = new Bug(
    random(width - 32), 
    random(height - 32), 
    random(-1, 2), // Initial speed
    random(-1, 2), // Initial speed
    bugSize // Same size as the other bugs
  );
  bugs.push(newBug);

 
  }
  isClicked(mx, my) {
    return mx > this.x && mx < this.x + this.size && my > this.y && my < this.y + this.size;
  }
  
}
function mousePressed() {
    for (let bug of bugs) {
      if (!bug.squished && bug.isClicked(mouseX, mouseY)) {
        bug.squish();
      }
    }
}



