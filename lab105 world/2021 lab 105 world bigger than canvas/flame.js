function Flame(x,y,ax,ay,l,r){
	this.radius = r;
	this.location = new JSVector(x,y);
	this.velocity = new JSVector(ax+(Math.random()*1.5-0.75),ay+(Math.random()*1.5-0.75));
	this.acceleration = new JSVector((Math.random()*2.5-1.25),(Math.random()*2.5-1.25));
	this.lifeTime = l;
	this.initialLifeTime=l;

	
}

Flame.prototype.run = function(){
	//this.velocity.add(this.acceleration);
	this.location.add(this.velocity);
	this.lifeTime= this.lifeTime - 1;
	this.draw();
}

Flame.prototype.prepareRemoval = function(){

	
}

Flame.prototype.draw = function(){
	let ctx = game.ctx;
	//ctx.fillRect(25, 255, 100, 100);
	//console.log(this.lifeTime);
	//ctx.globalAlpha = this.lifeTime/this.initialLifeTime;
	ctx.strokeStyle = "rgba(155,155,155,this.lifeTime/this.initialLifeTime)"
	ctx.fillStyle = 'rgba(255,88,34,' +this.lifeTime/this.initialLifeTime + ')'
	//ctx.strokeStyle = 'rgba(255,155,155,' + this.lifeTime/this.initialLifeTime + ')'
	ctx.strokeStyle = 'rgba(255,88,34,' +this.lifeTime/this.initialLifeTime + ')'
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(this.location.x, this.location.y, this.radius, Math.PI *2, 0, false);
	ctx.lineTo(this.location.x+(Math.random()*-20), this.location.y+(Math.random()*-20), 5, Math.PI *2, 0, false);
	ctx.lineTo(this.location.x+(Math.random()*40), this.location.y+(Math.random()*40), 5, Math.PI *2, 0, false);
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = 'rgba(255,255,51,' +this.lifeTime/this.initialLifeTime + ')'
	ctx.lineTo(this.location.x+(Math.random()*-40), this.location.y+(Math.random()*-40), 5, Math.PI *2, 0, false);
	ctx.lineTo(this.location.x+(Math.random()*40), this.location.y+(Math.random()*40), 5, Math.PI *2, 0, false);
	ctx.stroke();

	
}