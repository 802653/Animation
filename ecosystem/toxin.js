
function Toxin(x, y, dx, dy, rad,orbs){
	this.location = new JSVector(x,y);
    this.velocity = new JSVector(dx,dy);
	this.acceleration = new JSVector(0,0);
	this.rad = rad;
	this.clr = "rgba(255,155,155,255)";
	this.orbitAngle = Math.random() * Math.PI;
	this.orbs = orbs;
	this.orbiters = [];
	
	for (let i = 0; i < orbs; i++) {

		let a = i * (Math.PI*2) * orbs + this.orbitAngle;
	    let angleVel = 3 + (orbs * 0.1);
		this.orbiters.push( new Orbiter(this.location, this.rad/4, this.rad*2, a, angleVel, this.clr));
		
	}
}

  //  placing methods in the prototype (every Toxin shares functions)

Toxin.prototype.run = function(){

	for (let i = 0; i < this.orbiters.length; i++) {

		let orb = this.orbiters[i];
		orb.update();
		orb.render();
	}
	this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
	this.update();
	this.render();
	this.checkEdges();
	
	this.acceleration.multiply(0);

	//drag force
	//this.velocity.x += -0.00001 * 2 * 3.1415 * this.rad *  this.velocity.x
	//this.velocity.y += -0.00001 * 2 * 3.1415 * this.rad * this.velocity.y
	
}


Toxin.prototype.gravity = function(a) {
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

// draw the Toxin on the canvas
Toxin.prototype.render = function(){
    let ctx = game.ctx;
    // color depends on whether this Toxin overlaps any oher Toxin
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

// Move the Toxin in a random direction
Toxin.prototype.update = function(){
    if(!game.gamePaused){
    }
  }

// When a Toxin hits an edge of the canvas, it wraps around to the opposite edge.
Toxin.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if(this.location.x > canvas.width)  this.velocity.x = this.velocity.x * -1; // wrap around from right to left
    if(this.location.x < 0)  this.velocity.x = this.velocity.x * -1; // wrap around from left to right
    if(this.location.y > canvas.height)  this.velocity.y = this.velocity.y * -1; // wrap around from bottom to top
    if(this.location.y < 0)  this.velocity.y = this.velocity.y * -1; // wrap around from top to bottom
  }