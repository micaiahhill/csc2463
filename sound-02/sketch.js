let synthP, filter, reverb;
let keys = {
  A: "C4",
  S: "D4",
  D: "E4",
  F: "F4",
  G: "G4",
  H: "A4",
  J: "B4",
  K: "C5",
};
let reverbSlider, filterSlider;

function setup() {
  createCanvas(400, 400);

  textAlign(CENTER, CENTER);

  // Create a poly synth with the sawtooth type
  synthP = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sawtooth" }, // 'sawtooth' produces a cool sound
    envelope: { attack: 0.1, decay: 0.2, sustain: 0.3, release: 1 },
  });

  filter = new Tone.Filter(800, "lowpass"); // smooth out the high freq
  reverb = new Tone.Reverb({ decay: 2, wet: 0.5 }); //echoing sound kinda like in a church

  synthP.chain(filter, reverb, Tone.Destination);

  // buttons for reverb and filter
  reverbSlider = createSlider(0, 1, 0.5, 0.01);
  reverbSlider.position(24, 220);
  reverbSlider.input(() => {
    reverb.wet.value = reverbSlider.value();
  });
  filterSlider = createSlider(200, 2000, 800, 10);
  filterSlider.position(24, 250);
  filterSlider.input(() => {
    filter.frequency.value = filterSlider.value();
  });
}
function draw() {
  background(200);
  textSize(16);
  text("Press keys A - K and enjoy ;)", width / 2, height / 2.5);
  textSize(13);
  text("Reverb: " + reverbSlider.value(), 34, 214);
  text("Filter: " + filterSlider.value(), 30, 245);
}

function keyPressed() {
  if (keys[key.toUpperCase()]) {
    synthP.triggerAttack(keys[key.toUpperCase()]);
  }
}

function keyReleased() {
  if (keys[key.toUpperCase()]) {
    synthP.triggerRelease(keys[key.toUpperCase()]);
  }
}
