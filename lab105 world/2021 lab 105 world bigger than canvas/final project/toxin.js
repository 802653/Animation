
function Toxin(x, y, dx, dy, rad,orbs){
	this.type = "TOXIN"
	this.location = new JSVector(x,y);
    this.velocity = new JSVector(dx,dy);
	this.acceleration = new JSVector(Math.random()-0.5,Math.random()-0.5);
	this.rad = rad;
	this.clr = "rgba(" + Math.random()*55 + "," + Math.random()*255 + "," + Math.random()*55 + ",255)";
	this.orbitAngle = Math.random() * Math.PI;
	this.orbs = orbs;
	this.orbiters = [];
	
	for (let i = 0; i < orbs; i++) {

		let a = i * (Math.PI*2) * orbs + this.orbitAngle;
	    let angleVel = 3 + (orbs * 0.1);
		this.orbiters.push( new Orbiter(this.location, this.rad/4, this.rad*2, a, angleVel, this.clr));
		
	}
	this.baked = Math.random()+0.2;
}

  //  placing methods in the prototype (every Toxin shares functions)
Toxin.prototype.applyForce = function(force) {
	this.acceleration.add(force);
}
Toxin.prototype.run = function(){
	let list = game.objects;

	
	for(var i = 0; i < list.length; i++) {
	
		if(list[i].type == "BEATLE") {
			
			if(list[i].dead == false ) {

				
					let d = this.location.distance(list[i].loc);
					
					if(d > 100) {
						let tard = new JSVector.subGetNew(list[i].loc,this.location);
						tard.limit(5);
						let steer = new JSVector.subGetNew(tard,this.velocity);
						steer.limit(this.baked);
						this.acceleration.add(steer);
					}
						
					
				}
			}
		}
	
	for (let i = 0; i < this.orbiters.length; i++) {

		let orb = this.orbiters[i];
		orb.update();
		orb.render();
	}
	if(Math.random() < 0.01) {
		this.acceleration.x = Math.random()*0.01-0.005;
		this.acceleration.y = Math.random()*0.01-0.005;	
	}
	this.acceleration.limit(this.baked);
	this.velocity.limit(this.baked*2);
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


// draw the Toxin on the canvas
Toxin.prototype.render = function(){
    let ctx = game.ctx;
    // color depends on whether this Toxin overlaps any oher Toxin
	ctx.strokestyle= this.clr;
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