// Mark Pacheco 

var cellWidth = 20
var nCols, nRow;
var snake, food;

function setup() {
  // put setup code here
  var cnv = createCanvas(600, 600);
  cnv.position((windowWidth - width) / 2, 30)
  background(20);
  frameRate(20);
  nCols = width/cellWidth;
  nRows = height/cellWidth;
  var x = floor(random(nCols));
  var y = floor(random(nRows));
  var loc = createVector(x * cellWidth, y * cellWidth);
  var vel = createVector(0,0)
  snake = new Snake(loc, vel);
  let fx = floor(random(nCols));
  let fy = floor(random(nRows));
  let floc = createVector(fx * cellWidth, fy * cellWidth);
  food = new Food(floc);
}
function draw() {
  background(220);
  if(snake.dead == false) {
	snake.run();
  }
  else {
	snake.render();
  }
  food.run();
}
function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    snake.vel = createVector(-cellWidth, 0);
  } else if(keyCode === RIGHT_ARROW) {
    snake.vel = createVector(cellWidth, 0);
  } else if(keyCode === UP_ARROW) {
    snake.vel = createVector(0, -cellWidth);
  } else if(keyCode === DOWN_ARROW) {
    snake.vel = createVector(0, cellWidth);
  }
}