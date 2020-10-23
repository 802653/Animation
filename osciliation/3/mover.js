

//  Mover constructor function +++++++++++++++++++++++++++++

function Mover(x, y, dx, dy, rad, clr,orbs){
	this.location = new JSVector(x,y);
    this.velocity = new JSVector(dx,dy);
	this.acceleration = new JSVector(0,0);
	this.rad = rad;
	this.mass = 0.31415 * rad * rad;
	this.clr = clr;
	this.isOverlapping = false;
	this.f = null;
	this.orbiters = [];
	for (let i = 0; i < orbs; i++) {
		let a = i * (Math.Pi*2) / numOrbs + this.orbitAngle;
		this.orbiters[i] = new Orbiter(this, 15, 15, a, 1, this.clr)
		
	}
}

  //  placing methods in the prototype (every Mover shares functions)

Mover.prototype.run = function(){
	this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
	this.checkOverlapping();
	this.update();
	this.render();
	this.checkEdges();
	this.acceleration.multiply(0);
	this.velocity.x += -0.00002 * 2 * 3.1415 * this.rad *  this.velocity.x
	this.velocity.y += -0.00002 * 2 * 3.1415 * this.rad * this.velocity.y
}

Mover.prototype.applyForce = function(force) {
	this.f = force.copy();
	this.f.divide(this.mass);
    this.acceleration.add(this.f); 
	
}

Mover.prototype.gravity = function(a) {
	force = JSVector.subGetNew(this.location, a.location); 
	let distance = force.getMagnitude();
	if (distance < 20) {
		distance = 20;
	}
	//if (distance > 200) {
	//	distance = 200;
	//}
	//force.normalize();
	let strength = (2 * this.mass * a.mass)/ (distance*distance);
	force.setMagnitude(strength);
	return force;
	
}

// check if this Mover is overlapping any other Mover
Mover.prototype.checkOverlapping = function(){
    this.isOverlapping = false;//  default color
    this.clr =  "rgba(255,255,255,255)"
    let b = game.movers;
    for(let i = 0; i < b.length; i++){ // for all the Movers
       if(this !== b[i]){   // if not this Mover
         let d = Math.sqrt((this.location.x-b[i].location.x)*(this.location.x-b[i].location.x) + (this.location.y-b[i].location.y)*(this.location.y-b[i].location.y));
         if(d < this.rad + b[i].rad){
            this.isOverlapping = true;
            this.clr =  "rgba(100,220,55,10)"
			let vCollision = {x: this.location.x - b[i].location.x, y: this.location.y - b[i].location.y};
              let vRelativeVelocity = {x: this.velocity.x - b[i].velocity.x, y: this.velocity.y - b[i].velocity.y};
              let vCollisionNorm = {x: vCollision.x / d, y: vCollision.y / d};
              let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

              let impulse = 2 * speed / (this.mass + b[i].mass);
              this.velocity.x -= (impulse * b[i].mass * vCollisionNorm.x);
              this.velocity.y -= (impulse * b[i].mass * vCollisionNorm.y);
			  
              b[i].velocity.x += (impulse * this.mass * vCollisionNorm.x);
              b[i].velocity.y += (impulse * this.mass * vCollisionNorm.y);
			  
			  this.location.add(this.velocity);
			  b[i].location.add(b[i].velocity);
         }
       }
    }

  }

// draw the Mover on the canvas
Mover.prototype.render = function(){
    let ctx = game.ctx;
    // color depends on whether this Mover overlaps any oher Mover
	if(!this.isOverlapping) {
		ctx.strokeStyle = "rgba(255,155,255,255)"//this.clr;
	}
	else {
		ctx.strokeStyle = "rgba(255,155,155,255)"//this.clr;
	}
    ctx.fillStyle = this.clr;
    ctx.beginPath();
	ctx.arc(this.location.x, this.location.y, this.rad, 0, 2 * Math.PI);
	ctx.stroke();

  }

// Move the Mover in a random direction
Mover.prototype.update = function(){
    //if(!game.gamePaused){
    //  this.velocity.setMagnitude(Math.random()*4-8);
    //}
  }

// When a Mover hits an edge of the canvas, it wraps around to the opposite edge.
Mover.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if(this.location.x > canvas.width)  this.velocity.multiply(-1); // wrap around from right to left
    if(this.location.x < 0)  this.velocity.multiply(-1); // wrap around from left to right
    if(this.location.y > canvas.height)  this.velocity.multiply(-1); // wrap around from bottom to top
    if(this.location.y < 0)  this.velocity.multiply(-1); // wrap around from top to bottom
  }
