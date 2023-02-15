const openItem = item => {
  const container = item.closest(".team__item");
  const contentBlock = container.find(".team__content");
  const textBlock = contentBlock.find(".team__content-block");
  const reqHeight = textBlock.height();

  container.addClass("active");
  contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
  const items = container.find('.team__content');
  const itemContainer = container.find(".team__item");

  itemContainer.removeClass("active");
  items.height(0);
}

$('.team__title').click(e =>{
  const $this = $(e.currentTarget);
  const container = $this.closest('.team');
  const elemContainer = $this.closest(".team__item");

  if (elemContainer.hasClass("active")) {
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem($this);
  }
});


;let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [55.751644, 37.600618],
   zoom: 13,
   controls: [],
 });
 
 let coords = [
     [55.75475586753862,37.621361737218315],
     [55.75119228405711,37.60671206576479],
     [55.757905298455725,37.58219594981976],
     [55.74397814711495,37.582641377300185],
   ],
   myCollection = new ymaps.GeoObjectCollection({}, {
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: './img/marker_map.svg',
     iconImageSize: [46, 57],
     iconImageOffset: [-35, -52]
   });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);;document.getElementById('openOverlay').onclick = function(event) {
  event.preventDefault();
  
  document.getElementById('overlayTemplate').classList.add('active');
  document.getElementById('body').classList.add('menu-open');
}



document.getElementById('close').onclick = function() {
  document.getElementById('overlayTemplate').classList.remove('active');
  document.getElementById('body').classList.remove('menu-open');
}



;const mesureWidth = item  => {
  let reqItemWidth = 0;
  const screenWidth = $(window).width();
  const container = item.closest(".products-menu");
  const titlesBlocks = container.find(".products-menu__title");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

  const textContainer = item.find(".products-menu__container");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if(isMobile) {
    reqItemWidth = screenWidth - titlesWidth;
  } else {
    reqItemWidth =  500;
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingRight - paddingLeft
  }

  //console.log(titlesWidth); 
  //return screenWidth - titlesWidth;
};

const closeEveryItemInContainer = container => {
  const items = container.find(".products-menu__item");
  const content = container.find(".products-menu__content");

  items.removeClass("active");
  content.width(0);
}

const open_Item = item => {
const hiddenContent = item.find(".products-menu__content");
const reqWidth = mesureWidth (item);
const textBlock = item.find(".products-menu__container");

item.addClass("active");

hiddenContent.width(reqWidth.container);
textBlock.width(reqWidth.textContainer);
}

$(".products-menu__title").on("click", e=>{
e.preventDefault();

const $this = $(e.currentTarget);
const item = $this.closest(".products-menu__item");
const itemOpened = item.hasClass ("active");
const container = $this.closest(".products-menu");

if (itemOpened) {
  closeEveryItemInContainer(container)
} else {
  closeEveryItemInContainer(container)

  open_Item(item);
}

});

$(".products-menu__close").on("click", e => {
  e.preventDefault();
  closeEveryItemInContainer($(".products-menu"));
});;const validateFields = (form, fieldsArray) => {
  fieldsArray.forEach((field) => {
    field.removeClass("input-error");
    if (field.val().trim() === "") {
      field.addClass("input-error");
    }
  });
  
  const errorFields = form.find(".input-error");

  return errorFields.length === 0;
}

$(".form").submit((e) => {
e.preventDefault();

const form = $(e.currentTarget);
const name = form.find("[name='name']");
const phone = form.find("[name='phone']");
const comment = form.find("[name='comment']");
const to = form.find("[name='to']");

const modal = $("#modal");
const content = modal.find(".modal__content");

modal.removeClass("error-modal");

const isValid = validateFields(form, [name, phone, comment, to]);

if (isValid) {
const request = $.ajax({
  url: "https://webdev-api.loftschool.com/sendmail",
  method: "post",
  //headers: { 'content-Type': 'application/json'},
  //dataType: "json",
  data: {
    name: name.val(),
    phone: phone.val(),
    comment: comment.val(),
    to: to.val(),
  }, 


error: (data) => {
}
});
request.done((data) => {
  content.text(data.message);
});
request.fail(() =>{
  content.text("Сообщение не отправлено");
  modal.addClass("error-modal");
});
/*request.fail((data) =>{
  const message = data.responseJSON.message;
  content.text(message);
  modal.addClass("error-modal");
});*/
request.always(()=>{
  $.fancybox.open({
    src:"#modal",
    type:"inline"
    });
});
}
});

$(".app-submit-btn").click((e)=>{
  e.preventDefault();

  $.fancybox.close();
}
);const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false; 

sections.first().addClass("active");

const countSectionPosition = (sectionEq) => {
const position = sectionEq * -100;

if(isNaN(position)) {
  console.error("передано неверное значение в countSectionPosition");
  return 0;
}

return position;

};

const changeMenuThemeForSection = (sectionEq) => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme");
  const activeClass = "fixed-menu--white";

  if (menuTheme === "white") {
    sideMenu.addClass(activeClass);
  }else{
    sideMenu.removeClass(activeClass);
  }
};

const resetActiveClassForItem = (items,itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const performTransition = (sectionEq) => {

  if (inScroll) return;

  const transitionOver = 1000;
  const mouseInertiaIver = 300;

  inScroll = true; 

  const position = countSectionPosition(sectionEq);

  changeMenuThemeForSection(sectionEq);

  display.css({
    transform:`translateY(${position}%)`,
  });

  resetActiveClassForItem(sections, sectionEq, "active");

  setTimeout(() =>{
    inScroll = false;
    resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");
  }, transitionOver + mouseInertiaIver
  );
};

const viewportScroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev(){
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    },
  };
};

