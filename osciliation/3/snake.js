

//  Mover constructor function +++++++++++++++++++++++++++++

function Snake(mover, snakeRad, radDistance){
	this.mover = mover;
	this.radius = snakeRad;
	this.follower = new JSVector(0,0);
	this.follower.setMagnitude(snakeRad);
	this.velocity = new JSVector(0,0);
	this.follower.setDirection(this.follower.angleBetween(mover));
	this.loc = new JSVector.addGetNew(this.mover,this.follower);
	this.clr="rgba(255,155,155,255)"
}

Snake.prototype.update = function(){
	//JSVector.subGetNew(this.location, a.location); 
	
	this.follower = JSVector.subGetNew(this.follower, this.mover);

		//console.log(this.rotator);
	//this.velocity.add(this.follower);
	this.loc.add(this.follower);
	//this.loc.add(
	//console.log(this.loc);

	//console.log(this.mover);

	
	
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

