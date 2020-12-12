

//  Vehicle constructor function +++++++++++++++++++++++++++++

function Vehicle(x, y, dx, dy, rad){
	this.segments = [];
	this.location = new JSVector(x,y);
    this.velocity = new JSVector(0,0);
	this.acceleration = new JSVector(0,0);
	this.rad = rad;
	this.rA = Math.random()*255
	this.g = Math.random()*100
	this.b = Math.random()*255
	this.clr = "rgba(" + this.rA + "," + this.g + "," + this.b + ",255)";
	this.amount = 17
	this.r = 8;
	this.electricTime = 0;
	this.maxForce =0.01;
	this.eaten = false;
	this.maxSpeed =2;
	this.dead = false;
	//this.seek( new JSVector(400,400) );
	for (var i = 1; i < this.amount+1; i++) {
		this.segments[i] = new JSVector(0,0);
		//console.log(this.segments[i]);
	}
	this.segments[0] = this.location
	this.poison = false;
}

  //  placing methods in the prototype (every Vehicle shares functions)

Vehicle.prototype.run = function(Vehicles){
	if(this.eaten == false) {
		if(this.dead == true) {
			let list = game.objects;

		
			for(var i = 0; i < list.length; i++) {
			
				if(list[i].type == "BEATLE") {
					
								
						let d = this.location.distance(list[i].loc);
						
						if(d < 150+ list[i].radius) {
							
							this.eaten = true;
							list[i].radius+=1;

						}
							
						
					
				}
				
			}
			
		}
		if(this.dead == false) {
			this.maxForce =document.getElementById("slider3").value;
			
			this.maxSpeed =document.getElementById("slider4").value;
			if(this.electricTime > -1) { this.electricTime--; }
			if(this.electricTime < 1) {
				this.flock(Vehicles);
			}
			else if(this.electricTime > 20) {
				this.velocity.setDirection(50);
			}
			if(this.poison == true) {
				this.r -= 0.01;	
				this.rA += 4;
				this.g -= 4;
				this.b += 4;			
				if(this.r < 2) {
					this.dead = true;
				}
				this.velocity.multiply(0.05);
				this.acceleration.multiply(0.05);
			}
			if(this.electricTime > 20) {
				this.rA -= 0.8;
				this.g -= 0.8;
				this.b -= 0.8;
				this.clr = "rgba(" + this.rA + "," + this.g + "," + this.b + ",255)";
				this.velocity.setDirection(Math.random()*Math.PI*2);
				this.velocity.multiply(1.0001);
				//this.velocity.multiply(5);
				//console.log('yes');
			}
			if(this.rA < -50) {
				this.dead = true;
				
			}
			if(this.g > 120) {
				this.velocity.limit(1);
				this.g--;
				this.b--;
				
			}
			//if(this.electricTime >
			
				for (var i = 1; i < this.amount+1; i++) {

							//console.log(this.segments[i]);

							//let x = 15 * Math.cos(i * 40 + Math.PI * 2 * game.frameCount / 20);
							let movement = new JSVector.subGetNew(this.segments[i],this.segments[i-1]);
							
							

							movement.setMagnitude(6);
							
							
							//movement.setDirection(this.segments[i].angleBetween(this.segments[i-1]));
							//movement.setDirection(this.velocity.getDirection());
							//this.segments[i].add(movement);
							//his.segments[i] = JSVector.subGetNew(movement,this.segments[i-1]); 
							if(this.poison == false) {
								this.segments[i] = JSVector.addGetNew(this.segments[i-1],movement);
							}
							else {
								let random = new JSVector(Math.random()-0.5,Math.random()-0.5);
								this.segments[i].add(random);
							}
							//console.log(this.segments[i].distance(this.segments[i-1]));
							//console.log(this.segments[1]);
						
						
					}
			

			
			this.velocity.add(this.acceleration);
			
			//this.velocity.limit(this.maxSpeed);
			
			this.location.add(this.velocity);
			
			//this.update();
			
			this.acceleration.multiply(0);
			
			this.checkEdges();
			this.checkCollisions();
		}
		this.render();
	}
	//this.acceleration.multiply(0);
	//drag force
	//this.velocity.x += -0.00001 * 2 * 3.1415 * this.rad *  this.velocity.x
	//this.velocity.y += -0.00001 * 2 * 3.1415 * this.rad * this.velocity.y
	
}

