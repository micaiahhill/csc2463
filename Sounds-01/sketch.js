let samples,sampler, button1 , button2 ,button3,button4, delTimeSlider, feedbackSlider,wetSlider, startContext , distSlider;

let rev = new Tone.Reverb(5).toDestination(); // gives reverb to the audio
let dist = new Tone.Distortion(0).toDestination(); // gives distortion to the audio
let del = new Tone.FeedbackDelay(0,0).toDestination(); // gives feedback delay to the audio
del.wet.value = 0.5; // how much of the delay we want to hear

function preload() {  
//  sampler = new Tone.Player("media/cat.mp3").toDestination(); // so we can send audio to our output
samples = new Tone.Players({ // this is a collection of audio files
  trumpet : "media/trumpet1.mp3",
  drum : "media/drum.mp3",
  piano : "media/piano1.mp3",
  guitar : "media/guitar.mp3"
}).connect(del) // connect the audio to the delay
}
function setup() {
  createCanvas(400, 400);
 //create a button that will play the sound
 startContext = createButton("Start Audio Context");  
  startContext.position(0,0); 
  startContext.mousePressed(startAudioContext); // start the audio context
 button1 = createButton("Play Trumpet Sample");
  button1.position(10,30);
  button2 = createButton("Play Drum Sample");
  button2.position(200,30);
  button3 = createButton("Play Piano Sample");
  button3.position(10,60);
  button4 = createButton("Play Guitar Sample");
  button4.position(200,60);
  button3.mousePressed(() =>{samples.player("piano").start();});
  button4.mousePressed(() =>{samples.player("guitar").start();});
  button1.mousePressed(() =>{samples.player("trumpet").start();});
  button2.mousePressed(() =>{samples.player("drum").start();});
  // button1.mousePressed(playSample); // connects the sample to the button
  delTimeSlider = createSlider(0,1,0,0.01); //(min , max ,starting value , dragging)
  delTimeSlider.position(10,110);
  delTimeSlider.input(()=>{del.delayTime.value = delTimeSlider.value();});
  feedbackSlider = createSlider(0,0.99,0,0.01);
  feedbackSlider.position(200,110);
  feedbackSlider.input(()=>{del.feedback.value = feedbackSlider.value();});
  distSlider = createSlider(0,1,0,0.01);
  distSlider.position(10,140);
  distSlider.input(()=>{dist.distortion = distSlider.value();});
  wetSlider = createSlider(0,1,0,0.01);
  wetSlider.position(200,140);
  wetSlider.input(()=>{del.wet.value = wetSlider.value();});

}

function draw() {
  background(220);
  text("Delay Time: "+ delTimeSlider.value(),10,105);
  text("Feedback Amount: "+ feedbackSlider.value(),200,100);
  text("Distortion Amount: "+ distSlider.value(),10,135);
  text("Reverb Wet Amount: "+ wetSlider.value(),200,135);
  text("2.Press the buttons to play the samples",10,220);
  text("3.Use the sliders to control the delay, feedback, distortion and reverb",10,240);
  text("1.Use the start audio context button to start the audio",10,200);
}



// function playSample(){
//   sampler.start();
// }
function startAudioContext() {
  if (Tone.context.state != 'running') {
    Tone.start();
    console.log("Audio Context Started")
  } else {
    console.log("Audio Context is already running")
  }
}
