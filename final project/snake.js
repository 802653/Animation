

//  Mover constructor function +++++++++++++++++++++++++++++

function Snake(amount, snakeRad, radDistance){
	this.type = "SNAKE"
	this.segments = [];
	this.clr = "rgba(" + Math.random()*3 + "," + Math.random()*3 + "," + Math.random()*255 + ",255)";
	this.radius = snakeRad;
	this.amount = amount;
	this.snakeRad = radDistance;
	this.distance = radDistance;
	this.loc = new JSVector(1500,Math.random()*1080);
	this.velocity = new JSVector(0.4,0.04);
	this.acceleration = new JSVector(0.00,0.00);
	this.jerk = new JSVector(-0.000001,0.0000001);
	//this.crackle = new JSVector(0.0000001,0.00000001);
	//this.pop = new JSVector(-0.0000001,-0.00000001);
	for (var i = 1; i < this.amount+1; i++) {
		this.segments[i] = new JSVector(0,0);
		//console.log(this.segments[i]);
	}
	this.segments[0] = this.loc
	
	this.orbitAngle = Math.random() * Math.PI;
	this.orbs = 16;
	this.orbiters = [];
	
	for (let i = 0; i < this.orbs; i++) {

		let a = i * (Math.PI*2) * this.orbs + this.orbitAngle;
	    let angleVel = 1 + (this.orbs * 0.1);
		this.orbiters.push( new Mace(this.segments[0], 20, 40, a, angleVel, this.clr));
		
	}
}

Snake.prototype.run = function(){
	//this.movement = new JSVector.subGetNew(this.mover,this.loc);
	//this.movement.normalize();
	//this.movement.setMagnitude(0.4);
	//if(Math.random() < 0.2) {
	
	for (let i = 0; i < this.orbiters.length; i++) {

		let orb = this.orbiters[i];
		orb.update();
		orb.render();
	}	
		
		//this.movement.setMagnitude(this.distance);
		//this.movement.setDirection(this.mover.getDirection());
		//this.loc = new JSVector.addGetNew(this.movement,this.mover);
		for (var i = 1; i < this.amount+1; i++) {

				//console.log(this.segments[i]);

				//let x = 15 * Math.cos(i * 40 + Math.PI * 2 * game.frameCount / 20);
				let movement = new JSVector.subGetNew(this.segments[i],this.segments[i-1]);
				
				

				movement.setMagnitude(this.distance/2);
				
				
				//movement.setDirection(this.segments[i].angleBetween(this.segments[i-1]));
				//movement.setDirection(this.velocity.getDirection());
				//this.segments[i].add(movement);
				//his.segments[i] = JSVector.subGetNew(movement,this.segments[i-1]); 
				this.segments[i] = JSVector.addGetNew(this.segments[i-1],movement);
				//console.log(this.segments[i].distance(this.segments[i-1]));
				//console.log(this.segments[1]);
			
			
		}
	
	this.loc.add(this.velocity);
	this.velocity.add(this.acceleration);
	//this.acceleration.add(this.jerk);
	//this.jerk.add(this.crackle);
	//this.crackle.add(this.pop);
	//}
	this.render();
	//this.render();

	this.checkEdges();
}

Snake.prototype.render = function(){
    let ctx = game.ctx;
	//ctx.fillRect(25, 255, 100, 100);
	
	ctx.strokeStyle = this.clr;
	ctx.fillStyle = this.clr;
	ctx.lineWidth = 2;
	//
	
	
	for (var i = 0; i < this.amount; i++) {
		ctx.beginPath();
		
		ctx.arc(this.segments[i].x, this.segments[i].y, this.radius-(i/6), Math.PI *2, 0, false);
		//ctx.arc(100, 100, 50, 0, 2 * Math.PI, false);
		//ctx.lineTo(this.segments[i].x,this.segments[i].y);
		ctx.stroke();


		//console.log('help');

		
	}
	
	if(Math.random() < 0.01) {
		this.acceleration.x = Math.random()*0.01-0.005;
		this.acceleration.y = Math.random()*0.01-0.005;	
	}
	//
	ctx.beginPath();
	ctx.save();
	ctx.beginPath();
	ctx.translate(this.loc.x,this.loc.y);
	

	ctx.rotate(this.velocity.getDirection());
	ctx.lineWidth = 20;
    	ctx.rect(0, 5, 30, -5);
	ctx.fill();
	//ctx.lineTo(0,0);
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = "rgba(240,248,255,0)";
	ctx.fillStyle = "rgba(205,205,255,0.5)";
	ctx.arc(0, 0, this.radius*40, Math.PI *2, 0, false);
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	
	//console.log('head at' + this.loc.x + ' ' + this.loc.y);
	//console.log('segment at' + this.segments[0].x + ' ' + this.segments[0].y);
	//ctx.fill();
	//ctx.lineCap = "round";


	//ctx.stroke();

	//
 }

Snake.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if(this.loc.x > canvas.width)  this.velocity.x = this.velocity.x * -1; // wrap around from right to left
    if(this.loc.x < 0)  this.velocity.x = this.velocity.x * -1; // wrap around from left to right
    if(this.loc.y > canvas.height)  this.velocity.y = this.velocity.y * -1; // wrap around from bottom to top
    if(this.loc.y < 0)  this.velocity.y = this.velocity.y * -1; // wrap around from top to bottom
  }