Vehicle.prototype.checkCollisions = function() {
	let list = game.objects;

	
	for(var i = 0; i < list.length; i++) {
	
		if(list[i].type == "BEATLE") {
			
		
			for(var b = 0; b < list[i].particles.length; b++) {
				
				let d = Math.sqrt((this.location.x-list[i].particles[b].location.x)*(this.location.x-list[i].particles[b].location.x) + (this.location.y-list[i].particles[b].location.y)*(this.location.y-list[i].particles[b].location.y));
				
				if(d < 45 + list[i].particles[b].radius) {
					this.electricTime = this.electricTime+list[i].particles[b].radius;

				}
					
				
			}
		}
	}
	
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
	let desiredSeperation = document.getElementById("slider2").value;
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
	let neighborDistance = document.getElementById("slider1").value;
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
	let neighborDistance = document.getElementById("slider1").value;
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
	
	sep.multiply(4.2*Math.random());
	ali.multiply(3.8*Math.random());
	coh.multiply(3.4*Math.random());
	
	this.applyForce(sep);
	this.applyForce(ali);
	this.applyForce(coh);
	
	let list = game.objects;
	let sum = 0;
	for(var i = 0; i < list.length; i++) {
		//console.log("a");
		
		if(list[i].type == "TOXIN") {
			for(var j = 0; j < list[i].orbiters.length;j++){
				for(var z = 0; z < list[i].orbiters[j].particles.length;z++) {
					let d = this.location.distance(list[i].orbiters[j].particles[z].location);
					if(d<50) {
						this.poison = true;
					}
					if(d < 200) {
						let diff = JSVector.subGetNew(this.location,list[i].orbiters[j].particles[z].location);
						diff.normalize();
						diff.multiply(0.3);
						diff.limit(0.5);
						this.applyForce(diff);
					}
				}
			}
		}
		
		if(list[i].type == "BEATLE") {
			let d = this.location.distance(list[i].loc);
			if ((d<400 && this.electricTime < 3)) {
				let diff = JSVector.subGetNew(this.location,list[i].loc);
				diff.normalize();
				diff.multiply(0.6);
				//diff.limit(6);
				diff.limit(0.5);
				this.applyForce(diff);
			}
			
			
		}
		
		if(list[i].type == "SNAKE") {
			let d = this.location.distance(list[i].loc);
			if ((d<list[i].radius*40)) {
				this.velocity.multiply(0.2);
				this.acceleration.multiply(0.2);
				this.g += 3;
				this.b += 5;
				//this.b += 5;
				this.clr = "rgba(" + this.rA + "," + this.g + "," + this.b + ",255)";
			}
			
			
		}
		
	}
	
	
}


// draw the Vehicle on the canvas
Vehicle.prototype.render = function(){
    let ctx = game.ctx;
    // color depends on whether this Vehicle overlaps any oher Vehicle

	ctx.strokeStyle = this.clr;

    ctx.fillStyle = this.clr;

	for (var i = 0; i < this.amount; i++) {
	
		ctx.beginPath();
		
		ctx.arc(this.segments[i].x, this.segments[i].y, this.r, Math.PI *2, 0, false);
		//ctx.arc(100, 100, 50, 0, 2 * Math.PI, false);
		//ctx.lineTo(this.segments[i].x,this.segments[i].y);
		ctx.stroke();


		//console.log('help');

		
	}
    ctx.beginPath();
	//ctx.arc(this.location.x, this.location.y, this.rad, 0, 2 * Math.PI);
	ctx.stroke();
	

 }

// Move the Vehicle in a random direction


// When a Vehicle hits an edge of the canvas, it wraps around to the opposite edge.
Vehicle.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if(this.location.x > canvas.width +50)  this.location.x = -50; // wrap around from right to left
    if(this.location.x < -50)  this.location.x = canvas.width+50; // wrap around from left to right
    if(this.location.y > canvas.height+50)  this.location.y = -50; // wrap around from bottom to top
    if(this.location.y < -50)  this.location.y = canvas.height+50; // wrap around from top to bottom
  }
