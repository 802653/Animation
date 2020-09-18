var canvas;
var ctx;
window.onload = init;

function init() {
	canvas=document.getElementById('cnv');
	canvas.style.border = 'solid black 2px';
	canvas.style.backgroundColor = 'rgba(0,24,35)';
	
	canvas = canvas.getContext('2d');
	game = new Game();
	animate();
	
}

function animate () {
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	game.update();
}