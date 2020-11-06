

//  Mover constructor function +++++++++++++++++++++++++++++

function Snake(mover, snakeRad, radDistance){
	this.mover = mover;
	this.distance = 30;
	this.radius = 30;
	this.loc = new JSVector(this.mover.x,this.mover.y);
}

Snake.prototype.update = function(){
	this.movement = new JSVector.subGetNew(this.loc,this.mover);
	//this.movement.normalize();
	//this.movement.multiply(0.4);
	this.loc.sub(this.movement);
	
	
}

Snake.prototype.render = function(){
    let ctx = game.ctx;
	//ctx.fillRect(25, 255, 100, 100);
	ctx.strokeStyle = this.clr;
	ctx.fillStyle = this.clr;
	//ctx.strokeStyle = "rgba(255,155,155,255)"
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.arc(this.loc.x, this.loc.y, this.radius, Math.PI *2, 0, false);
	ctx.stroke();
	ctx.fill();
	ctx.lineCap = "round";
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(this.mover.x,this.mover.y);
	ctx.lineTo(this.loc.x,this.loc.y);
	ctx.stroke();
 }

