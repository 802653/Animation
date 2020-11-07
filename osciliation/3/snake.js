

//  Mover constructor function +++++++++++++++++++++++++++++

function Snake(amount, snakeRad, radDistance){
	this.segments = [];
	this.radius = 15;
	this.amount = 2;
	this.snakeRad = 150;
	this.distance = radDistance;
	this.loc = new JSVector(500,500);
	this.velocity = new JSVector(0,0);
	for (var i = 0; i < amount; i++) {
		this.segments[i] = new JSVector(777,777);
		console.log(this.segments[i]);
	}
	this.segments[0] = this.loc
}

Snake.prototype.run = function(){
	//this.movement = new JSVector.subGetNew(this.mover,this.loc);
	//this.movement.normalize();
	//this.movement.setMagnitude(0.4);
	//if(Math.random() < 0.02) {
		this.loc.add(this.velocity);
		
		//this.movement.setMagnitude(this.distance);
		//this.movement.setDirection(this.mover.getDirection());
		//this.loc = new JSVector.addGetNew(this.movement,this.mover);
		for (var i = 1; i < this.amount; i++) {

				//console.log(this.segments[i]);
				let movement = new JSVector.subGetNew(this.segments[i-1],this.segments[i]);
				
				movement.setMagnitude(4);
				//this.movement.setDirection(this.velocity.getDirection());
				//this.segments[i] = JSVector.addGetNew(this.segments[i],movement);
				//this.segments[i] = JSVector.subGetNew(movement,this.segments[i-1]); 
				this.segments[i] = movement;
				//console.log(this.segments[1]);
			
			
		}
	//}
	this.render();

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
		
		ctx.arc(this.segments[i].x, this.segments[i].y, this.radius-(3*i), Math.PI *2, 0, false);
		//ctx.lineTo(0,0);
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
