tf.setBackend("cpu");

// The number of birds in each population
const totalPopulation = 300;

// Birds currently alived
let aliveBirds = [];

// all the birds of the current generation
let allBirds = [];

// Array which holds all the pipes on the screen
let pipes = [];

let frameCounter = 0;

// Current generation number
let generation = 1;

let generationSpan;

let context;

async function init() {
  await preload();
  setup();
  draw();
}

function loop() {
  requestAnimationFrame(() => {
    draw();
    loop();
  });
}

window.addEventListener("load", () => {
  init();
});

async function preload() {
  birdImg = await loadImage("assets/bird.png");
  pipeTopImg = await loadImage("assets/pipeUp.png");
  pipeDownImg = await loadImage("assets/pipeDown.png");
  bg = await loadImage("assets/bg.png");
  groundImg = await loadImage("assets/ground.png");
}

function setup() {
  width = bg.width;
  height = bg.height;

  canvas = createCanvas(bg.width, bg.height);
  context = canvas.getContext("2d");

  generationSpan = document.querySelector("#generation");
  generationSpan.textContent = generation;

  const sketchDiv = document.getElementById("sketch");
  sketchDiv.appendChild(canvas);
  for (let i = 0; i < totalPopulation; i++) {
    let bird = new Bird();
    aliveBirds[i] = bird;
    allBirds[i] = bird;
  }
}

function draw() {
  image(bg, 0, 0);

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    if (pipes[i].checkOffScreen()) {
      pipes.splice(i, 1);
    }
  }

  for (let i = aliveBirds.length - 1; i >= 0; i--) {
    let bird = aliveBirds[i];
    bird.chooseAction(pipes);
    bird.update();
    for (let j = 0; j < pipes.length; j++) {
      if (pipes[j].checkCollision(bird)) {
        aliveBirds.splice(i, 1);
        break;
      }
    }
    if (bird.bottomTopCollision()) {
      aliveBirds.splice(i, 1);
    }
  }

  if (frameCounter % 50 === 0) {
    pipes.push(new Pipe());
  }

  frameCounter++;

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].show();
  }
  for (let i = 0; i < aliveBirds.length; i++) {
    aliveBirds[i].show();
  }
  if (aliveBirds.length == 0) {
    generation++;
    generationSpan.textContent = generation;
    createNextGeneration();
  }

  image(groundImg, 0, height - groundImg.height);

  requestAnimationFrame(() => {
    draw();
  });
}
