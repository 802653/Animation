function Flock(count){
	this.type = "FLOCK"
	this.automobiles = [];
	for(var i = 0; i < count; i++) {
		this.automobiles.push(new Vehicle(500+(i*2), 500+(i*3), 2, 2, 5,this,i));
	}
	this.timer = 0;
}

Flock.prototype.run = function(){
	
	for(let i = 0; i < this.automobiles.length; i++ ) {
		
		
		this.automobiles[i].run(this.automobiles);
		
	}
	this.timer++;
	if(this.timer > 500) {
		let m = Math.random()*1600+100;
		let e = Math.random()*900+100;
		for(var i = 0; i < 30; i++) {
			
			this.automobiles.push(new Vehicle(m+(i*2), e, 2, 2, 5));
		}
		this.timer = 0;
	}
	

}

Flock.prototype.addV = function(b) {
	
	this.automobiles.push(b);
	
}