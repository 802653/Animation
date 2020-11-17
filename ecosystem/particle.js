function Particle(x,y,ax,ay,l){
	this.location = new JSVector(x,y);
	this.velocity = new JSVector(ax,ay);
	this.acceleration = new JSVector(0.01,0.01);
	this.lifeTime = l;
	this.initialLifeTime=l;
	
}

Particle.prototype.run = function(){
	//this.velocity.add(this.acceleration);
	this.location.add(this.velocity);
	this.lifeTime= this.lifeTime - 1;
	this.draw();
}

Particle.prototype.prepareRemoval = function(){

	
}

Particle.prototype.draw = function(){
	let ctx = game.ctx;
	//ctx.fillRect(25, 255, 100, 100);
	//console.log(this.lifeTime);
	//ctx.globalAlpha = this.lifeTime/this.initialLifeTime;
	ctx.strokeStyle = "rgba(155,155,155,this.lifeTime/this.initialLifeTime)"
	ctx.fillStyle = 'rgba(155,155,155,this.lifeTime/this.initialLifeTime)'
	//ctx.strokeStyle = 'rgba(255,155,155,' + this.lifeTime/this.initialLifeTime + ')'
	ctx.strokeStyle = 'rgba(250,150,255,' +this.lifeTime/this.initialLifeTime + ')'
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(this.location.x, this.location.y, 5, Math.PI *2, 0, false);
	ctx.stroke();
	
}