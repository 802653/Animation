// function food
function Food(l) {
  // +++++ Properties
  this.loc = l; // sets the loction 

  // +++++ functions
  this.run = function() {
    this.render();
  }

  this.getNewLoc = function() {
    let fx = floor(random(nCols));
    let fy = floor(random(nRows));
    this.loc = createVector(floor(fx * cellWidth, fy * cellWidth), floor(fy*cellWidth));
  }

  this.render = function() {
    fill(220, 50, 50); 
    // sets the color
    rect(this.loc.x, this.loc.y, cellWidth, cellWidth) 
    // sets the shape
  }
}
// ++++++++++++++++++++++++ end of food