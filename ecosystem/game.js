function Game(){

    this.gamePaused = false;    // the game may be paused or not
    this.ga = new GameArea();   // create all the dom elements
    // get the canvas as a property of the game
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
    this.canvas = document.getElementById('canvas');
    // get the context
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    this.ctx = this.canvas.getContext('2d'); // This is the context

    //   create the array of bubble objects
	this.movers = [];  
	this.frameCount = 0;
    this.numMovers = 2;
	this.particleSystems = []
	//this.createMovers(this.canvas,this.numMovers);
	this.movers.push(new Flock());
	this.movers[0].addV(new Vehicle(30, 30, 0, 0, 30));
	this.movers[0].addV(new Vehicle(50, 30, 0, 0, 30));
	this.movers[0].addV(new Vehicle(80, 30, 0, 0, 30));
	this.movers[0].addV(new Vehicle(100, 30, 0, 0, 30));
	
	//this.movers.push(new Snake(25,5,20));
	//this.movers.push(new Snake(9,5,20));
	//this.movers.push(new Snake(14,5,20));
	//this.movers.push(new Snake(12,5,20));
	//this.movers.push(new Snake(8,5,20));
	//this.movers.push(new Snake(8,5,20));
	this.movers.push(new Toxin(200,200,0.3,0.3,10,5));
	this.movers.push(new Toxin(300,200,-0.3,0.3,5,8));
	this.movers.push(new Toxin(100,300,0.3,-0.3,18,2));
	this.movers.push(new Toxin(200,500,0.3,-0.3,20,4));
	//this.particles.push(new Particle());
	//this.particleSystems.push(new ParticleSystem());
	//this.movers.push(new Bubble(this.canvas.width/2, this.canvas.height/2, 0, 0, 130, clr));

    //  Add event handlers to all tile objects
    for(let i = 0; i < this.ga.tiles.length; i++){
        this.ga.tiles[i].addEventListener('mouseover', // mouseover is the name of an event
                                        function(){//  JavaScript has anonymous functions
                                          //  'this' is the listener target object: tile
                                          //  'this' does not refer to the game object
                                          this.style.backgroundColor = "#ac8fe3"
                                        },
                                        false);
        this.ga.tiles[i].addEventListener('mouseout', function(){
            this.style.backgroundColor = "#d5dee0"
          },false);
        this.ga.tiles[i].addEventListener('click', function(){
            game.gamePaused = !game.gamePaused;
            console.log("Mouse Clicked");
          },false);
    }

}//++++++++++++++++++++++  end movers constructor

// function to run the game each animation cycle
Game.prototype.run = function(){
  if(!this.gamePaused){
		this.frameCount++;
		//for(let i=0; i <this.movers.length;i++) {
			//for(let j=0; j<this.movers.length;j++) {
				//let forces = new JSVector(0,0);
				//if(i!=j) {
					//force = this.movers[j].gravity(this.movers[i])
					//force.multiply(-1);
					//this.movers[i].applyForce(force);		
				//}
			//}
			
			
		
		for(let i=0; i<this.movers.length;i++) {
			if (this.movers[i]!= null) {
					this.movers[i].run();
			}
			
		}
		for(let i=0; i<this.particleSystems.length;i++) {
			if (this.particleSystems[i].lifeTime < 0) {
					//this.particleSystems[i].prepareRemoval();
					this.particleSystems.splice(i);
			}
			
		}
		for(let i=0; i<this.particleSystems.length;i++) {
			if (this.particleSystems[i]!= null) {
					this.particleSystems[i].run();
			}
			
		}

		
	}
}

Game.prototype.createMovers = function(canvas, numMovers) {

    for(var i = 0; i < this.numMovers; i++){
        var x, y, dx, dy, diam, clr, r, g, b;
        x = Math.random()*this.canvas.width;
        y = Math.random()*this.canvas.height;
        dx = Math.random()*1-0.5;
        dy = Math.random()*1-0.5;
        diam = Math.random()*10;
		if(i==1) {
				diam =50;
		}
        r = 255;
        g = 255;
        b = 255;
		numOrbs = Math.random() * 3
        clr = "rgba(" + r + ", "+ g + ","+ b +")"

        this.movers.push(new Mover(x, y, dx, dy, diam, clr,numOrbs)); // add new bubble to array
		//this.movers.push(new Triangle(x+80, y+80, dx, dy, diam, clr)); // add new bubble to array
    }
	
	
}


