function Game(){
    // get the canvas as a property of the game
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
    this.canvas = document.getElementById('canvas');
    // get the context
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    this.ctx = this.canvas.getContext('2d'); // This is the context

    // setup 6 sliders
    let updateSlider = function(e) {    // update event handler
        e.target.display.textContent = e.target.value;
    }
    for(i = 1; i <= 6; i++){    // for six sliders
        // use bracket notation to access slider properties of 'this'
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors
        let sliderId = "slider" + i;    // "slider1", "slider2", etc
        let slider = this[sliderId] = document.getElementById(sliderId);
        // each slider has a text field to display its value
        slider.display = document.getElementById('s' + i +'value'); // "s1value", "s2value", etc
        slider.display.textContent = slider.value;  // display its current value
        // add event handler to update display
        slider.addEventListener('input',updateSlider);  // update display value when it changes
    }
	this.objects = [];  
	this.objects.push(new Snake(25,5,20));
	this.objects.push(new Snake(25,5,20));
	this.objects.push(new Flock(55));
	this.objects.push(new Beatle(1000,1000));
	//this.objects.push(new Beatle());
	//this.objects.push(new Beatle());
	this.objects.push(new Toxin(700,200,0.3,0.3,30,2));
	////this.objects.push(new Toxin(700,200,0.3,0.3,30,3));
	this.objects.push(new Toxin(700,500,0.3,-0.3,20,10));

	this.objects.push(new Toxin(700,200,0.3,0.3,30,15));
	this.objects.push(new Toxin(700,500,0.3,-0.3,20,4));

	//this.objects.push(new Toxin(700,500,0.3,-0.3,20,1));
	
} //++++++++++++++++++++++  end Game


// function to run the game each animation cycle
Game.prototype.run = function(){
	let numPredators = 0;
	for(let i=0; i<this.objects.length;i++) {
		if (this.objects[i]!= null) {
			this.objects[i].run();
			if(this.objects[i].type=="BEATLE") {
				if(this.objects[i].dead == false) {
					numPredators++;
				}
			}
		}
			
	}
	if(numPredators == 0) {
		this.objects.push(new Beatle(Math.random()*1000+100,Math.random()*800+100));
		
	}
	
}
