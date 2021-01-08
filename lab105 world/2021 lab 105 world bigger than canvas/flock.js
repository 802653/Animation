function Flock(count){
	this.type = "FLOCK"
	this.automobiles = [];
	for(var i = 0; i < count; i++) {
		this.automobiles.push(new Vehicle(500+(i*2), 500+(i*3), 2, 2, 5,this,i));
	}

}

Flock.prototype.run = function(){
	
	for(let i = 0; i < this.automobiles.length; i++ ) {
		
		
		this.automobiles[i].run(this.automobiles);
		
	}
	
	

}

Flock.prototype.addV = function(b) {
	
	this.automobiles.push(b);
	
}