

//  Mover constructor function +++++++++++++++++++++++++++++

function Beatle(x,y){
	this.type = "BEATLE"
	this.r=Math.random()*15
	this.g=Math.random()*15
	this.b=Math.random()*255
	this.clr = "rgba(" +this.r + "," + this.g + "," + this.b + ",255)";
	this.loc = new JSVector(x,y);
	this.radius = 25;
	this.velocity = new JSVector(0.4,0.04);
	this.acceleration = new JSVector(0.00,0.00);
	this.particles = [];
	this.poison = false;
	this.dead = false;
	this.target = Math.floor(Math.random()*50);
	//this.crackle = new JSVector(0.0000001,0.00000001);
	//this.pop = new JSVector(-0.0000001,-0.00000001);
	
}
Beatle.prototype.applyForce = function(force) {
	this.acceleration.add(force);
}

Beatle.prototype.seek = function(target) {
	desired = new JSVector.subGetNew(target,this.loc);
	//desired.normalize();
	desired.setMagnitude(this.maxSpeed);
	steer = new JSVector.subGetNew(desired, this.velocity);
	steer.limit(this.maxForce);
	return steer;
}

Beatle.prototype.run = function(){
	this.radius -= 0.02;
	if(this.dead==false){
		
	if(this.radius > 60) {
			this.radius = 30;
			game.objects.push((new Beatle(this.loc.x,this.loc.y)));
	}
	//this.movement = new JSVector.subGetNew(this.mover,this.loc);
	//this.movement.normalize();
	//this.movement.setMagnitude(0.4);
	//if(Math.random() < 0.2) {
	if(this.radius > 40) {
		this.particles.push(new Flame(this.loc.x,this.loc.y,Math.random()*8-4,Math.random()*8-4,40,(this.radius+1)/4));
	}
	
	if(this.poison == false) {
		this.particles.push(new Flame(this.loc.x,this.loc.y,this.velocity.x*((this.radius+1)/7),this.velocity.y*((this.radius+1)/7),40,(this.radius+1)/4));
	}
	
	else {
		this.velocity.x = Math.random()-0.5;
		this.velocity.y = Math.random()-0.5;
		this.particles.push(new Flame(this.loc.x,this.loc.y,Math.random()-0.5,Math.random()-0.5,40,5));
		if(this.radius > 2) {
			this.radius-= 0.2;
		}
		if(this.radius < 5) {
			this.dead = true;
			game.objects.push(new Toxin(this.loc.x,this.loc.y,0.3,0.3,10,2));
		}
		
		this.r+=0.5
		this.g-=0.5
		this.b+=0.5
		this.velocity.setDirection(Math.random()*2*Math.PI);
		this.clr = "rgba(" + this.r + "," + this.g + "," + this.b + ",255)";
	}
	if(this.radius < 5) {
			this.dead = true;
	}
	let list = game.objects;
	let ran = false;
	for(var i = 0; i < list.length; i++) {
		//console.log("a");
		
		if(list[i].type == "SNAKE") {
			let d = this.loc.distance(list[i].loc);
			if (d > list[i].radius*40 && d<300) {
				let diff = JSVector.subGetNew(this.loc,list[i].loc);
				diff.normalize();
				diff.multiply(0.3);
				diff.limit(6);
				this.applyForce(diff);
				
			}
			if ((d<list[i].radius*40)) {
				this.velocity.multiply(0.2);
				this.velocity.setDirection(0);
				this.acceleration.multiply(0.2);
				
				
				//this.b += 5;
				//this.clr = "rgba(" + this.rA + "," + this.g + "," + this.b + ",255)";
			}
			
			
		}
		if(list[i].type == "TOXIN") {
			for(var j = 0; j < list[i].orbiters.length;j++){
				let d = this.loc.distance(list[i].orbiters[j].loc);
				if(d<(90+this.radius)) {
						this.poison = true;
				}
				if(d < 200+this.radius) {
						let diff = JSVector.subGetNew(this.loc,list[i].orbiters[j].loc);
						diff.normalize();
						diff.multiply(0.2);
						diff.limit(0.5);
						this.applyForce(diff);
						

				}
				
			}
		}
		if(list[i].type == "FLOCK" && ran == false) {
			if(list[i].automobiles.length > 2) {
				
				if (this.target > (list[i].automobiles.length -1)) {
					this.target = 0;
				}
				let d = Math.sqrt((this.loc.x-list[i].automobiles[this.target].location.x)*(this.loc.x-list[i].automobiles[this.target].location.x) + (this.loc.y-list[i].automobiles[this.target].location.y)*(this.loc.y-list[i].automobiles[this.target].location.y));
				if(d > 50){
					let tard = new JSVector.subGetNew(list[i].automobiles[this.target].location,this.loc);
					tard.limit(5);
					let steer = new JSVector.subGetNew(tard,this.velocity);
					steer.limit(0.2);
					this.acceleration.add(steer);
					ran = true;
					//tard.limit(12);
					//this.loc.add(tard);
				}
				
				if(d > 300) {
					if (this.target < list[i].automobiles.length-1) {
						this.target += 1;
					}
					
				}
			
				if(list[i].automobiles[this.target].eaten == true) {
					
					this.target += 1;
				}
				
				
				
			}
		
			
		}
		
		
	}
	
	
	for(var i = 0; i < this.particles.length; i++) {
		if(this.particles[i].lifeTime < 0) {
			this.particles.splice(1,i);
		}
		
	}
	for(var i = 0; i < this.particles.length; i++) {
		
		this.particles[i].run();
		
	}
	this.loc.add(this.velocity);
	this.acceleration.limit((this.radius+1)/4);
	this.velocity.add(this.acceleration);
	//this.acceleration.add(this.jerk);
	//this.jerk.add(this.crackle);
	//this.crackle.add(this.pop);
	//}
	
	//this.render();

	
	
	this.checkEdges();
	this.acceleration.multiply(0);
	this.render();
	}
			
}

