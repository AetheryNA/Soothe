const app = () => {
  const song = document.querySelector(".music");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //Sounds
  const sounds = document.querySelectorAll(".sound-picker button");

  //Time display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");

  //Lenfth of the outline
  const outlineLength = outline.getTotalLength();

  //Duration
  let tempDur = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //Sounds - Pick a song
  sounds.forEach(sound => {
    sound.addEventListener("click", function() {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  //Sounds - Play
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //Time selection buttons
  timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      tempDur = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(tempDur / 60)}:${Math.floor(
        tempDur % 60
      )}`;
    });
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

    //Animating the Cirle
    let progress = outlineLength - (currentTime / tempDur) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //Aimating Text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= tempDur) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

app();