$(window).on("wheel",(e) => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0){
    scroller.next();
      }
    
      if (deltaY < 0) {
        scroller.prev();
      }
    });

    $(window).on("keydown", e => {
      const tagName = e.target.tagName.toLowerCase();
      const userTypingInInputs = tagName === "input" || tagName === "textarea";
      const scroller = viewportScroller ();

      if (userTypingInInputs) return; 

      switch (e.keyCode) {
        case 38: 
        scroller.prev();
        break;
      
        case 40:
          scroller.next();
        break;
      }
    });


    $(".wrapper").on("touchmove", e => e.preventDefault()
); 

    $("[data-scroll-to]").click(e => {
      e.preventDefault();
    
      const $this = $(e.currentTarget);
      const target = $this.attr("data-scroll-to");
      const reqSection = $(`[data-section-id=${target}]`);
    
      performTransition(reqSection.index());
    });

    if (isMobile) {

      $("body").swipe({
    
      swipe: function (event, direction) {
        const scroller = viewportScroller();
        let scrollDirection = "";
    
        if (direction === "up") scrollDirection = "next";
        if (direction === "down") scrollDirection = "prev";
    
        scroller[scrollDirection]();
    
      },
    
    
      });
    
    }
    


;let player;
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

  eventsInit();;const slider = $('.slider__list').bxSlider({
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
);;
const findBlockByAlias = (alias) => {
return $(".reviews__item").filter((ndx, item) => {
return $(item).attr("data-linked-with") === alias;
});
};
$(".interactive-avatar__link").click(
  e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlockByAlias(target);
    const curItem = $this.closest(".reviews__switcher-item");

    itemToShow.addClass("active").siblings().removeClass("active");

    curItem.addClass("active").siblings().removeClass("active");
  }
);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY28uanMiLCJtYXAuanMiLCJtZW51LmpzIiwibWVudV9hY2NvLmpzIiwibW9kYWwuanMiLCJvcHMuanMiLCJwbGF5ZXIuanMiLCJzbGlkZXIuanMiLCJzd2l0Y2hlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0NoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDeEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JDMUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0NoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgb3Blbkl0ZW0gPSBpdGVtID0+IHtcclxuICBjb25zdCBjb250YWluZXIgPSBpdGVtLmNsb3Nlc3QoXCIudGVhbV9faXRlbVwiKTtcclxuICBjb25zdCBjb250ZW50QmxvY2sgPSBjb250YWluZXIuZmluZChcIi50ZWFtX19jb250ZW50XCIpO1xyXG4gIGNvbnN0IHRleHRCbG9jayA9IGNvbnRlbnRCbG9jay5maW5kKFwiLnRlYW1fX2NvbnRlbnQtYmxvY2tcIik7XHJcbiAgY29uc3QgcmVxSGVpZ2h0ID0gdGV4dEJsb2NrLmhlaWdodCgpO1xyXG5cclxuICBjb250YWluZXIuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgY29udGVudEJsb2NrLmhlaWdodChyZXFIZWlnaHQpO1xyXG59XHJcblxyXG5jb25zdCBjbG9zZUV2ZXJ5SXRlbSA9IGNvbnRhaW5lciA9PiB7XHJcbiAgY29uc3QgaXRlbXMgPSBjb250YWluZXIuZmluZCgnLnRlYW1fX2NvbnRlbnQnKTtcclxuICBjb25zdCBpdGVtQ29udGFpbmVyID0gY29udGFpbmVyLmZpbmQoXCIudGVhbV9faXRlbVwiKTtcclxuXHJcbiAgaXRlbUNvbnRhaW5lci5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICBpdGVtcy5oZWlnaHQoMCk7XHJcbn1cclxuXHJcbiQoJy50ZWFtX190aXRsZScpLmNsaWNrKGUgPT57XHJcbiAgY29uc3QgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgY29uc3QgY29udGFpbmVyID0gJHRoaXMuY2xvc2VzdCgnLnRlYW0nKTtcclxuICBjb25zdCBlbGVtQ29udGFpbmVyID0gJHRoaXMuY2xvc2VzdChcIi50ZWFtX19pdGVtXCIpO1xyXG5cclxuICBpZiAoZWxlbUNvbnRhaW5lci5oYXNDbGFzcyhcImFjdGl2ZVwiKSkge1xyXG4gICAgY2xvc2VFdmVyeUl0ZW0oY29udGFpbmVyKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY2xvc2VFdmVyeUl0ZW0oY29udGFpbmVyKTtcclxuICAgIG9wZW5JdGVtKCR0aGlzKTtcclxuICB9XHJcbn0pO1xyXG5cclxuXHJcbiIsImxldCBteU1hcDtcclxuY29uc3QgaW5pdCA9ICgpID0+IHtcclxuIG15TWFwID0gbmV3IHltYXBzLk1hcChcIm1hcFwiLCB7XHJcbiAgIGNlbnRlcjogWzU1Ljc1MTY0NCwgMzcuNjAwNjE4XSxcclxuICAgem9vbTogMTMsXHJcbiAgIGNvbnRyb2xzOiBbXSxcclxuIH0pO1xyXG4gXHJcbiBsZXQgY29vcmRzID0gW1xyXG4gICAgIFs1NS43NTQ3NTU4Njc1Mzg2MiwzNy42MjEzNjE3MzcyMTgzMTVdLFxyXG4gICAgIFs1NS43NTExOTIyODQwNTcxMSwzNy42MDY3MTIwNjU3NjQ3OV0sXHJcbiAgICAgWzU1Ljc1NzkwNTI5ODQ1NTcyNSwzNy41ODIxOTU5NDk4MTk3Nl0sXHJcbiAgICAgWzU1Ljc0Mzk3ODE0NzExNDk1LDM3LjU4MjY0MTM3NzMwMDE4NV0sXHJcbiAgIF0sXHJcbiAgIG15Q29sbGVjdGlvbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKHt9LCB7XHJcbiAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcclxuICAgICBpY29uTGF5b3V0OiAnZGVmYXVsdCNpbWFnZScsXHJcbiAgICAgaWNvbkltYWdlSHJlZjogJy4vaW1nL21hcmtlcl9tYXAuc3ZnJyxcclxuICAgICBpY29uSW1hZ2VTaXplOiBbNDYsIDU3XSxcclxuICAgICBpY29uSW1hZ2VPZmZzZXQ6IFstMzUsIC01Ml1cclxuICAgfSk7XHJcbiBcclxuIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgIG15Q29sbGVjdGlvbi5hZGQobmV3IHltYXBzLlBsYWNlbWFyayhjb29yZHNbaV0pKTtcclxuIH1cclxuIFxyXG4gbXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlDb2xsZWN0aW9uKTtcclxuIFxyXG4gbXlNYXAuYmVoYXZpb3JzLmRpc2FibGUoJ3Njcm9sbFpvb20nKTtcclxufTtcclxuIFxyXG55bWFwcy5yZWFkeShpbml0KTsiLCJkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Blbk92ZXJsYXknKS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5VGVtcGxhdGUnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9keScpLmNsYXNzTGlzdC5hZGQoJ21lbnUtb3BlbicpO1xyXG59XHJcblxyXG5cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZScpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheVRlbXBsYXRlJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvZHknKS5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LW9wZW4nKTtcclxufVxyXG5cclxuXHJcblxyXG4iLCJjb25zdCBtZXN1cmVXaWR0aCA9IGl0ZW0gID0+IHtcclxuICBsZXQgcmVxSXRlbVdpZHRoID0gMDtcclxuICBjb25zdCBzY3JlZW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGl0ZW0uY2xvc2VzdChcIi5wcm9kdWN0cy1tZW51XCIpO1xyXG4gIGNvbnN0IHRpdGxlc0Jsb2NrcyA9IGNvbnRhaW5lci5maW5kKFwiLnByb2R1Y3RzLW1lbnVfX3RpdGxlXCIpO1xyXG4gIGNvbnN0IHRpdGxlc1dpZHRoID0gdGl0bGVzQmxvY2tzLndpZHRoKCkgKiB0aXRsZXNCbG9ja3MubGVuZ3RoO1xyXG5cclxuICBjb25zdCB0ZXh0Q29udGFpbmVyID0gaXRlbS5maW5kKFwiLnByb2R1Y3RzLW1lbnVfX2NvbnRhaW5lclwiKTtcclxuICBjb25zdCBwYWRkaW5nTGVmdCA9IHBhcnNlSW50KHRleHRDb250YWluZXIuY3NzKFwicGFkZGluZy1sZWZ0XCIpKTtcclxuICBjb25zdCBwYWRkaW5nUmlnaHQgPSBwYXJzZUludCh0ZXh0Q29udGFpbmVyLmNzcyhcInBhZGRpbmctcmlnaHRcIikpO1xyXG5cclxuICBjb25zdCBpc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNzY4cHgpXCIpLm1hdGNoZXM7XHJcblxyXG4gIGlmKGlzTW9iaWxlKSB7XHJcbiAgICByZXFJdGVtV2lkdGggPSBzY3JlZW5XaWR0aCAtIHRpdGxlc1dpZHRoO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXFJdGVtV2lkdGggPSAgNTAwO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGNvbnRhaW5lcjogcmVxSXRlbVdpZHRoLFxyXG4gICAgdGV4dENvbnRhaW5lcjogcmVxSXRlbVdpZHRoIC0gcGFkZGluZ1JpZ2h0IC0gcGFkZGluZ0xlZnRcclxuICB9XHJcblxyXG4gIC8vY29uc29sZS5sb2codGl0bGVzV2lkdGgpOyBcclxuICAvL3JldHVybiBzY3JlZW5XaWR0aCAtIHRpdGxlc1dpZHRoO1xyXG59O1xyXG5cclxuY29uc3QgY2xvc2VFdmVyeUl0ZW1JbkNvbnRhaW5lciA9IGNvbnRhaW5lciA9PiB7XHJcbiAgY29uc3QgaXRlbXMgPSBjb250YWluZXIuZmluZChcIi5wcm9kdWN0cy1tZW51X19pdGVtXCIpO1xyXG4gIGNvbnN0IGNvbnRlbnQgPSBjb250YWluZXIuZmluZChcIi5wcm9kdWN0cy1tZW51X19jb250ZW50XCIpO1xyXG5cclxuICBpdGVtcy5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICBjb250ZW50LndpZHRoKDApO1xyXG59XHJcblxyXG5jb25zdCBvcGVuX0l0ZW0gPSBpdGVtID0+IHtcclxuY29uc3QgaGlkZGVuQ29udGVudCA9IGl0ZW0uZmluZChcIi5wcm9kdWN0cy1tZW51X19jb250ZW50XCIpO1xyXG5jb25zdCByZXFXaWR0aCA9IG1lc3VyZVdpZHRoIChpdGVtKTtcclxuY29uc3QgdGV4dEJsb2NrID0gaXRlbS5maW5kKFwiLnByb2R1Y3RzLW1lbnVfX2NvbnRhaW5lclwiKTtcclxuXHJcbml0ZW0uYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblxyXG5oaWRkZW5Db250ZW50LndpZHRoKHJlcVdpZHRoLmNvbnRhaW5lcik7XHJcbnRleHRCbG9jay53aWR0aChyZXFXaWR0aC50ZXh0Q29udGFpbmVyKTtcclxufVxyXG5cclxuJChcIi5wcm9kdWN0cy1tZW51X190aXRsZVwiKS5vbihcImNsaWNrXCIsIGU9PntcclxuZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuY29uc3QgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbmNvbnN0IGl0ZW0gPSAkdGhpcy5jbG9zZXN0KFwiLnByb2R1Y3RzLW1lbnVfX2l0ZW1cIik7XHJcbmNvbnN0IGl0ZW1PcGVuZWQgPSBpdGVtLmhhc0NsYXNzIChcImFjdGl2ZVwiKTtcclxuY29uc3QgY29udGFpbmVyID0gJHRoaXMuY2xvc2VzdChcIi5wcm9kdWN0cy1tZW51XCIpO1xyXG5cclxuaWYgKGl0ZW1PcGVuZWQpIHtcclxuICBjbG9zZUV2ZXJ5SXRlbUluQ29udGFpbmVyKGNvbnRhaW5lcilcclxufSBlbHNlIHtcclxuICBjbG9zZUV2ZXJ5SXRlbUluQ29udGFpbmVyKGNvbnRhaW5lcilcclxuXHJcbiAgb3Blbl9JdGVtKGl0ZW0pO1xyXG59XHJcblxyXG59KTtcclxuXHJcbiQoXCIucHJvZHVjdHMtbWVudV9fY2xvc2VcIikub24oXCJjbGlja1wiLCBlID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgY2xvc2VFdmVyeUl0ZW1JbkNvbnRhaW5lcigkKFwiLnByb2R1Y3RzLW1lbnVcIikpO1xyXG59KTsiLCJjb25zdCB2YWxpZGF0ZUZpZWxkcyA9IChmb3JtLCBmaWVsZHNBcnJheSkgPT4ge1xyXG4gIGZpZWxkc0FycmF5LmZvckVhY2goKGZpZWxkKSA9PiB7XHJcbiAgICBmaWVsZC5yZW1vdmVDbGFzcyhcImlucHV0LWVycm9yXCIpO1xyXG4gICAgaWYgKGZpZWxkLnZhbCgpLnRyaW0oKSA9PT0gXCJcIikge1xyXG4gICAgICBmaWVsZC5hZGRDbGFzcyhcImlucHV0LWVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gIGNvbnN0IGVycm9yRmllbGRzID0gZm9ybS5maW5kKFwiLmlucHV0LWVycm9yXCIpO1xyXG5cclxuICByZXR1cm4gZXJyb3JGaWVsZHMubGVuZ3RoID09PSAwO1xyXG59XHJcblxyXG4kKFwiLmZvcm1cIikuc3VibWl0KChlKSA9PiB7XHJcbmUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbmNvbnN0IGZvcm0gPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbmNvbnN0IG5hbWUgPSBmb3JtLmZpbmQoXCJbbmFtZT0nbmFtZSddXCIpO1xyXG5jb25zdCBwaG9uZSA9IGZvcm0uZmluZChcIltuYW1lPSdwaG9uZSddXCIpO1xyXG5jb25zdCBjb21tZW50ID0gZm9ybS5maW5kKFwiW25hbWU9J2NvbW1lbnQnXVwiKTtcclxuY29uc3QgdG8gPSBmb3JtLmZpbmQoXCJbbmFtZT0ndG8nXVwiKTtcclxuXHJcbmNvbnN0IG1vZGFsID0gJChcIiNtb2RhbFwiKTtcclxuY29uc3QgY29udGVudCA9IG1vZGFsLmZpbmQoXCIubW9kYWxfX2NvbnRlbnRcIik7XHJcblxyXG5tb2RhbC5yZW1vdmVDbGFzcyhcImVycm9yLW1vZGFsXCIpO1xyXG5cclxuY29uc3QgaXNWYWxpZCA9IHZhbGlkYXRlRmllbGRzKGZvcm0sIFtuYW1lLCBwaG9uZSwgY29tbWVudCwgdG9dKTtcclxuXHJcbmlmIChpc1ZhbGlkKSB7XHJcbmNvbnN0IHJlcXVlc3QgPSAkLmFqYXgoe1xyXG4gIHVybDogXCJodHRwczovL3dlYmRldi1hcGkubG9mdHNjaG9vbC5jb20vc2VuZG1haWxcIixcclxuICBtZXRob2Q6IFwicG9zdFwiLFxyXG4gIC8vaGVhZGVyczogeyAnY29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuICAvL2RhdGFUeXBlOiBcImpzb25cIixcclxuICBkYXRhOiB7XHJcbiAgICBuYW1lOiBuYW1lLnZhbCgpLFxyXG4gICAgcGhvbmU6IHBob25lLnZhbCgpLFxyXG4gICAgY29tbWVudDogY29tbWVudC52YWwoKSxcclxuICAgIHRvOiB0by52YWwoKSxcclxuICB9LCBcclxuXHJcblxyXG5lcnJvcjogKGRhdGEpID0+IHtcclxufVxyXG59KTtcclxucmVxdWVzdC5kb25lKChkYXRhKSA9PiB7XHJcbiAgY29udGVudC50ZXh0KGRhdGEubWVzc2FnZSk7XHJcbn0pO1xyXG5yZXF1ZXN0LmZhaWwoKCkgPT57XHJcbiAgY29udGVudC50ZXh0KFwi0KHQvtC+0LHRidC10L3QuNC1INC90LUg0L7RgtC/0YDQsNCy0LvQtdC90L5cIik7XHJcbiAgbW9kYWwuYWRkQ2xhc3MoXCJlcnJvci1tb2RhbFwiKTtcclxufSk7XHJcbi8qcmVxdWVzdC5mYWlsKChkYXRhKSA9PntcclxuICBjb25zdCBtZXNzYWdlID0gZGF0YS5yZXNwb25zZUpTT04ubWVzc2FnZTtcclxuICBjb250ZW50LnRleHQobWVzc2FnZSk7XHJcbiAgbW9kYWwuYWRkQ2xhc3MoXCJlcnJvci1tb2RhbFwiKTtcclxufSk7Ki9cclxucmVxdWVzdC5hbHdheXMoKCk9PntcclxuICAkLmZhbmN5Ym94Lm9wZW4oe1xyXG4gICAgc3JjOlwiI21vZGFsXCIsXHJcbiAgICB0eXBlOlwiaW5saW5lXCJcclxuICAgIH0pO1xyXG59KTtcclxufVxyXG59KTtcclxuXHJcbiQoXCIuYXBwLXN1Ym1pdC1idG5cIikuY2xpY2soKGUpPT57XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAkLmZhbmN5Ym94LmNsb3NlKCk7XHJcbn1cclxuKSIsImNvbnN0IHNlY3Rpb25zID0gJChcInNlY3Rpb25cIik7XHJcbmNvbnN0IGRpc3BsYXkgPSAkKFwiLm1haW5jb250ZW50XCIpO1xyXG5jb25zdCBzaWRlTWVudSA9ICQoXCIuZml4ZWQtbWVudVwiKTtcclxuY29uc3QgbWVudUl0ZW1zID0gc2lkZU1lbnUuZmluZChcIi5maXhlZC1tZW51X19pdGVtXCIpO1xyXG5cclxuY29uc3QgbW9iaWxlRGV0ZWN0ID0gbmV3IE1vYmlsZURldGVjdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbmNvbnN0IGlzTW9iaWxlID0gbW9iaWxlRGV0ZWN0Lm1vYmlsZSgpO1xyXG5cclxubGV0IGluU2Nyb2xsID0gZmFsc2U7IFxyXG5cclxuc2VjdGlvbnMuZmlyc3QoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHJcbmNvbnN0IGNvdW50U2VjdGlvblBvc2l0aW9uID0gKHNlY3Rpb25FcSkgPT4ge1xyXG5jb25zdCBwb3NpdGlvbiA9IHNlY3Rpb25FcSAqIC0xMDA7XHJcblxyXG5pZihpc05hTihwb3NpdGlvbikpIHtcclxuICBjb25zb2xlLmVycm9yKFwi0L/QtdGA0LXQtNCw0L3QviDQvdC10LLQtdGA0L3QvtC1INC30L3QsNGH0LXQvdC40LUg0LIgY291bnRTZWN0aW9uUG9zaXRpb25cIik7XHJcbiAgcmV0dXJuIDA7XHJcbn1cclxuXHJcbnJldHVybiBwb3NpdGlvbjtcclxuXHJcbn07XHJcblxyXG5jb25zdCBjaGFuZ2VNZW51VGhlbWVGb3JTZWN0aW9uID0gKHNlY3Rpb25FcSkgPT4ge1xyXG4gIGNvbnN0IGN1cnJlbnRTZWN0aW9uID0gc2VjdGlvbnMuZXEoc2VjdGlvbkVxKTtcclxuICBjb25zdCBtZW51VGhlbWUgPSBjdXJyZW50U2VjdGlvbi5hdHRyKFwiZGF0YS1zaWRlbWVudS10aGVtZVwiKTtcclxuICBjb25zdCBhY3RpdmVDbGFzcyA9IFwiZml4ZWQtbWVudS0td2hpdGVcIjtcclxuXHJcbiAgaWYgKG1lbnVUaGVtZSA9PT0gXCJ3aGl0ZVwiKSB7XHJcbiAgICBzaWRlTWVudS5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgfWVsc2V7XHJcbiAgICBzaWRlTWVudS5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgcmVzZXRBY3RpdmVDbGFzc0Zvckl0ZW0gPSAoaXRlbXMsaXRlbUVxLCBhY3RpdmVDbGFzcykgPT4ge1xyXG4gIGl0ZW1zLmVxKGl0ZW1FcSkuYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG59O1xyXG5cclxuY29uc3QgcGVyZm9ybVRyYW5zaXRpb24gPSAoc2VjdGlvbkVxKSA9PiB7XHJcblxyXG4gIGlmIChpblNjcm9sbCkgcmV0dXJuO1xyXG5cclxuICBjb25zdCB0cmFuc2l0aW9uT3ZlciA9IDEwMDA7XHJcbiAgY29uc3QgbW91c2VJbmVydGlhSXZlciA9IDMwMDtcclxuXHJcbiAgaW5TY3JvbGwgPSB0cnVlOyBcclxuXHJcbiAgY29uc3QgcG9zaXRpb24gPSBjb3VudFNlY3Rpb25Qb3NpdGlvbihzZWN0aW9uRXEpO1xyXG5cclxuICBjaGFuZ2VNZW51VGhlbWVGb3JTZWN0aW9uKHNlY3Rpb25FcSk7XHJcblxyXG4gIGRpc3BsYXkuY3NzKHtcclxuICAgIHRyYW5zZm9ybTpgdHJhbnNsYXRlWSgke3Bvc2l0aW9ufSUpYCxcclxuICB9KTtcclxuXHJcbiAgcmVzZXRBY3RpdmVDbGFzc0Zvckl0ZW0oc2VjdGlvbnMsIHNlY3Rpb25FcSwgXCJhY3RpdmVcIik7XHJcblxyXG4gIHNldFRpbWVvdXQoKCkgPT57XHJcbiAgICBpblNjcm9sbCA9IGZhbHNlO1xyXG4gICAgcmVzZXRBY3RpdmVDbGFzc0Zvckl0ZW0obWVudUl0ZW1zLCBzZWN0aW9uRXEsIFwiZml4ZWQtbWVudV9faXRlbS0tYWN0aXZlXCIpO1xyXG4gIH0sIHRyYW5zaXRpb25PdmVyICsgbW91c2VJbmVydGlhSXZlclxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCB2aWV3cG9ydFNjcm9sbGVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBzZWN0aW9ucy5maWx0ZXIoXCIuYWN0aXZlXCIpO1xyXG4gIGNvbnN0IG5leHRTZWN0aW9uID0gYWN0aXZlU2VjdGlvbi5uZXh0KCk7XHJcbiAgY29uc3QgcHJldlNlY3Rpb24gPSBhY3RpdmVTZWN0aW9uLnByZXYoKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG5leHQoKSB7XHJcbiAgICAgIGlmIChuZXh0U2VjdGlvbi5sZW5ndGgpIHtcclxuICAgICAgICBwZXJmb3JtVHJhbnNpdGlvbihuZXh0U2VjdGlvbi5pbmRleCgpKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHByZXYoKXtcclxuICAgICAgaWYgKHByZXZTZWN0aW9uLmxlbmd0aCkge1xyXG4gICAgICAgIHBlcmZvcm1UcmFuc2l0aW9uKHByZXZTZWN0aW9uLmluZGV4KCkpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH07XHJcbn07XHJcblxyXG4kKHdpbmRvdykub24oXCJ3aGVlbFwiLChlKSA9PiB7XHJcbiAgY29uc3QgZGVsdGFZID0gZS5vcmlnaW5hbEV2ZW50LmRlbHRhWTtcclxuICBjb25zdCBzY3JvbGxlciA9IHZpZXdwb3J0U2Nyb2xsZXIoKTtcclxuXHJcbiAgaWYgKGRlbHRhWSA+IDApe1xyXG4gICAgc2Nyb2xsZXIubmV4dCgpO1xyXG4gICAgICB9XHJcbiAgICBcclxuICAgICAgaWYgKGRlbHRhWSA8IDApIHtcclxuICAgICAgICBzY3JvbGxlci5wcmV2KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQod2luZG93KS5vbihcImtleWRvd25cIiwgZSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhZ05hbWUgPSBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IHVzZXJUeXBpbmdJbklucHV0cyA9IHRhZ05hbWUgPT09IFwiaW5wdXRcIiB8fCB0YWdOYW1lID09PSBcInRleHRhcmVhXCI7XHJcbiAgICAgIGNvbnN0IHNjcm9sbGVyID0gdmlld3BvcnRTY3JvbGxlciAoKTtcclxuXHJcbiAgICAgIGlmICh1c2VyVHlwaW5nSW5JbnB1dHMpIHJldHVybjsgXHJcblxyXG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xyXG4gICAgICAgIGNhc2UgMzg6IFxyXG4gICAgICAgIHNjcm9sbGVyLnByZXYoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgXHJcbiAgICAgICAgY2FzZSA0MDpcclxuICAgICAgICAgIHNjcm9sbGVyLm5leHQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgICQoXCIud3JhcHBlclwiKS5vbihcInRvdWNobW92ZVwiLCBlID0+IGUucHJldmVudERlZmF1bHQoKVxyXG4pOyBcclxuXHJcbiAgICAkKFwiW2RhdGEtc2Nyb2xsLXRvXVwiKS5jbGljayhlID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgXHJcbiAgICAgIGNvbnN0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSAkdGhpcy5hdHRyKFwiZGF0YS1zY3JvbGwtdG9cIik7XHJcbiAgICAgIGNvbnN0IHJlcVNlY3Rpb24gPSAkKGBbZGF0YS1zZWN0aW9uLWlkPSR7dGFyZ2V0fV1gKTtcclxuICAgIFxyXG4gICAgICBwZXJmb3JtVHJhbnNpdGlvbihyZXFTZWN0aW9uLmluZGV4KCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGlzTW9iaWxlKSB7XHJcblxyXG4gICAgICAkKFwiYm9keVwiKS5zd2lwZSh7XHJcbiAgICBcclxuICAgICAgc3dpcGU6IGZ1bmN0aW9uIChldmVudCwgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsZXIgPSB2aWV3cG9ydFNjcm9sbGVyKCk7XHJcbiAgICAgICAgbGV0IHNjcm9sbERpcmVjdGlvbiA9IFwiXCI7XHJcbiAgICBcclxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInVwXCIpIHNjcm9sbERpcmVjdGlvbiA9IFwibmV4dFwiO1xyXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiZG93blwiKSBzY3JvbGxEaXJlY3Rpb24gPSBcInByZXZcIjtcclxuICAgIFxyXG4gICAgICAgIHNjcm9sbGVyW3Njcm9sbERpcmVjdGlvbl0oKTtcclxuICAgIFxyXG4gICAgICB9LFxyXG4gICAgXHJcbiAgICBcclxuICAgICAgfSk7XHJcbiAgICBcclxuICAgIH1cclxuICAgIFxyXG5cclxuXHJcbiIsImxldCBwbGF5ZXI7XHJcbmNvbnN0IHBsYXllckNvbnRhaW5lciA9ICQoXCIucGxheWVyXCIpO1xyXG5cclxubGV0IGV2ZW50c0luaXQgPSAoKSA9PiB7XHJcbiAgJChcIi5wbGF5ZXJfX3N0YXJ0XCIpLmNsaWNrKGUgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIFxyXG4gICAgaWYgKHBsYXllckNvbnRhaW5lci5oYXNDbGFzcyhcInBhdXNlZFwiKSkge1xyXG4gICAgICBwbGF5ZXIucGF1c2VWaWRlbygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGxheWVyLnBsYXlWaWRlbygpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuXHJcbiAkKFwiLnBsYXllcl9fcGxheWJhY2tcIikuY2xpY2soZSA9PiB7XHJcbiAgY29uc3QgYmFyID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gIGNvbnN0IGNsaWNrZWRQb3NpdGlvbiA9IGUub3JpZ2luYWxFdmVudC5sYXllclg7XHJcbiAgXHJcbiAgY29uc3QgbmV3QnV0dG9uUG9zaXRpb25QZXJjZW50ID0gKGNsaWNrZWRQb3NpdGlvbiAvIGJhci53aWR0aCgpKSAqIDEwMDtcclxuICBjb25zdCBuZXdQbGF5YmFja1Bvc2l0aW9uU2VjID1cclxuICAgIChwbGF5ZXIuZ2V0RHVyYXRpb24oKSAvIDEwMCkgKiBuZXdCdXR0b25Qb3NpdGlvblBlcmNlbnQ7XHJcbiAgXHJcbiAgJChcIi5wbGF5ZXJfX3BsYXliYWNrLWJ1dHRvblwiKS5jc3Moe1xyXG4gICAgbGVmdDogYCR7bmV3QnV0dG9uUG9zaXRpb25QZXJjZW50fSVgXHJcbiAgfSk7XHJcbiAgXHJcbiAgcGxheWVyLnNlZWtUbyhuZXdQbGF5YmFja1Bvc2l0aW9uU2VjKTtcclxuIH0pO1xyXG5cclxuICQoXCIucGxheWVyX19zcGxhc2hcIikuY2xpY2soZSA9PiB7XHJcbiAgcGxheWVyLnBsYXlWaWRlbygpO1xyXG59KTtcclxufTtcclxuXHJcbi8v0LPRgNC+0LzQutC+0YHRgtGMXHJcblxyXG5jb25zdCBwbGF5Vm9sdW1lID0gJChcIi5wbGF5ZXJfX3ZvbHVtZVwiKTtcclxubGV0IGlzTXV0ZWQgPSBmYWxzZTsgXHJcblxyXG4kKFwiLnBsYXllcl9fdm9sdW1lXCIpLmNsaWNrKGUgPT4ge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBcclxuXHJcbiAgaWYgKCFpc011dGVkKSB7XHJcbiAgICBwbGF5ZXIudW5NdXRlKClcclxuICAgIGlzTXV0ZWQgPSB0cnVlXHJcbiAgfSBlbHNlIHtcclxuICAgIHBsYXllci5tdXRlKClcclxuICAgIGlzTXV0ZWQgPSBmYWxzZVxyXG4gIH1cclxufSk7XHJcblxyXG4kKFwiLnBsYXllcl9fcGxheWJhY2stdm9sdW1lXCIpLmNsaWNrKGUgPT4ge1xyXG4gIGNvbnN0IGJhclZvbHVtZSA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICBjb25zdCBjbGlja2VkUG9zaXRpb25Wb2x1bWUgPSBlLm9yaWdpbmFsRXZlbnQubGF5ZXJYO1xyXG4gIC8vY29uc3Qgdm9sdW1lSW50ID0gcGxheWVyLmdldFZvbHVtZSgpO1xyXG5cclxuICBcclxuICBjb25zdCBuZXdCdXR0b25Qb3NpdGlvblBlcmNlbnRWb2x1bWUgPSAoY2xpY2tlZFBvc2l0aW9uVm9sdW1lIC8gYmFyVm9sdW1lLndpZHRoKCkpICogMTAwO1xyXG4gIGNvbnN0IG5ld1BsYXliYWNrUG9zaXRpb25TZWNWb2x1bWUgPVxyXG4gICAgKHBsYXllci5nZXRWb2x1bWUoKSAvIDEwMCkgKiBuZXdCdXR0b25Qb3NpdGlvblBlcmNlbnRWb2x1bWU7XHJcbiAgXHJcbiAgJChcIi5wbGF5ZXJfX3ZvbHVtZS1idXR0b25cIikuY3NzKHtcclxuICAgIGxlZnQ6IGAke25ld0J1dHRvblBvc2l0aW9uUGVyY2VudFZvbHVtZX0lYFxyXG4gIH0pO1xyXG4gIFxyXG4gIHBsYXllci5zZXRWb2x1bWUgKG5ld0J1dHRvblBvc2l0aW9uUGVyY2VudFZvbHVtZSk7XHJcbiB9KTtcclxuXHJcblxyXG4gY29uc3QgZm9ybWF0VGltZSA9IHRpbWVTZWMgPT4ge1xyXG4gIGNvbnN0IHJvdW5kVGltZSA9IE1hdGgucm91bmQodGltZVNlYyk7XHJcbiAgXHJcbiAgY29uc3QgbWludXRlcyA9IGFkZFplcm8oTWF0aC5mbG9vcihyb3VuZFRpbWUgLyA2MCkpO1xyXG4gIGNvbnN0IHNlY29uZHMgPSBhZGRaZXJvKHJvdW5kVGltZSAtIG1pbnV0ZXMgKiA2MCk7XHJcbiAgXHJcbiAgZnVuY3Rpb24gYWRkWmVybyhudW0pIHtcclxuICAgIHJldHVybiBudW0gPCAxMCA/IGAwJHtudW19YCA6IG51bTtcclxuICB9XHJcbiAgXHJcbiAgcmV0dXJuIGAke21pbnV0ZXN9IDogJHtzZWNvbmRzfWA7XHJcbiB9O1xyXG5cclxuXHJcbiBjb25zdCBvblBsYXllclJlYWR5ID0gKCkgPT4ge1xyXG4gIGxldCBpbnRlcnZhbDtcclxuICBjb25zdCBkdXJhdGlvblNlYyA9IHBsYXllci5nZXREdXJhdGlvbigpO1xyXG4gIFxyXG4gICQoXCIucGxheWVyX19kdXJhdGlvbi1lc3RpbWF0ZVwiKS50ZXh0KGZvcm1hdFRpbWUoZHVyYXRpb25TZWMpKTtcclxuICBcclxuICBpZiAodHlwZW9mIGludGVydmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICB9XHJcbiAgXHJcbiAgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICBjb25zdCBjb21wbGV0ZWRTZWMgPSBwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKTtcclxuICAgIGNvbnN0IGNvbXBsZXRlZFBlcmNlbnQgPSAoY29tcGxldGVkU2VjIC8gZHVyYXRpb25TZWMpICogMTAwO1xyXG5cclxuICAgICQoXCIucGxheWVyX19wbGF5YmFjay1idXR0b25cIikuY3NzKHtcclxuICAgICAgbGVmdDogYCR7Y29tcGxldGVkUGVyY2VudH0lYFxyXG4gICAgfSk7XHJcbiAgIFxyXG4gIFxyXG4gICAgJChcIi5wbGF5ZXJfX2R1cmF0aW9uLWNvbXBsZXRlZFwiKS50ZXh0KGZvcm1hdFRpbWUoY29tcGxldGVkU2VjKSk7XHJcbiAgfSwgMTAwMCk7XHJcbiB9O1xyXG5cclxuIGNvbnN0IG9uUGxheWVyU3RhdGVDaGFuZ2UgPSBldmVudCA9PiB7XHJcbiAgLypcclxuICAgIC0xICjQstC+0YHQv9GA0L7QuNC30LLQtdC00LXQvdC40LUg0LLQuNC00LXQviDQvdC1INC90LDRh9Cw0YLQvilcclxuICAgIDAgKNCy0L7RgdC/0YDQvtC40LfQstC10LTQtdC90LjQtSDQstC40LTQtdC+INC30LDQstC10YDRiNC10L3QvilcclxuICAgIDEgKNCy0L7RgdC/0YDQvtC40LfQstC10LTQtdC90LjQtSlcclxuICAgIDIgKNC/0LDRg9C30LApXHJcbiAgICAzICjQsdGD0YTQtdGA0LjQt9Cw0YbQuNGPKVxyXG4gICAgNSAo0LLQuNC00LXQviDQv9C+0LTQsNGO0YIg0YDQtdC/0LvQuNC60LgpLlxyXG4gICovXHJcbiAgc3dpdGNoIChldmVudC5kYXRhKSB7XHJcbiAgICBjYXNlIDA6XHJcbiAgICAgIHBsYXllckNvbnRhaW5lci5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgcGxheWVyQ29udGFpbmVyLnJlbW92ZUNsYXNzKFwicGF1c2VkXCIpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTpcclxuICAgICAgcGxheWVyQ29udGFpbmVyLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICBwbGF5ZXJDb250YWluZXIuYWRkQ2xhc3MoXCJwYXVzZWRcIik7XHJcbiAgICAgIGJyZWFrO1xyXG4gIFxyXG4gICAgY2FzZSAyOlxyXG4gICAgICBwbGF5ZXJDb250YWluZXIucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgIHBsYXllckNvbnRhaW5lci5yZW1vdmVDbGFzcyhcInBhdXNlZFwiKTtcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG4gfTtcclxuXHJcbmZ1bmN0aW9uIG9uWW91VHViZUlmcmFtZUFQSVJlYWR5KCkge1xyXG4gIHBsYXllciA9IG5ldyBZVC5QbGF5ZXIoXCJ5dC1wbGF5ZXJcIiwge1xyXG4gICAgaGVpZ2h0OiBcIjM5MlwiLFxyXG4gICAgd2lkdGg6IFwiNjYyXCIsXHJcbiAgICB2aWRlb0lkOiBcIjFfZjNSY3lZZGZBXCIsXHJcbiAgICBldmVudHM6IHtcclxuICAgICAgb25SZWFkeTogb25QbGF5ZXJSZWFkeSxcclxuICAgICAgb25TdGF0ZUNoYW5nZTogb25QbGF5ZXJTdGF0ZUNoYW5nZVxyXG4gICAgfSxcclxuICAgIHBsYXllclZhcnM6IHtcclxuICAgICAgY29udHJvbHM6IDAsXHJcbiAgICAgIGRpc2FibGVrYjogMSxcclxuICAgICAgc2hvd2luZm86IDAsXHJcbiAgICAgIHJlbDogMCxcclxuICAgICAgYXV0b3BsYXk6IDAsXHJcbiAgICAgIG1vZGVzdGJyYW5kaW5nOiAwXHJcbiAgICB9XHJcbiAgfSk7XHJcbiB9XHJcblxyXG4gIGV2ZW50c0luaXQoKTsiLCJjb25zdCBzbGlkZXIgPSAkKCcuc2xpZGVyX19saXN0JykuYnhTbGlkZXIoe1xyXG5wYWdlcjogZmFsc2UsXHJcbmNvbnRyb2xzOiBmYWxzZSwgIFxyXG59XHJcbik7XHJcblxyXG4kKFwiLnNsaWRlcl9fYXJyb3ctLWxlZnRcIikuY2xpY2soKGUpPT57XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIHNsaWRlci5nb1RvUHJldlNsaWRlKCk7XHJcbn1cclxuKTtcclxuXHJcbiQoXCIuc2xpZGVyX19hcnJvdy0tcmlnaHRcIikuY2xpY2soKGUpPT57XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIHNsaWRlci5nb1RvTmV4dFNsaWRlKCk7XHJcbn1cclxuKTsiLCJcclxuY29uc3QgZmluZEJsb2NrQnlBbGlhcyA9IChhbGlhcykgPT4ge1xyXG5yZXR1cm4gJChcIi5yZXZpZXdzX19pdGVtXCIpLmZpbHRlcigobmR4LCBpdGVtKSA9PiB7XHJcbnJldHVybiAkKGl0ZW0pLmF0dHIoXCJkYXRhLWxpbmtlZC13aXRoXCIpID09PSBhbGlhcztcclxufSk7XHJcbn07XHJcbiQoXCIuaW50ZXJhY3RpdmUtYXZhdGFyX19saW5rXCIpLmNsaWNrKFxyXG4gIGUgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gJHRoaXMuYXR0cihcImRhdGEtb3BlblwiKTtcclxuICAgIGNvbnN0IGl0ZW1Ub1Nob3cgPSBmaW5kQmxvY2tCeUFsaWFzKHRhcmdldCk7XHJcbiAgICBjb25zdCBjdXJJdGVtID0gJHRoaXMuY2xvc2VzdChcIi5yZXZpZXdzX19zd2l0Y2hlci1pdGVtXCIpO1xyXG5cclxuICAgIGl0ZW1Ub1Nob3cuYWRkQ2xhc3MoXCJhY3RpdmVcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHJcbiAgICBjdXJJdGVtLmFkZENsYXNzKFwiYWN0aXZlXCIpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG4pOyJdfQ==
