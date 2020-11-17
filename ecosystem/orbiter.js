
function Orbiter(mover, orbiterRad, orbitRad, angle, angleVel, clr){
	this.mover = mover;
	this.radius = orbiterRad;
	this.rotator = new JSVector(0,0);
	this.rotator.setMagnitude(orbitRad);
	this.particles = [];
	this.rotator.setDirection(angle);
	
	this.loc = new JSVector.addGetNew(this.mover,this.rotator);
	
	this.angleVel = angleVel;
	this.clr=clr;
}

Orbiter.prototype.update = function(){
	let vel = new JSVector(0.5,0.5);
	vel.setDirection(Math.random()*360);
	if(Math.random() < 0.01) {
		this.particles.push(new Particle(this.loc.x,this.loc.y,vel.x,vel.y,200));
	}
	this.rotator.rotate(this.angleVel);
		//console.log(this.rotator);
	this.loc = JSVector.addGetNew(this.mover,this.rotator);
	for(var i = 0; i < this.particles.length; i++) {
		if(this.particles.lifeTime < 0) {
			this.particles.splice(i);
		}
		
	}
	for(var i = 0; i < this.particles.length; i++) {
		
		this.particles[i].run();
		
	}
	//console.log(this.loc);

	//console.log(this.mover);

	
	
}

Orbiter.prototype.render = function(){
	
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
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(this.mover.x,this.mover.y);
	ctx.lineTo(this.loc.x,this.loc.y);
	ctx.stroke();


 }
