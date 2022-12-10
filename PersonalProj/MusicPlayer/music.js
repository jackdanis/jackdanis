// ---- AUDIO VISUALIZER API ---- 
let birds = [];
let flockCenter;
let keyboardTarget;

//Setup
//Updates Canvas size to match window size & checks on each frame
function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-2');
  
  flockCenter = createVector(0, 0);
  keyboardTarget = createVector(400, 200);
  
  for (let i = 0; i < 50; i++) {
     birds.push(new Bird(random(windowWidth/4) + windowWidth/4, random(windowHeight/4) + windowHeight/4));
  }
}
//Bird Behavior
class Bird {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(1, 1);

    this.maxSpeed = 4;
  }
  
  seek(target, weight) {
    let dir = p5.Vector.sub(target, this.position);
    dir.setMag(weight);
    this.velocity.add(dir);
  }
  
  flee(target, weight) {
    let dir = p5.Vector.sub(this.position, target);
    let dist = dir.mag();
    
    if (dist < 100) {
      let m = map(dist, 0, 100, 0, 1);
      dir.mult(m);
      
      let steer = p5.Vector.sub(dir, this.velocity);
      steer.limit(weight);
      this.velocity.add(steer);
    }
  }
  
  arrive(target, weight) {
    let dir = p5.Vector.sub(target, this.position);
    let dist = dir.mag();
    
    if (dist < 300) {
      let m = map(dist, 0, 300, 40, 0);
      dir.mult(m);
    }
    
    let steer = p5.Vector.sub(dir, this.velocity);
    steer.limit(weight);
    this.velocity.add(steer);
  }
  
  separate(flock, weight, minDist) {
    // sum up all of the neighbors
    let force = createVector(0,0);
    
    for (let i= 0; i < flock.length; i++) {
      let b = flock[i];
      
      let dir = p5.Vector.sub(this.position, b.position);
      let d = dir.mag();
      
      if (d < minDist) {
        force.add(dir);
      }
    }
    
    force.setMag(weight);
    this.velocity.add(force);
  }
  
  cohesion(center, weight) {
    this.arrive(center, weight);
  }
  
  update() {
    if (this.velocity.mag() > this.maxSpeed) this.velocity.setMag(this.maxSpeed);

    this.position.add(this.velocity);
  }

//Draw Triangle
draw() {
    push();

    //Sets visual behavior for birds and their shape / color
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading()- PI / 2);


    stroke(0);
    fill(255);

    triangle(-10, -10, 0, 15, 10, -10);

    pop();
  }
}


// What will be called on 'draw'
function draw() {
  //This sets up math operations so the birds know where to track the center of the Screen
  let CanWidth = windowWidth;
  let CanHeight = windowHeight;
  
  flockCenter.set(0, 0);
  for (let i = 0; i < birds.length; i++) {
    flockCenter.add(birds[i].position);
  }
  flockCenter.div(birds.length);
  
  //Makes a dot in the center of screen
  fill(0);
  circle(CanWidth/2, CanHeight/2, 15);
  fill(250);
  
  stroke(10 + noise(frameCount/ 1000) * 200, 200, 200)
  for (let i = 0; i < birds.length; i++) {
    
    let b = birds[i];
    
    // if (i < 20) {
    //   b.seek(createVector(mouseX, mouseY), 0.1)
    // }

    b.seek(createVector(CanWidth/2, CanHeight/2), 0.1)//This is the location where the birds flock 'around'
    b.flee(createVector(mouseX, mouseY), 0.5);
    b.separate(birds, 0.5, 30);
    b.cohesion(flockCenter, 0.05);

    b.update()
    b.draw();
  }
}





// -- The initial code used for this audio player was taken from https://www.geeksforgeeks.org/create-a-music-player-using-javascript/

// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
 
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
 
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
 
// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;
 
// Create the audio element for the player
let curr_track = document.createElement('audio');
 
// Define the list of tracks that have to be played
let track_list = [
  {
    name: "Mysterious",
    artist: "Mario Paint",
    image: "Image URL",
    path: "./img/Mysterious.mp3"
  }
];

function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
   
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
   
    // Update details of the track
    track_art.style.backgroundImage =
       "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
       "PLAYING " + (track_index + 1) + " OF " + track_list.length;
   
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
   
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
   
    // Apply a random background color
    // random_bg_color();
  }
   
  function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
   
    // Construct a color with the given values
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
   
    // Set the background to the new color
    document.body.style.backgroundColor = bgColor;
  }
   
  // Function to reset all values to their default
  function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }

  function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
  }
   
  function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
   
    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
    //Replace Background Image with Headphones
    document.getElementById('body').className = "subpageBG";
    //Set canvas to play

  }
   
  function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
   
    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
    //Replaces Background Image with Default Background
    document.getElementById('body').className = "mainpageBG";
    //Hide Canvas page

  }
   
  function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1)
      track_index += 1;
    else track_index = 0;
   
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }
   
  function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0)
      track_index -= 1;
    else track_index = track_list.length - 1;
     
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }

  function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100);
   
    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
  }
   
  function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
  }
   
  function seekUpdate() {
    let seekPosition = 0;
   
    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;
   
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
   
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
   
      // Display the updated duration
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }

  
// Load the first track in the tracklist
loadTrack(track_index);




