/*let player;
const playerContainer = $(".player");

let eventsInit = () => {
  $(".player__start").click(e => {
    e.preventDefault();
  
    if (playerContainer.hasClass("paused")) {
      player.pause();
    } else {
      player.play();
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
};*/