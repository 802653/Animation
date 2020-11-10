

//  Mover constructor function +++++++++++++++++++++++++++++

function Snake(amount, snakeRad, radDistance){
	this.segments = [];
	this.radius = 15;
	this.amount = 15;
	this.snakeRad = 150;
	this.distance = radDistance;
	this.loc = new JSVector(250,250);
	this.velocity = new JSVector(0.9,0.1);
	this.acceleration = new JSVector(0.02,0.01);
	for (var i = 1; i < this.amount+1; i++) {
		this.segments[i] = new JSVector(200-(i*10),200-(i*10));
		//console.log(this.segments[i]);
	}
	this.segments[0] = this.loc
}

Snake.prototype.run = function(){
	//this.movement = new JSVector.subGetNew(this.mover,this.loc);
	//this.movement.normalize();
	//this.movement.setMagnitude(0.4);
	//if(Math.random() < 0.2) {
		
		
		//this.movement.setMagnitude(this.distance);
		//this.movement.setDirection(this.mover.getDirection());
		//this.loc = new JSVector.addGetNew(this.movement,this.mover);
		for (var i = 1; i < this.amount+1; i++) {

				//console.log(this.segments[i]);
				let movement = new JSVector.subGetNew(this.segments[i-1],this.segments[i]);
				
				movement.setMagnitude(this.velocity.getMagnitude());
				

				//movement.setDirection(this.segments[i].angleBetween(this.segments[i-1]));
				//movement.setDirection(this.velocity.getDirection());
				this.segments[i].add(movement);
				//his.segments[i] = JSVector.subGetNew(movement,this.segments[i-1]); 
				//this.segments[i] = JSVector.addGetNew(this.segments[i-1],movement);
				//console.log(this.segments[i].distance(this.segments[i-1]));
				//console.log(this.segments[1]);
			
			
		}
	this.loc.add(this.velocity);
	this.velocity.add(this.acceleration);
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
	ctx.strokeStyle = "rgba(255,155,155,255)"
	ctx.lineWidth = 2;
	//
	for (var i = 0; i < this.amount; i++) {
		ctx.beginPath();
		
		ctx.arc(this.segments[i].x, this.segments[i].y, this.radius-i, Math.PI *2, 0, false);
		//ctx.arc(100, 100, 50, 0, 2 * Math.PI, false);
		//ctx.lineTo(this.segments[i].x,this.segments[i].y);
		ctx.stroke();


		//console.log('help');

		
	}
	//
	ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.radius, Math.PI *2, 0, false);
	//ctx.lineTo(0,0);
	ctx.stroke();
	
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
