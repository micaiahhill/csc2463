
let selectedColor = "black"; // start with 

//Create a Canvas 
function setup(){
    createCanvas(900,700);
    colorMode(HSB);
    background("white");

}

function draw(){
    drawPalette();  // for the color palette
}

function drawPalette(){
    stroke(255); // border for the colors
    strokeWeight(2); 
    
    let colors = ["red", "orange", "yellow",[125,100,100],"cyan", "blue", "violet", "brown", "white", "black"];   // creating the colors and squares 
    for (let i = 0; i < colors.length; i++){
        fill(colors[i]);
        square(0,i*50,50);
    }   
}

function mousePressed(){
    if(mouseX >= 0 && mouseX <= 50){
        let color= floor(mouseY/50);
        let colors = ["red", "orange", "yellow",[125,100,100],"cyan", "blue", "violet", "brown", "white", "black"]; // creating basically buttons
        selectedColor = colors[color];
    }   
}

function mouseDragged(){
    stroke(selectedColor);
    strokeWeight(9);    // actually drawing
    line(pmouseX, pmouseY, mouseX, mouseY);
}
