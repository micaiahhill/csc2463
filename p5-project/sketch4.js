function setup(){
    createCanvas(200,200);
}

function draw(){
    background("navy");
    noStroke();
    fill('white');
    circle(100,100,100);
    fill('green');
    circle(100,100,95); 
    stroke('white');
    strokeWeight(2);
    fill("red");
    beginShape();
vertex(105, 50);
vertex(112, 85);
vertex(150, 85);
vertex(118, 105);
vertex(132, 140);
vertex(100, 120);
vertex(70, 140);
vertex(87, 105);
vertex(54, 85);
vertex(87, 85);
endShape(CLOSE);
}