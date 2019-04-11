const app = () => {
  const song = document.querySelector(".music");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //Sounds
  const sounds = document.querySelectorAll(".sound-picker button");

  //Time display
  const timeDisplay = document.querySelector(".time-display");

  //Lenfth of the outline
  const outlineLength = outline.getTotalLength();

  //Duration
  let tempDur = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //Sounds - Play
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //Stop and play
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  //Animated circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = tempDur - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
  };
};

app();
