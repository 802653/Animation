

//  Vehicle constructor function +++++++++++++++++++++++++++++

function Vehicle(x, y, dx, dy, rad){
	this.location = new JSVector(x,y);
    this.velocity = new JSVector(0,0);
	this.acceleration = new JSVector(0,0);
	this.rad = rad;
	this.clr = "rgba(255,155,155,255)";

	this.r = 5.0;
	this.maxForce =0.01;
	this.maxSpeed =2;
	//this.seek( new JSVector(400,400) );
	
	
}

  //  placing methods in the prototype (every Vehicle shares functions)

Vehicle.prototype.run = function(Vehicles){
	
	
	this.flock(Vehicles);
	
	this.velocity.add(this.acceleration);
    
	//this.velocity.limit(this.maxSpeed);
	
	this.location.add(this.velocity);
	
	//this.update();
	
	this.render();
	//this.acceleration.multiply(0);
	//drag force
	//this.velocity.x += -0.00001 * 2 * 3.1415 * this.rad *  this.velocity.x
	//this.velocity.y += -0.00001 * 2 * 3.1415 * this.rad * this.velocity.y
	
}

Vehicle.prototype.applyForce = function(force) {
	this.acceleration.add(force);
}

Vehicle.prototype.seek = function(target) {
	desired = new JSVector.subGetNew(target,this.location);
	//desired.normalize();
	desired.setMagnitude(this.maxSpeed);
	steer = new JSVector.subGetNew(desired, this.velocity);
	steer.limit(this.maxForce);
	return steer;
}

Vehicle.prototype.seperate = function(Vehicles) {
	let desiredSeperation = 5.0;
	let steer = new JSVector(0,0);
	let count = 0;
	
	for(let i = 0; i < Vehicles.length; i++) {
		let d = this.location.distance(Vehicles[i].location);
		
		if ((d>0) && (d < desiredSeperation)) {
			let diff = JSVector.subGetNew(this.location,Vehicles[i].location);
			diff.normalize();
			diff.divide(d);
			steer.add(diff);
			count++;	
		}
	}
	
	if (count > 0) {
		steer.divide(count);
	}
	
	if(steer.getMagnitude() > 0) {
		steer.normalize();
		steer.multiply(this.maxSpeed);
		steer.sub(this.velocity);
		steer.limit(this.maxForce);
		
	}
	
	return steer;
	
}

Vehicle.prototype.cohesion = function(Vehicles) {
	let neighborDistance = 25;
	let sum = new JSVector(0,0);
	let count = 0;
	for( let i = 0; i < Vehicles.length;i++) {
		let d = this.location.distance(Vehicles[i].location);
		if((d>0)&&(d<neighborDistance)) {
			sum.add(Vehicles[i].location);
			count++;
			
		}
		if(count >0 ) {
			sum.divide(count);
			return this.seek(sum);
			
		} else {
			return new JSVector(0,0);
		}
	}
	
}

Vehicle.prototype.align = function(Vehicles) {
	let neighborDistance = 25;
	let sum = new JSVector(0,0);
	let count = 0;
	for(let i = 0; i < Vehicles.length;i++) {
		let d = this.location.distance(Vehicles[i].location);
		if((d>0)&&(d < neighborDistance)) {
			sum.add(Vehicles[i].velocity);
			count++;
			
		}
	}
	if (count > 0) {
		sum.divide(count);
		sum.normalize();
		sum.multiply(this.maxSpeed);
		let steer = JSVector.subGetNew(sum,this.velocity);
		steer.limit(this.maxForce);
		return steer;
	} else {
		return new JSVector(0,0);
		
	}
	
	
}

Vehicle.prototype.flock = function(Vehicles) {
	let sep = this.seperate(Vehicles);
	let ali = this.align(Vehicles);
	let coh = this.cohesion(Vehicles);
	
	sep.multiply(1.5);
	ali.multiply(1.0);
	coh.multiply(1.0);
	
	this.applyForce(sep);
	this.applyForce(ali);
	this.applyForce(coh);
	
	
}


// draw the Vehicle on the canvas
Vehicle.prototype.render = function(){
    let ctx = game.ctx;
    // color depends on whether this Vehicle overlaps any oher Vehicle

	ctx.strokeStyle = "rgba(155,155,255,255)"//this.clr;

    ctx.fillStyle = this.clr;
    ctx.beginPath();
	ctx.arc(this.location.x, this.location.y, this.rad, 0, 2 * Math.PI);
	ctx.stroke();

 }

// Move the Vehicle in a random direction


// When a Vehicle hits an edge of the canvas, it wraps around to the opposite edge.
Vehicle.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if(this.location.x > canvas.width)  this.velocity.x = this.velocity.x * -1; // wrap around from right to left
    if(this.location.x < 0)  this.velocity.x = this.velocity.x * -1; // wrap around from left to right
    if(this.location.y > canvas.height)  this.velocity.y = this.velocity.y * -1; // wrap around from bottom to top
    if(this.location.y < 0)  this.velocity.y = this.velocity.y * -1; // wrap around from top to bottom
  }
