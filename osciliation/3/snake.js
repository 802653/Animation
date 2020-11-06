

//  Mover constructor function +++++++++++++++++++++++++++++

function Snake(mover, snakeRad, radDistance){
	this.mover = mover.location;
	this.segments = mover.snakes;
	this.radius = 5;
	this.distance = radDistance;
	this.loc = new JSVector(this.mover.x,this.mover.y);
	
}

Snake.prototype.update = function(){
	this.movement = new JSVector.subGetNew(this.mover,this.loc);
	//this.movement.normalize();
	//this.movement.setMagnitude(0.4);
	
	this.movement.setMagnitude(this.distance);
	//this.movement.setDirection(this.mover.getDirection());
	this.loc = new JSVector.addGetNew(this.movement,this.mover);
	
	
	
	
}

Snake.prototype.render = function(){
    let ctx = game.ctx;
	//ctx.fillRect(25, 255, 100, 100);
	
	ctx.strokeStyle = this.clr;
	ctx.fillStyle = this.clr;
	ctx.strokeStyle = "rgba(255,255,155,255)"
	ctx.lineWidth = 10;
	ctx.beginPath();
	ctx.arc(this.loc.x, this.loc.y, this.radius, Math.PI *2, 0, false);
	ctx.stroke();
	ctx.fill();
	ctx.lineCap = "round";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(this.mover.x,this.mover.y);

	ctx.stroke();
 }

