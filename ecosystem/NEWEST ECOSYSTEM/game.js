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
	this.objects.push(new Flock());
	this.objects[1].addV(new Vehicle(300, 500, 0, 0, 5));
	this.objects[1].addV(new Vehicle(320, 500, 0, 0, 5));
	this.objects[1].addV(new Vehicle(340, 500, 0, 0, 5));
	this.objects[1].addV(new Vehicle(360, 500, 0, 0, 5));
	this.objects[1].addV(new Vehicle(380, 500, 0, 0, 5));
	this.objects[1].addV(new Vehicle(400, 500, 0, 0, 5));
	this.objects[1].addV(new Vehicle(420, 500, 0, 0, 5));
	this.objects[1].addV(new Vehicle(440, 500, 0, 0, 5));
	this.objects[1].addV(new Vehicle(460, 500, 0, 0, 5));
	this.objects[1].addV(new Vehicle(480, 500, 0, 0, 5));
	this.objects[1].addV(new Vehicle(500, 510, 0, 0, 5));
	this.objects[1].addV(new Vehicle(520, 520, 0, 0, 5));
	this.objects[1].addV(new Vehicle(540, 530, 0, 0, 5));
	this.objects[1].addV(new Vehicle(560, 490, 0, 0, 5));
	this.objects[1].addV(new Vehicle(580, 480, 0, 0, 5));
	this.objects[1].addV(new Vehicle(600, 470, 0, 0, 5));
} //++++++++++++++++++++++  end Game


// function to run the game each animation cycle
Game.prototype.run = function(){
	for(let i=0; i<this.objects.length;i++) {
		if (this.objects[i]!= null) {
			this.objects[i].run();
		}
			
	}
}
