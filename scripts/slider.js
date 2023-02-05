const slider = $('.slider__list').bxSlider({
pager: false,
controls: false,  
}
);

$(".slider__arrow--left").click((e)=>{
  e.preventDefault();
  slider.goToPrevSlide();
}
);

$(".slider__arrow--right").click((e)=>{
  e.preventDefault();
  slider.goToNextSlide();
}
);