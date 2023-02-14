let player;
const playerContainer = $(".player");

let eventsInit = () => {
  $(".player__start").click(e => {
    e.preventDefault();
  
    if (playerContainer.hasClass("paused")) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });


 $(".player__playback").click(e => {
  const bar = $(e.currentTarget);
  const clickedPosition = e.originalEvent.layerX;
  
  const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
  const newPlaybackPositionSec =
    (player.getDuration() / 100) * newButtonPositionPercent;
  
  $(".player__playback-button").css({
    left: `${newButtonPositionPercent}%`
  });
  
  player.seekTo(newPlaybackPositionSec);
 });

 $(".player__splash").click(e => {
  player.playVideo();
});
};

//громкость

const playVolume = $(".player__volume");
let isMuted = false; 

$(".player__volume").click(e => {
  e.preventDefault();
  

  if (!isMuted) {
    player.unMute()
    isMuted = true
  } else {
    player.mute()
    isMuted = false
  }
});

$(".player__playback-volume").click(e => {
  const barVolume = $(e.currentTarget);
  const clickedPositionVolume = e.originalEvent.layerX;
  //const volumeInt = player.getVolume();

  
  const newButtonPositionPercentVolume = (clickedPositionVolume / barVolume.width()) * 100;
  const newPlaybackPositionSecVolume =
    (player.getVolume() / 100) * newButtonPositionPercentVolume;
  
  $(".player__volume-button").css({
    left: `${newButtonPositionPercentVolume}%`
  });
  
  player.setVolume (newButtonPositionPercentVolume);
 });


 const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);
  
  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(roundTime - minutes * 60);
  
  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }
  
  return `${minutes} : ${seconds}`;
 };


 const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();
  
  $(".player__duration-estimate").text(formatTime(durationSec));
  
  if (typeof interval !== "undefined") {
    clearInterval(interval);
  }
  
  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
      left: `${completedPercent}%`
    });
   
  
    $(".player__duration-completed").text(formatTime(completedSec));
  }, 1000);
 };

 const onPlayerStateChange = event => {
  /*
    -1 (воспроизведение видео не начато)
    0 (воспроизведение видео завершено)
    1 (воспроизведение)
    2 (пауза)
    3 (буферизация)
    5 (видео подают реплики).
  */
  switch (event.data) {
    case 0:
      playerContainer.removeClass("active");
      playerContainer.removeClass("paused");
      break;
    case 1:
      playerContainer.addClass("active");
      playerContainer.addClass("paused");
      break;
  
    case 2:
      playerContainer.removeClass("active");
      playerContainer.removeClass("paused");
      break;
  }
 };

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    height: "392",
    width: "662",
    videoId: "1_f3RcyYdfA",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 1,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
 }

  eventsInit();