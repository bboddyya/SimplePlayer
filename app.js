const musicCont = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const prgoressCont = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const playPicture = document.querySelector("#playPicture");

const songs = [
  "Frank Zappa - The Torture Never Stops",
  "King Gizzard & The Lizard Wizard - Magenta Mountain",
  "Michael Jackson - Thriller",
];

let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerHTML = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `posters/${song}.jpg`;
}

function pauseSong() {
  musicCont.classList.remove("play");
  audio.pause();

  playPicture.src = "posters/svg/play-button.png";
}

function playSong() {
  musicCont.classList.add("play");
  audio.play();

  playPicture.src = "posters/svg/pause.png";
}

function prevSong() {
  songIndex--;
  console.log(songIndex);
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const procent = (currentTime / duration) * 100;
  progress.style.width = `${procent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicCont.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
prgoressCont.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);