Beatle.prototype.render = function(){
    let ctx = game.ctx;
	//ctx.fillRect(25, 255, 100, 100);
	
	ctx.strokeStyle = this.clr;
	ctx.fillStyle = this.clr;
	ctx.lineWidth = 2;
	//
	if(Math.random() < 0.01) {
		this.acceleration.x = Math.random()*0.01-0.005;
		this.acceleration.y = Math.random()*0.01-0.005;	
	}
	
	ctx.save();
	ctx.beginPath();
	//ctx.translate(this.loc.x,this.loc.y);
	
	ctx.lineWidth = 20;
	ctx.arc(this.loc.x, this.loc.y, this.radius, Math.PI *2, 0, false);
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.translate(this.loc.x,this.loc.y);
	ctx.rotate(this.velocity.getDirection());
	ctx.lineTo(0,0);
	ctx.arc(this.radius*5, -this.radius, this.radius/4, Math.PI *2, 0, false);
	ctx.stroke();
	ctx.beginPath();
	//ctx.lineTo(0,0);
	ctx.arc(this.radius*5, this.radius, this.radius/4, Math.PI *2, 0, false);
	ctx.lineTo(0,0);
	//ctx.lineTo(50, -100)
	
	//ctx.fill();
	//ctx.lineTo(0,0);
	ctx.stroke();
	ctx.restore();
	
	//console.log('head at' + this.loc.x + ' ' + this.loc.y);
	//console.log('segment at' + this.segments[0].x + ' ' + this.segments[0].y);
	//ctx.fill();
	//ctx.lineCap = "round";


	//ctx.stroke();

	//
 }

Beatle.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if(this.loc.x > canvas.width +50)  this.loc.x = -50; // wrap around from right to left
    if(this.loc.x < -50)  this.loc.x = canvas.width+50; // wrap around from left to right
    if(this.loc.y > canvas.height+50)  this.loc.y = -50; // wrap around from bottom to top
    if(this.loc.y < -50)  this.loc.y = canvas.height+50; // wrap around from top to bottom
  }
