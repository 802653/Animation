var canvas;
var ctx;
//  intialize the Canvas and context
window.onload = init;

function init(){
  //get the canvas
  canvas = document.getElementById('canvas');
  // Set the dimensions of the canvas
  canvas.width = window.innerWidth/1.2;
  canvas.height = window.innerHeight/2;
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,24,35)';
  // get the context
  ctx = canvas.getContext('2d'); // This is the context
  animate();
}

var x, y, dx, dy, radius;
x = Math.random()*window.innerWidth/1.2;
y= Math.random()*window.innerHeight/2;
dx = Math.random()*10 - 5;
dy = Math.random()*10 - 5;
radius = 30;

function animate(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(155,180,50)';
  ctx.fillStyle = 'rgba(155,180, 50)';
  ctx.beginPath();
  for(var i =0; i< arr.length;i++) {
	ctx.arc(arr[i].x,arr[i].y,arr[i].radius,Math.PI*2, 0, false);
	ctx.fill();
	ctx.closePath();
    if(arr[i].x + arr[i].radius > canvas.width || arr[i].x < 0)  arr[i].dx = -arr[i].dx;
    if(arr[i].y + arr[i].radius> canvas.height || arr[i].y < 0)  arr[i].dy = -arr[i].dy;
    arr[i].x += arr[i].dx;
    arr[i].y += arr[i].dy;
    for(var j=0; j < arr.length; j++) {
      for(var j=0; j < arr.length; j++) {
        if (arr[i] != arr[j]) {
          distance = calculateDistance(arr[i].x,arr[i].y,arr[j].x,arr[j].y);
          if(distance <= (arr[i].radius+arr[j].radius)) {
              let vCollision = {x: arr[j].x - arr[i].x, y: arr[j].y - arr[i].y};
              let vRelativeVelocity = {x: arr[i].dx - arr[j].dx, y: arr[i].dy - arr[j].dy};
              let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
              let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

              let impulse = 2 * speed / (arr[i].mass + arr[j].mass);
              arr[i].dx -= (impulse * arr[j].mass * vCollisionNorm.x);
              arr[i].dy -= (impulse * arr[j].mass * vCollisionNorm.y);
              arr[j].dx += (impulse * arr[i].mass * vCollisionNorm.x);
              arr[j].dy += (impulse * arr[i].mass * vCollisionNorm.y);
              //squareDistance <= ((r1 + r2) * (r1 + r2))
              //arr[i].dx -= (speed * vCollisionNorm.x);
              //arr[i].dy -= (speed * vCollisionNorm.y);
              //arr[j].dx += (speed * vCollisionNorm.x);
              //arr[j].dy += (speed * vCollisionNorm.y);

            }
  		   }
		}
	  }
  }
  requestAnimationFrame(animate);
}

function calculateDistance(x1,y1,x2,y2) {
		var dx= x1-x2;
		var dy = y1-y2;
		return Math.round(Math.sqrt(dx*dx+dy*dy));

}

class ClassyBall{
    constructor(size){
      this.x = Math.random()*window.innerWidth/1.2;
      this.y= Math.random()*window.innerHeight/2;
      this.dx = Math.random()*6 - 3;
      this.dy = Math.random()*6 - 3;
      this.mass = size;
      this.radius = this.mass;

    }


 }

var arr = [], i;
var num = 0;
for(var i = 0; i < 20; i++) {
  num = Math.random()*40
	  + 5;
  if (i == 12) {num = 100;}
  arr[i] = new ClassyBall(num);

}