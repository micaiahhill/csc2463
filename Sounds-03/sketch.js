let cimg; // cannonball image
let osc,splashEnv,nosie,whooshEnv,filt,LFO;


function preload() {
  cimg = loadImage('media/cannonball.png');
}

function setup() {
  createCanvas(400, 300);
  image(cimg, 50, 50, 300, 200);

//jumping into the pool
  whooshEnv = new Tone.AmplitudeEnvelope({
    attack: 0.1, //time for volume
    decay: 0.4, // drops after attack
    sustain: 0.1,
    release: 0.3 // fade out
  }).toDestination();

  let whooshOsc = new Tone.Oscillator({
    frequency: 200,
    type: "sine"
  }).connect(whooshEnv);

  // main splash 
  splashEnv = new Tone.AmplitudeEnvelope({
    attack: 0.01,
    decay: 0.2,
    sustain: 0.2,
    release: 0.5
  }).toDestination();
  noise = new Tone.Noise("white").connect(splashEnv);

  // filtering
  filt = new Tone.Filter({
    frequency: 1000,
    type: "lowpass"
  }).toDestination();
  
  noise.connect(filt);
  // LFO to sound more  bubbly
  LFO = new Tone.LFO(2, 300, 800).start();
  LFO.connect(filt.frequency);
  osc = whooshOsc;
}

function draw() {
  background(220);
  image(cimg, 50, 50, 300, 200);
  fill(0);
  text('click to jump into the pool', 50, 270);
}

function mousePressed() {
  Tone.start();
  image(cimg, 50, 50, 300, 200);
  // giving jump 
  osc.start();
  whooshEnv.triggerAttackRelease(0.4);
  // whoosh then splash 
  setTimeout(() => {
  noise.start();
  splashEnv.triggerAttackRelease(0.5);

    // sound stop
  setTimeout(() => {
  noise.stop();
    }, 600);
  }, 300);
}