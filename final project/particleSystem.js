function ParticleSystem(){
	this.location = new JSVector(250,250);
	//this.velocity = new JSVector(0.1,0.1);
	//this.acceleration = new JSVector(0.0003,0.0003);
	this.lifeTime = 1000;
	this.initialLifeTime=1000;
	this.particles = [];
	//for(var i = 0; i < particles.length; i++) {
	//	this.particles.push(new Particle());
	//}
	
}

ParticleSystem.prototype.run = function(){
	//this.velocity.add(this.acceleration);
	//this.location.add(this.velocity);
	this.lifeTime= this.lifeTime - 1;
	this.draw();
	this.particles.push(new Particle((Math.random()-0.5)*0.001,(Math.random()-0.5)*0.001));
	for(var i = 0; i < this.particles.length; i++) {
		if(this.particles.lifeTime < 0) {
			this.particles.splice(i);
		}
		
	}
	for(var i = 0; i < this.particles.length; i++) {
		
		this.particles[i].run();
		
	}
}

ParticleSystem.prototype.prepareRemoval = function(){
	//this.velocity.add(this.acceleration);
	


}

ParticleSystem.prototype.draw = function(){
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