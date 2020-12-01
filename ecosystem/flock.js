function Flock(){
	
	this.vehicles = [];
	
}

Flock.prototype.run = function(){
	
	for(let i = 0; i < this.vehicles.length; i++ ) {
	
		this.vehicles[i].run(this.vehicles);
		
	}

}

Flock.prototype.addV = function(b) {
	
	this.vehicles.push(b);
	
}