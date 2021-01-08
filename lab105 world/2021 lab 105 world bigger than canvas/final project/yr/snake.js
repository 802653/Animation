function Snake(l, v) {
  // +++++ Properties
  this.head = l;
  this.vel = v; // sets the velocity
  this.segments = [];
  let v1 = createVector(0, 0)
  this.segments.push(v1);
  this.dead = false;

  // +++++ functions
  this.run = function() {
    this.update();
    this.render();
  }
  this.update = function() {
    //check for collision 
    if (this.head.x === food.loc.x && this.head.y === food.loc.y) {
      //move the food to random location
      food.getNewLoc();
      // add a new segment
      this.segments.push(createVector(0, 0));
    }
	
	for(var i = 1; i < this.segments.length; i++) {
		if(this.head.x === this.segments[i].x && this.head.y === this.segments[i].y) {
			this.dead = true;
			
		}
	}
	if(this.head.x < 0 || this.head.x > 600) {
		this.dead = true;
	}
	if(this.head.y < 0 || this.head.y > 600) {
		this.dead = true;
	}
    //this.head.add(this.vel);

    //update all the segments
    for (let i = this.segments.length - 1; i > 0; i--) {
      this.segments[i].x = this.segments[i - 1].x
      this.segments[i].y = this.segments[i - 1].y
    }
    // set the first segment to head location
    this.segments[0].x = this.head.x;
    this.segments[0].y = this.head.y;
    //update the head
    this.head.add(this.vel);
  }

  this.render = function() {
    fill(20, 220, 50); // sets the color 
    // draw the head
    rect(this.head.x, this.head.y, cellWidth, cellWidth);
    // sets the shape
    for (let i = 0; i < this.segments.length; i++) {
      rect(this.segments[i].x, this.segments[i].y, cellWidth, cellWidth)
    }
  }
} // +++++++++++++++++++++++++++++ end of snake