

//  Mover constructor function +++++++++++++++++++++++++++++

function Orbiter(mover, orbiterRad, orbitRad, angle, angleVel, clr){
	this.mover = mover;
	this.radius = orbiterRad;
	this.rotator = new JSVector(orbitRad,0);
	this.rotator.setDirection(angle);
	this.location = new JSVector.addGetNew(this.mover,this.rotator);
	this.angleVel = angleVel;
	this.clr=clr;
}
Mover.prototype.update = function(){
	this.rotator.rotate(angleVel);
	this.location = JSVector.addGetNew(this.mover,this.rotator);
	
}

Mover.prototype.render = function(){
    let ctx = game.ctx;
    ctx.fillStyle = this.clr;
    ctx.beginPath();
	ctx.arc(this.location.x, this.location.y, this.rad, 0, 2 * Math.PI);
	ctx.stroke();

  }

