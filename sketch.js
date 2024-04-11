let img1;
let img2;
let eggs = [];

let timer = 50;

let eggCount = 0;

let eggimg;

let missedEgg = 0;

function preload() {
  eggimg = loadImage("easteregg3.png");
  img1 = loadImage("basket.jpg");
  img2 = loadImage("background.png");
}

function setup() {
  var canvas = createCanvas(600, 400);
  canvas.parent("project");
  noCursor(); //this will hide the cursor
}

function draw() {
  background(220);
  imageMode(CORNER);
  image(img2, 0, 0, width, height);

  imageMode(CENTER);
  image(img1, mouseX, 350, 110, 100);
  for (let i = 0; i < eggs.length; i++) {
    eggs[i].show();
    eggs[i].move();
    eggs[i].overlap(mouseX, 350); //350 for the y axis

    //if the egg is off screen, delete egg and add missed egg
    if (eggs[i].offScreen()) {
      eggs.splice(0, 1);
      missedEgg++;
    }
  }

  //triggers the game over when missing an egg
  if (missedEgg >= 1) {
    eggOver();
  }

  //console.log(missedEgg);

  collectegg();
  eggspawner();
  eggCounter();

  timer--;
}

class Egg {
  constructor(tempX, tempY, tempR, tempSpeed) {
    this.x = tempX;
    this.y = tempY;
    this.r = tempR;
    this.speed = tempSpeed;
  }

  show() {
    noStroke();
    fill(185, 150, 0);
    //ellipse(this.x, this.y, this.r);
    imageMode(CENTER); //make the image centered
    image(eggimg, this.x, this.y, this.r, this.r);
  }

  overlap(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < 25) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    this.y = this.y + this.speed;
  }

  //check if the egg goes off screen
  offScreen() {
    if (this.y >= height) {
      return true;
    }
  }
}

function collectegg() {
  for (let i = 0; i < eggs.length; i++) {
    //350 for the y axis
    if (eggs[i].overlap(mouseX, 350)) {
      eggs.splice(i, 1);
      eggCount++;
    }
  }
}

function eggspawner() {
  if (timer < 0) {
    let e = new Egg(random(width), 0, 50, 3);
    eggs.push(e);

    timer = random(30, 80); // added some varience with the timer!
  }
}

function eggCounter() {
  fill(0);
  textSize(20);
  text("Total Eggs = " + eggCount, 25, 375);
}

//game over function
function eggOver() {
  background(0, 0, 0);
  textAlign(CENTER);
  text("It's Egg-over for You!", width / 2, height / 2);
  text("Total Eggs Collected:" + " " + eggCount, width / 2, height / 2 + 40);
}
