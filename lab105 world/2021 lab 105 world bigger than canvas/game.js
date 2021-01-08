function Game(){

    this.canvas1 = document.getElementById('cnv1');
    this.context1 = this.canvas1.getContext('2d');
    this.canvas2 = document.getElementById('cnv2');
    this.context2 = this.canvas2.getContext('2d');

    this.canvas1Loc = new JSVector();
	this.location = new JSVector();
	this.velocity = new JSVector();
	this.acceleration = new JSVector();
    this.world = {
        top: -1500,
        left: -2000,
        bottom: 1500,
        right: 2000,
        width: 4000,
        height: 3000
    }
    // canvas2 is scaled according to the ratio of its
    // height and width to the height and width of the world
    // so that the entire world fits within canvas2
    this.scaleX = this.canvas2.width/this.world.width;
    this.scaleY = this.canvas2.height/this.world.height;
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
    // add an event handler such that the a, s, w, d keys
    // will reposition the canvas within the world.
    window.addEventListener("keypress", function(event){
        switch(event.code){
            case "KeyW":
                if(game.location.y+100 > game.world.top)
                    game.canvas1Loc.y -= 5;
					game.acceleration.y-=1.2;
					
					
                break;
            case "KeyS":
                if(game.location.y + game.canvas1.height -100 < game.world.bottom)
                    game.canvas1Loc.y += 5;
					game.acceleration.y+=1.2;
					
                break;
            case "KeyA":
                if(game.location.x+100 > game.world.left)
                    game.canvas1Loc.x -= 5;
					game.acceleration.x-=1.2;
					
                break;
            case "KeyD":
                if(game.location.x + game.canvas1.width -100 < game.world.right)
                    game.canvas1Loc.x += 5;
					game.acceleration.x+=1.2;
					
                break;
            break;
            }
    }, false);
	this.objects = [];  

	this.objects.push(new Flock(50));

}//++++++++++++++++++++++  end game constructor


// function to run the game each animation cycle
Game.prototype.run = function(){
	//console.log(game.location.x, + " " + game.location.y);
	let ctx1 = this.context1;
    let cnv1 = this.canvas1;
	game.location.x+=game.velocity.x;
	game.location.y+=game.velocity.y;
	game.velocity.add(game.acceleration);
	
	
	if(game.acceleration.x > 0) {
		game.acceleration.x-=0.05;
	}
	if(game.acceleration.x < 0) {
		game.acceleration.x+=0.05;
	}
	if(game.acceleration.y > 0) {
		game.acceleration.y-=0.05;
	}
	if(game.acceleration.y < 0) {
		game.acceleration.y+=0.05;
	}
	
	if(game.velocity.x > 0) {
		game.velocity.x-=0.05;
	}
	if(game.velocity.x < 0) {
		game.velocity.x+=0.05;
	}
	if(game.velocity.y > 0) {
		game.velocity.y-=0.05;
	}
	if(game.velocity.y < 0) {
		game.velocity.y+=0.05;
	}
	
	
	if(game.velocity.y < 0.01 && game.velocity.y > -0.01) {
		game.velocity.y=0;
	}
	if(game.velocity.x < 0.01 && game.velocity.x > -0.01) {
		game.velocity.x=0;
	}
	
	
	
	game.acceleration.limit(4);
	game.velocity.limit(4);
	
	ctx1.restore();
	//ctx1.translate(-game.canvas1Loc.x,-game.canvas1Loc.y);
	
	ctx1.fillStyle = 'rgba(11,11,11,1)'
    ctx1.fillRect(0,0,cnv1.width,cnv1.height,1);
    let ctx2 = this.context2;
    let cnv2 = this.canvas2;
    	
	ctx2.fillStyle =  "#505070";
    ctx2.fillRect(0,0,cnv2.width,cnv2.height);
	
	ctx2.fillStyle =  "#505050";
	//ctx2.scale(this.scaleX,this.scaleY);
	//ctx2.fillRect(0,0,155,155);
	
	
	//ctx1.translate(-game.canvas1Loc.x,-game.canvas1Loc.y);
    // draw the bounds of the world in canvas1
	
    // draw the x and y axes of the world in canvas1

	
    // scale canvas2 to contain the entire world
	//ctx2.translate(this.canvas2.width/2,this.canvas2.height/2);
	//ctx2.scale(game.scaleX,game.scaleY);

	
	ctx2.beginPath();
	ctx2.moveTo(this.canvas2.width/2,0);
	ctx2.lineTo(this.canvas2.width/2,1000);
	ctx2.stroke();
	ctx2.beginPath();
	ctx2.moveTo(0,this.canvas2.height/2);
	ctx2.lineTo(1000,this.canvas2.height/2);
	ctx2.stroke();
	ctx2.beginPath();
	ctx2.moveTo(0,this.canvas2.height/2);
	
	ctx2.fillStyle = 'rgba(211,11,211,1)'
	ctx2.moveTo(0,0);
	ctx2.beginPath();
	ctx2.save();
	ctx2.translate(this.canvas2.width/2,this.canvas2.height/2);
	ctx2.scale(game.scaleX,game.scaleY);
	ctx2.rect(game.location.x, game.location.y,this.canvas2.width, this.canvas2.width);
	ctx2.stroke();
	ctx2.fill();
	ctx2.restore();
	
	
    // center the world in canvas2

    // draw the x and y axes of the world


    // draw the outline of canvas1 in canvas2

   //let numPredators = 0;
    ctx1.save();
	ctx1.translate(-game.location.x,-game.location.y);
	
	
	for(let i=0; i<this.objects.length;i++) {
		
		if (this.objects[i]!= null) {
			this.objects[i].run();
			
			//if(this.objects[i].type=="BEATLE") {
				//if(this.objects[i].dead == false) {
				//	numPredators++;
				//}
			//}
		}
			
	}
	
	//if(numPredators == 0) {
	//	this.objects.push(new Beatle(Math.random()*1000+100,Math.random()*800+100));
		
	//}
	ctx1.restore();
	
}
