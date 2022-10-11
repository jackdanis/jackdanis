const btn = document.getElementById('btn');

btn1.addEventListener('click', function onClick(event) {
  // 👇️ Change text color globally
  document.body.style.color = 'darkgreen';

  // 👇️ Change text color for clicked element only
  // event.target.style.color = 'salmon';
});


let body = document.querySelector('body');
body.addEventListener('click', giveAlert());

function giveAlert() {
    alert('this is sn alert');
}




var counter;
var xPos = 25;
var yPos = 50;
var L = 50
//This does Triangle Size & Initial Distance

var colorCounter = 0;
var color1r = 202;
var color1g = 75;
var color1b = 41;
var color2r = 48;
var color2g = 80;
var color2b = 110;
var color3r = 30;
var color3g = 28;
var color3b = 28;
var r, g, b;
//These global variables coordinate Color of the shapes and their pattern

function setup() {
  createCanvas(400, 400);
  colorMode(RGB);
  frameRate(60);
  noStroke()
  R = L/sqrt(3)
}

function ColorChange() {
  if (colorCounter == 1) {
    r = color1r
    g = color1g
    b = color1b
  } else if (colorCounter == 2) {
    r = color2r
    g = color2g
    b = color2b
  } else if (colorCounter == 3) {
    r = color3r
    g = color3g
    b = color3b
  }
  else{
    colorCounter = 0
  } //Close Colorlist
  colorCounter = colorCounter + 1 
}


function drawTriangle() {
  for (x = 0; x < 36; x++) {
    push();

    for (y = 0; y < 3; y++) {
      push()
      rotate(frameCount / 200)
      for (let i = 0; i < 1; i++) {
        fill(255, 255, 255);
        R = R + 1
        triangle(R*cos(0), R*sin(0), R*cos((2*PI)/3),R*sin((2*PI)/3),R*cos((4*PI)/3),R*sin((4*PI)/3));
        R = R - 1
        fill(r, g, b);
        triangle(R*cos(0), R*sin(0), R*cos((2*PI)/3),R*sin((2*PI)/3), R*cos((4*PI)/3), R*sin((4*PI)/3));
      } //This creates Triangle spin
      rotate(-frameCount / 100)
      ColorChange()
      for (let i = 0; i < 1; i++) {
        fill(255, 255, 255);
        R = R + 1
        triangle(R*cos(0), R*sin(0), R*cos((2*PI)/3),R*sin((2*PI)/3),R*cos((4*PI)/3),R*sin((4*PI)/3));
        R = R - 1
        fill(r, g, b);
        triangle(R*cos(0), R*sin(0), R*cos((2*PI)/3),R*sin((2*PI)/3), R*cos((4*PI)/3), R*sin((4*PI)/3));
      } //This creates a reverse spinning triangle
      pop()
      translate(0,150)
    }
    pop()
    translate(10, 0)
  } //All of this Pop stuff keeps rotation + position in check, translate is distance each repetition
}

function drawRevTriangle() {
  for (x = 0; x < 36; x++) {
    push();
    for (y = 0; y < 2; y++) {
      push()
      rotate(-frameCount / 200)
      for (let i = 0; i < 1; i++) {
        fill(255, 255, 255);
        R = R + 1
        triangle(R*cos(0), R*sin(0), R*cos((2*PI)/3),R*sin((2*PI)/3),R*cos((4*PI)/3),R*sin((4*PI)/3));
        R = R - 1
        fill(r, g, b);
        triangle(R*cos(0), R*sin(0), R*cos((2*PI)/3),R*sin((2*PI)/3), R*cos((4*PI)/3), R*sin((4*PI)/3));
      } 
      rotate(frameCount / 100)
      ColorChange()
      for (let i = 0; i < 1; i++) {
        fill(255, 255, 255);
        R = R + 1
        triangle(R*cos(0), R*sin(0), R*cos((2*PI)/3),R*sin((2*PI)/3),R*cos((4*PI)/3),R*sin((4*PI)/3));
        R = R - 1
        fill(r, g, b);
        triangle(R*cos(0), R*sin(0), R*cos((2*PI)/3),R*sin((2*PI)/3), R*cos((4*PI)/3), R*sin((4*PI)/3));
      } //This creates a reverse spinning triangle
      pop();
      translate(0,150);
    }
    pop();
    translate(10, 0);
  } //All of this Pop stuff keeps rotation + position in check, translate is distance each repetition
}


function draw() {
  background(248, 241, 231);
  translate(xPos, yPos);
  drawTriangle();
  resetMatrix();
  translate(xPos, yPos+80);
  drawRevTriangle();

}



btn2.addEventListener('click',function onClick(event){
 frameRate(10);
});
