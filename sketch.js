let rad = 263;

// this class describes the properties of a single particle.
class Particle {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
  constructor(){
    var r = rad * sqrt(random());
    var theta = random() * 2 * PI
    this.x = 412 + r * cos(theta)
    this.y = 590 + r * sin(theta)
    this.r = random(1,8);
    this.xSpeed = random(-2,2);
    this.ySpeed = random(-1,1.5);
  }

// creation of a particle.
  createParticle() {
    noStroke();
    fill('rgb(240,240,240)');
    circle(this.x,this.y,this.r);
  }

// setting the particle in motion.
  moveParticle() {
    let dos = dist(this.x, this.y, 412, 590);
    if (dos >= rad) {
        this.xSpeed*=-1;
        this.ySpeed*=-1;
        }
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }
}

// an array to add multiple particles
let particles = [];

var fps = 30;

var capturer;
// the canvas capturer instance
capturer = new CCapture( {  format: 'webm',  fps,  name: 'snow_globe_webm',  quality: 100,} );

function preload(){
  img = loadImage('snowglobe_bkg_rsz.jpg');
}

function setup() {
  createCanvas(822, 1350);
  //frameRate(fps);
  //capturer.start();
  
  for(let i = 0;i<width;i++){
    particles.push(new Particle());
  }
}

function draw() {
  img.resize(822,1350);
  image(img, 0,0,img.width,img.height)
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
  }
  console.log('capturing frame');
  capturer.capture(document.getElementById('defaultCanvas0'));
  //fill('rgba(240,240,240,0.7)');
  //circle(412,590,530)
}



function mouseClicked (){
  capturer.start();
  console.log("Started capturer")

}

function keyPressed(){
  capturer.stop();
  capturer.save();
}