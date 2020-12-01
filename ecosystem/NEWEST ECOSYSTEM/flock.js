function Flock(){
	
	this.automobiles = [];
	
}

Flock.prototype.run = function(){
	
	for(let i = 0; i < this.automobiles.length; i++ ) {
		
		
		this.automobiles[i].run(this.automobiles);
		
	}

}

Flock.prototype.addV = function(b) {
	
	this.automobiles.push(b);
	
}