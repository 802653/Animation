function Particle(x,y,ax,ay,life){
	this.location = new JSVector(x,y);
	this.velocity = new JSVector(ax,ay);
	this.acceleration = new JSVector(Math.random()*3-1.5,Math.random()*3-1.5);
	this.lifeTime = life;
	this.initialLifeTime=life;
	
}

Particle.prototype.run = function(){
	//this.velocity.add(this.acceleration);
	let list = game.objects;

	
	for(var i = 0; i < list.length; i++) {
	
		if(list[i].type == "BEATLE") {
			if(list[i].dead == false) {
		
				for(var b = 0; b < list[i].particles.length; b++) {
					
					let d = Math.sqrt((this.location.x-list[i].particles[b].location.x)*(this.location.x-list[i].particles[b].location.x) + (this.location.y-list[i].particles[b].location.y)*(this.location.y-list[i].particles[b].location.y));
					
					if(d < 50) {
						this.velocity.setDirection(list[i].particles[b].velocity.getDirection());
						this.velocity.setMagnitude(10);
						//console.log('hi');

					}
						
					
				}
			}
		}
	}
	this.checkEdges();
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
	ctx.fillStyle = 'rgba(250,150,255,' +this.lifeTime/this.initialLifeTime + ')'
	//ctx.strokeStyle = 'rgba(255,155,155,' + this.lifeTime/this.initialLifeTime + ')'
	ctx.strokeStyle = 'rgba(250,150,255,' +this.lifeTime/this.initialLifeTime + ')'
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(this.location.x, this.location.y, 35, Math.PI *2, 0, false);
	ctx.fill();
	ctx.stroke();
	
	
}

Particle.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if(this.location.x > canvas.width +50)  this.location.x = -50; // wrap around from right to left
    if(this.location.x < -50)  this.location.x = canvas.width+50; // wrap around from left to right
    if(this.location.y > canvas.height+50)  this.location.y = -50; // wrap around from bottom to top
    if(this.location.y < -50)  this.location.y = canvas.height+50; // wrap around from top to bottom
  
  }