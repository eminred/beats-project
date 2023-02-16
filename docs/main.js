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
      
      $(".fullscreen-menu").removeClass("active");
      $("body").removeClass("menu-open");
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY28uanMiLCJtYXAuanMiLCJtZW51LmpzIiwibWVudV9hY2NvLmpzIiwibW9kYWwuanMiLCJvcHMuanMiLCJwbGF5ZXIuanMiLCJzbGlkZXIuanMiLCJzd2l0Y2hlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0NoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQzFKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQzFKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG9wZW5JdGVtID0gaXRlbSA9PiB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gaXRlbS5jbG9zZXN0KFwiLnRlYW1fX2l0ZW1cIik7XHJcbiAgY29uc3QgY29udGVudEJsb2NrID0gY29udGFpbmVyLmZpbmQoXCIudGVhbV9fY29udGVudFwiKTtcclxuICBjb25zdCB0ZXh0QmxvY2sgPSBjb250ZW50QmxvY2suZmluZChcIi50ZWFtX19jb250ZW50LWJsb2NrXCIpO1xyXG4gIGNvbnN0IHJlcUhlaWdodCA9IHRleHRCbG9jay5oZWlnaHQoKTtcclxuXHJcbiAgY29udGFpbmVyLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gIGNvbnRlbnRCbG9jay5oZWlnaHQocmVxSGVpZ2h0KTtcclxufVxyXG5cclxuY29uc3QgY2xvc2VFdmVyeUl0ZW0gPSBjb250YWluZXIgPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gY29udGFpbmVyLmZpbmQoJy50ZWFtX19jb250ZW50Jyk7XHJcbiAgY29uc3QgaXRlbUNvbnRhaW5lciA9IGNvbnRhaW5lci5maW5kKFwiLnRlYW1fX2l0ZW1cIik7XHJcblxyXG4gIGl0ZW1Db250YWluZXIucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgaXRlbXMuaGVpZ2h0KDApO1xyXG59XHJcblxyXG4kKCcudGVhbV9fdGl0bGUnKS5jbGljayhlID0+e1xyXG4gIGNvbnN0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9ICR0aGlzLmNsb3Nlc3QoJy50ZWFtJyk7XHJcbiAgY29uc3QgZWxlbUNvbnRhaW5lciA9ICR0aGlzLmNsb3Nlc3QoXCIudGVhbV9faXRlbVwiKTtcclxuXHJcbiAgaWYgKGVsZW1Db250YWluZXIuaGFzQ2xhc3MoXCJhY3RpdmVcIikpIHtcclxuICAgIGNsb3NlRXZlcnlJdGVtKGNvbnRhaW5lcik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNsb3NlRXZlcnlJdGVtKGNvbnRhaW5lcik7XHJcbiAgICBvcGVuSXRlbSgkdGhpcyk7XHJcbiAgfVxyXG59KTtcclxuXHJcblxyXG4iLCJsZXQgbXlNYXA7XHJcbmNvbnN0IGluaXQgPSAoKSA9PiB7XHJcbiBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXCJtYXBcIiwge1xyXG4gICBjZW50ZXI6IFs1NS43NTE2NDQsIDM3LjYwMDYxOF0sXHJcbiAgIHpvb206IDEzLFxyXG4gICBjb250cm9sczogW10sXHJcbiB9KTtcclxuIFxyXG4gbGV0IGNvb3JkcyA9IFtcclxuICAgICBbNTUuNzU0NzU1ODY3NTM4NjIsMzcuNjIxMzYxNzM3MjE4MzE1XSxcclxuICAgICBbNTUuNzUxMTkyMjg0MDU3MTEsMzcuNjA2NzEyMDY1NzY0NzldLFxyXG4gICAgIFs1NS43NTc5MDUyOTg0NTU3MjUsMzcuNTgyMTk1OTQ5ODE5NzZdLFxyXG4gICAgIFs1NS43NDM5NzgxNDcxMTQ5NSwzNy41ODI2NDEzNzczMDAxODVdLFxyXG4gICBdLFxyXG4gICBteUNvbGxlY3Rpb24gPSBuZXcgeW1hcHMuR2VvT2JqZWN0Q29sbGVjdGlvbih7fSwge1xyXG4gICAgIGRyYWdnYWJsZTogZmFsc2UsXHJcbiAgICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxyXG4gICAgIGljb25JbWFnZUhyZWY6ICcuL2ltZy9tYXJrZXJfbWFwLnN2ZycsXHJcbiAgICAgaWNvbkltYWdlU2l6ZTogWzQ2LCA1N10sXHJcbiAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTM1LCAtNTJdXHJcbiAgIH0pO1xyXG4gXHJcbiBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3Jkcy5sZW5ndGg7IGkrKykge1xyXG4gICBteUNvbGxlY3Rpb24uYWRkKG5ldyB5bWFwcy5QbGFjZW1hcmsoY29vcmRzW2ldKSk7XHJcbiB9XHJcbiBcclxuIG15TWFwLmdlb09iamVjdHMuYWRkKG15Q29sbGVjdGlvbik7XHJcbiBcclxuIG15TWFwLmJlaGF2aW9ycy5kaXNhYmxlKCdzY3JvbGxab29tJyk7XHJcbn07XHJcbiBcclxueW1hcHMucmVhZHkoaW5pdCk7IiwiZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW5PdmVybGF5Jykub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICBcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheVRlbXBsYXRlJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvZHknKS5jbGFzc0xpc3QuYWRkKCdtZW51LW9wZW4nKTtcclxufVxyXG5cclxuXHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJsYXlUZW1wbGF0ZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2R5JykuY2xhc3NMaXN0LnJlbW92ZSgnbWVudS1vcGVuJyk7XHJcbn1cclxuXHJcblxyXG5cclxuIiwiY29uc3QgbWVzdXJlV2lkdGggPSBpdGVtICA9PiB7XHJcbiAgbGV0IHJlcUl0ZW1XaWR0aCA9IDA7XHJcbiAgY29uc3Qgc2NyZWVuV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcclxuICBjb25zdCBjb250YWluZXIgPSBpdGVtLmNsb3Nlc3QoXCIucHJvZHVjdHMtbWVudVwiKTtcclxuICBjb25zdCB0aXRsZXNCbG9ja3MgPSBjb250YWluZXIuZmluZChcIi5wcm9kdWN0cy1tZW51X190aXRsZVwiKTtcclxuICBjb25zdCB0aXRsZXNXaWR0aCA9IHRpdGxlc0Jsb2Nrcy53aWR0aCgpICogdGl0bGVzQmxvY2tzLmxlbmd0aDtcclxuXHJcbiAgY29uc3QgdGV4dENvbnRhaW5lciA9IGl0ZW0uZmluZChcIi5wcm9kdWN0cy1tZW51X19jb250YWluZXJcIik7XHJcbiAgY29uc3QgcGFkZGluZ0xlZnQgPSBwYXJzZUludCh0ZXh0Q29udGFpbmVyLmNzcyhcInBhZGRpbmctbGVmdFwiKSk7XHJcbiAgY29uc3QgcGFkZGluZ1JpZ2h0ID0gcGFyc2VJbnQodGV4dENvbnRhaW5lci5jc3MoXCJwYWRkaW5nLXJpZ2h0XCIpKTtcclxuXHJcbiAgY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDc2OHB4KVwiKS5tYXRjaGVzO1xyXG5cclxuICBpZihpc01vYmlsZSkge1xyXG4gICAgcmVxSXRlbVdpZHRoID0gc2NyZWVuV2lkdGggLSB0aXRsZXNXaWR0aDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmVxSXRlbVdpZHRoID0gIDUwMDtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjb250YWluZXI6IHJlcUl0ZW1XaWR0aCxcclxuICAgIHRleHRDb250YWluZXI6IHJlcUl0ZW1XaWR0aCAtIHBhZGRpbmdSaWdodCAtIHBhZGRpbmdMZWZ0XHJcbiAgfVxyXG5cclxuICAvL2NvbnNvbGUubG9nKHRpdGxlc1dpZHRoKTsgXHJcbiAgLy9yZXR1cm4gc2NyZWVuV2lkdGggLSB0aXRsZXNXaWR0aDtcclxufTtcclxuXHJcbmNvbnN0IGNsb3NlRXZlcnlJdGVtSW5Db250YWluZXIgPSBjb250YWluZXIgPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gY29udGFpbmVyLmZpbmQoXCIucHJvZHVjdHMtbWVudV9faXRlbVwiKTtcclxuICBjb25zdCBjb250ZW50ID0gY29udGFpbmVyLmZpbmQoXCIucHJvZHVjdHMtbWVudV9fY29udGVudFwiKTtcclxuXHJcbiAgaXRlbXMucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgY29udGVudC53aWR0aCgwKTtcclxufVxyXG5cclxuY29uc3Qgb3Blbl9JdGVtID0gaXRlbSA9PiB7XHJcbmNvbnN0IGhpZGRlbkNvbnRlbnQgPSBpdGVtLmZpbmQoXCIucHJvZHVjdHMtbWVudV9fY29udGVudFwiKTtcclxuY29uc3QgcmVxV2lkdGggPSBtZXN1cmVXaWR0aCAoaXRlbSk7XHJcbmNvbnN0IHRleHRCbG9jayA9IGl0ZW0uZmluZChcIi5wcm9kdWN0cy1tZW51X19jb250YWluZXJcIik7XHJcblxyXG5pdGVtLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cclxuaGlkZGVuQ29udGVudC53aWR0aChyZXFXaWR0aC5jb250YWluZXIpO1xyXG50ZXh0QmxvY2sud2lkdGgocmVxV2lkdGgudGV4dENvbnRhaW5lcik7XHJcbn1cclxuXHJcbiQoXCIucHJvZHVjdHMtbWVudV9fdGl0bGVcIikub24oXCJjbGlja1wiLCBlPT57XHJcbmUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbmNvbnN0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG5jb25zdCBpdGVtID0gJHRoaXMuY2xvc2VzdChcIi5wcm9kdWN0cy1tZW51X19pdGVtXCIpO1xyXG5jb25zdCBpdGVtT3BlbmVkID0gaXRlbS5oYXNDbGFzcyAoXCJhY3RpdmVcIik7XHJcbmNvbnN0IGNvbnRhaW5lciA9ICR0aGlzLmNsb3Nlc3QoXCIucHJvZHVjdHMtbWVudVwiKTtcclxuXHJcbmlmIChpdGVtT3BlbmVkKSB7XHJcbiAgY2xvc2VFdmVyeUl0ZW1JbkNvbnRhaW5lcihjb250YWluZXIpXHJcbn0gZWxzZSB7XHJcbiAgY2xvc2VFdmVyeUl0ZW1JbkNvbnRhaW5lcihjb250YWluZXIpXHJcblxyXG4gIG9wZW5fSXRlbShpdGVtKTtcclxufVxyXG5cclxufSk7XHJcblxyXG4kKFwiLnByb2R1Y3RzLW1lbnVfX2Nsb3NlXCIpLm9uKFwiY2xpY2tcIiwgZSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGNsb3NlRXZlcnlJdGVtSW5Db250YWluZXIoJChcIi5wcm9kdWN0cy1tZW51XCIpKTtcclxufSk7IiwiY29uc3QgdmFsaWRhdGVGaWVsZHMgPSAoZm9ybSwgZmllbGRzQXJyYXkpID0+IHtcclxuICBmaWVsZHNBcnJheS5mb3JFYWNoKChmaWVsZCkgPT4ge1xyXG4gICAgZmllbGQucmVtb3ZlQ2xhc3MoXCJpbnB1dC1lcnJvclwiKTtcclxuICAgIGlmIChmaWVsZC52YWwoKS50cmltKCkgPT09IFwiXCIpIHtcclxuICAgICAgZmllbGQuYWRkQ2xhc3MoXCJpbnB1dC1lcnJvclwiKTtcclxuICAgIH1cclxuICB9KTtcclxuICBcclxuICBjb25zdCBlcnJvckZpZWxkcyA9IGZvcm0uZmluZChcIi5pbnB1dC1lcnJvclwiKTtcclxuXHJcbiAgcmV0dXJuIGVycm9yRmllbGRzLmxlbmd0aCA9PT0gMDtcclxufVxyXG5cclxuJChcIi5mb3JtXCIpLnN1Ym1pdCgoZSkgPT4ge1xyXG5lLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5jb25zdCBmb3JtID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG5jb25zdCBuYW1lID0gZm9ybS5maW5kKFwiW25hbWU9J25hbWUnXVwiKTtcclxuY29uc3QgcGhvbmUgPSBmb3JtLmZpbmQoXCJbbmFtZT0ncGhvbmUnXVwiKTtcclxuY29uc3QgY29tbWVudCA9IGZvcm0uZmluZChcIltuYW1lPSdjb21tZW50J11cIik7XHJcbmNvbnN0IHRvID0gZm9ybS5maW5kKFwiW25hbWU9J3RvJ11cIik7XHJcblxyXG5jb25zdCBtb2RhbCA9ICQoXCIjbW9kYWxcIik7XHJcbmNvbnN0IGNvbnRlbnQgPSBtb2RhbC5maW5kKFwiLm1vZGFsX19jb250ZW50XCIpO1xyXG5cclxubW9kYWwucmVtb3ZlQ2xhc3MoXCJlcnJvci1tb2RhbFwiKTtcclxuXHJcbmNvbnN0IGlzVmFsaWQgPSB2YWxpZGF0ZUZpZWxkcyhmb3JtLCBbbmFtZSwgcGhvbmUsIGNvbW1lbnQsIHRvXSk7XHJcblxyXG5pZiAoaXNWYWxpZCkge1xyXG5jb25zdCByZXF1ZXN0ID0gJC5hamF4KHtcclxuICB1cmw6IFwiaHR0cHM6Ly93ZWJkZXYtYXBpLmxvZnRzY2hvb2wuY29tL3NlbmRtYWlsXCIsXHJcbiAgbWV0aG9kOiBcInBvc3RcIixcclxuICAvL2hlYWRlcnM6IHsgJ2NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcbiAgLy9kYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgZGF0YToge1xyXG4gICAgbmFtZTogbmFtZS52YWwoKSxcclxuICAgIHBob25lOiBwaG9uZS52YWwoKSxcclxuICAgIGNvbW1lbnQ6IGNvbW1lbnQudmFsKCksXHJcbiAgICB0bzogdG8udmFsKCksXHJcbiAgfSwgXHJcblxyXG5cclxuZXJyb3I6IChkYXRhKSA9PiB7XHJcbn1cclxufSk7XHJcbnJlcXVlc3QuZG9uZSgoZGF0YSkgPT4ge1xyXG4gIGNvbnRlbnQudGV4dChkYXRhLm1lc3NhZ2UpO1xyXG59KTtcclxucmVxdWVzdC5mYWlsKCgpID0+e1xyXG4gIGNvbnRlbnQudGV4dChcItCh0L7QvtCx0YnQtdC90LjQtSDQvdC1INC+0YLQv9GA0LDQstC70LXQvdC+XCIpO1xyXG4gIG1vZGFsLmFkZENsYXNzKFwiZXJyb3ItbW9kYWxcIik7XHJcbn0pO1xyXG4vKnJlcXVlc3QuZmFpbCgoZGF0YSkgPT57XHJcbiAgY29uc3QgbWVzc2FnZSA9IGRhdGEucmVzcG9uc2VKU09OLm1lc3NhZ2U7XHJcbiAgY29udGVudC50ZXh0KG1lc3NhZ2UpO1xyXG4gIG1vZGFsLmFkZENsYXNzKFwiZXJyb3ItbW9kYWxcIik7XHJcbn0pOyovXHJcbnJlcXVlc3QuYWx3YXlzKCgpPT57XHJcbiAgJC5mYW5jeWJveC5vcGVuKHtcclxuICAgIHNyYzpcIiNtb2RhbFwiLFxyXG4gICAgdHlwZTpcImlubGluZVwiXHJcbiAgICB9KTtcclxufSk7XHJcbn1cclxufSk7XHJcblxyXG4kKFwiLmFwcC1zdWJtaXQtYnRuXCIpLmNsaWNrKChlKT0+e1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgJC5mYW5jeWJveC5jbG9zZSgpO1xyXG59XHJcbikiLCJjb25zdCBzZWN0aW9ucyA9ICQoXCJzZWN0aW9uXCIpO1xyXG5jb25zdCBkaXNwbGF5ID0gJChcIi5tYWluY29udGVudFwiKTtcclxuY29uc3Qgc2lkZU1lbnUgPSAkKFwiLmZpeGVkLW1lbnVcIik7XHJcbmNvbnN0IG1lbnVJdGVtcyA9IHNpZGVNZW51LmZpbmQoXCIuZml4ZWQtbWVudV9faXRlbVwiKTtcclxuXHJcbmNvbnN0IG1vYmlsZURldGVjdCA9IG5ldyBNb2JpbGVEZXRlY3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG5jb25zdCBpc01vYmlsZSA9IG1vYmlsZURldGVjdC5tb2JpbGUoKTtcclxuXHJcbmxldCBpblNjcm9sbCA9IGZhbHNlOyBcclxuXHJcbnNlY3Rpb25zLmZpcnN0KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblxyXG5jb25zdCBjb3VudFNlY3Rpb25Qb3NpdGlvbiA9IChzZWN0aW9uRXEpID0+IHtcclxuY29uc3QgcG9zaXRpb24gPSBzZWN0aW9uRXEgKiAtMTAwO1xyXG5cclxuaWYoaXNOYU4ocG9zaXRpb24pKSB7XHJcbiAgY29uc29sZS5lcnJvcihcItC/0LXRgNC10LTQsNC90L4g0L3QtdCy0LXRgNC90L7QtSDQt9C90LDRh9C10L3QuNC1INCyIGNvdW50U2VjdGlvblBvc2l0aW9uXCIpO1xyXG4gIHJldHVybiAwO1xyXG59XHJcblxyXG5yZXR1cm4gcG9zaXRpb247XHJcblxyXG59O1xyXG5cclxuY29uc3QgY2hhbmdlTWVudVRoZW1lRm9yU2VjdGlvbiA9IChzZWN0aW9uRXEpID0+IHtcclxuICBjb25zdCBjdXJyZW50U2VjdGlvbiA9IHNlY3Rpb25zLmVxKHNlY3Rpb25FcSk7XHJcbiAgY29uc3QgbWVudVRoZW1lID0gY3VycmVudFNlY3Rpb24uYXR0cihcImRhdGEtc2lkZW1lbnUtdGhlbWVcIik7XHJcbiAgY29uc3QgYWN0aXZlQ2xhc3MgPSBcImZpeGVkLW1lbnUtLXdoaXRlXCI7XHJcblxyXG4gIGlmIChtZW51VGhlbWUgPT09IFwid2hpdGVcIikge1xyXG4gICAgc2lkZU1lbnUuYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG4gIH1lbHNle1xyXG4gICAgc2lkZU1lbnUucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHJlc2V0QWN0aXZlQ2xhc3NGb3JJdGVtID0gKGl0ZW1zLGl0ZW1FcSwgYWN0aXZlQ2xhc3MpID0+IHtcclxuICBpdGVtcy5lcShpdGVtRXEpLmFkZENsYXNzKGFjdGl2ZUNsYXNzKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKTtcclxufTtcclxuXHJcbmNvbnN0IHBlcmZvcm1UcmFuc2l0aW9uID0gKHNlY3Rpb25FcSkgPT4ge1xyXG5cclxuICBpZiAoaW5TY3JvbGwpIHJldHVybjtcclxuXHJcbiAgY29uc3QgdHJhbnNpdGlvbk92ZXIgPSAxMDAwO1xyXG4gIGNvbnN0IG1vdXNlSW5lcnRpYUl2ZXIgPSAzMDA7XHJcblxyXG4gIGluU2Nyb2xsID0gdHJ1ZTsgXHJcblxyXG4gIGNvbnN0IHBvc2l0aW9uID0gY291bnRTZWN0aW9uUG9zaXRpb24oc2VjdGlvbkVxKTtcclxuXHJcbiAgY2hhbmdlTWVudVRoZW1lRm9yU2VjdGlvbihzZWN0aW9uRXEpO1xyXG5cclxuICBkaXNwbGF5LmNzcyh7XHJcbiAgICB0cmFuc2Zvcm06YHRyYW5zbGF0ZVkoJHtwb3NpdGlvbn0lKWAsXHJcbiAgfSk7XHJcblxyXG4gIHJlc2V0QWN0aXZlQ2xhc3NGb3JJdGVtKHNlY3Rpb25zLCBzZWN0aW9uRXEsIFwiYWN0aXZlXCIpO1xyXG5cclxuICBzZXRUaW1lb3V0KCgpID0+e1xyXG4gICAgaW5TY3JvbGwgPSBmYWxzZTtcclxuICAgIHJlc2V0QWN0aXZlQ2xhc3NGb3JJdGVtKG1lbnVJdGVtcywgc2VjdGlvbkVxLCBcImZpeGVkLW1lbnVfX2l0ZW0tLWFjdGl2ZVwiKTtcclxuICB9LCB0cmFuc2l0aW9uT3ZlciArIG1vdXNlSW5lcnRpYUl2ZXJcclxuICApO1xyXG59O1xyXG5cclxuY29uc3Qgdmlld3BvcnRTY3JvbGxlciA9ICgpID0+IHtcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gc2VjdGlvbnMuZmlsdGVyKFwiLmFjdGl2ZVwiKTtcclxuICBjb25zdCBuZXh0U2VjdGlvbiA9IGFjdGl2ZVNlY3Rpb24ubmV4dCgpO1xyXG4gIGNvbnN0IHByZXZTZWN0aW9uID0gYWN0aXZlU2VjdGlvbi5wcmV2KCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBuZXh0KCkge1xyXG4gICAgICBpZiAobmV4dFNlY3Rpb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgcGVyZm9ybVRyYW5zaXRpb24obmV4dFNlY3Rpb24uaW5kZXgoKSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwcmV2KCl7XHJcbiAgICAgIGlmIChwcmV2U2VjdGlvbi5sZW5ndGgpIHtcclxuICAgICAgICBwZXJmb3JtVHJhbnNpdGlvbihwcmV2U2VjdGlvbi5pbmRleCgpKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG5cclxuJCh3aW5kb3cpLm9uKFwid2hlZWxcIiwoZSkgPT4ge1xyXG4gIGNvbnN0IGRlbHRhWSA9IGUub3JpZ2luYWxFdmVudC5kZWx0YVk7XHJcbiAgY29uc3Qgc2Nyb2xsZXIgPSB2aWV3cG9ydFNjcm9sbGVyKCk7XHJcblxyXG4gIGlmIChkZWx0YVkgPiAwKXtcclxuICAgIHNjcm9sbGVyLm5leHQoKTtcclxuICAgICAgfVxyXG4gICAgXHJcbiAgICAgIGlmIChkZWx0YVkgPCAwKSB7XHJcbiAgICAgICAgc2Nyb2xsZXIucHJldigpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKHdpbmRvdykub24oXCJrZXlkb3duXCIsIGUgPT4ge1xyXG4gICAgICBjb25zdCB0YWdOYW1lID0gZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICBjb25zdCB1c2VyVHlwaW5nSW5JbnB1dHMgPSB0YWdOYW1lID09PSBcImlucHV0XCIgfHwgdGFnTmFtZSA9PT0gXCJ0ZXh0YXJlYVwiO1xyXG4gICAgICBjb25zdCBzY3JvbGxlciA9IHZpZXdwb3J0U2Nyb2xsZXIgKCk7XHJcblxyXG4gICAgICBpZiAodXNlclR5cGluZ0luSW5wdXRzKSByZXR1cm47IFxyXG5cclxuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcclxuICAgICAgICBjYXNlIDM4OiBcclxuICAgICAgICBzY3JvbGxlci5wcmV2KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIFxyXG4gICAgICAgIGNhc2UgNDA6XHJcbiAgICAgICAgICBzY3JvbGxlci5uZXh0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAkKFwiLndyYXBwZXJcIikub24oXCJ0b3VjaG1vdmVcIiwgZSA9PiBlLnByZXZlbnREZWZhdWx0KClcclxuKTsgXHJcblxyXG4gICAgJChcIltkYXRhLXNjcm9sbC10b11cIikuY2xpY2soZSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgXHJcbiAgICAgICQoXCIuZnVsbHNjcmVlbi1tZW51XCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcIm1lbnUtb3BlblwiKTtcclxuICAgICAgY29uc3QgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9ICR0aGlzLmF0dHIoXCJkYXRhLXNjcm9sbC10b1wiKTtcclxuICAgICAgY29uc3QgcmVxU2VjdGlvbiA9ICQoYFtkYXRhLXNlY3Rpb24taWQ9JHt0YXJnZXR9XWApO1xyXG4gICAgXHJcbiAgICAgIHBlcmZvcm1UcmFuc2l0aW9uKHJlcVNlY3Rpb24uaW5kZXgoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoaXNNb2JpbGUpIHtcclxuXHJcbiAgICAgICQoXCJib2R5XCIpLnN3aXBlKHtcclxuICAgIFxyXG4gICAgICBzd2lwZTogZnVuY3Rpb24gKGV2ZW50LCBkaXJlY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBzY3JvbGxlciA9IHZpZXdwb3J0U2Nyb2xsZXIoKTtcclxuICAgICAgICBsZXQgc2Nyb2xsRGlyZWN0aW9uID0gXCJcIjtcclxuICAgIFxyXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwidXBcIikgc2Nyb2xsRGlyZWN0aW9uID0gXCJuZXh0XCI7XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJkb3duXCIpIHNjcm9sbERpcmVjdGlvbiA9IFwicHJldlwiO1xyXG4gICAgXHJcbiAgICAgICAgc2Nyb2xsZXJbc2Nyb2xsRGlyZWN0aW9uXSgpO1xyXG4gICAgXHJcbiAgICAgIH0sXHJcbiAgICBcclxuICAgIFxyXG4gICAgICB9KTtcclxuICAgIFxyXG4gICAgfVxyXG4gICAgXHJcblxyXG5cclxuIiwibGV0IHBsYXllcjtcclxuY29uc3QgcGxheWVyQ29udGFpbmVyID0gJChcIi5wbGF5ZXJcIik7XHJcblxyXG5sZXQgZXZlbnRzSW5pdCA9ICgpID0+IHtcclxuICAkKFwiLnBsYXllcl9fc3RhcnRcIikuY2xpY2soZSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgXHJcbiAgICBpZiAocGxheWVyQ29udGFpbmVyLmhhc0NsYXNzKFwicGF1c2VkXCIpKSB7XHJcbiAgICAgIHBsYXllci5wYXVzZVZpZGVvKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwbGF5ZXIucGxheVZpZGVvKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG5cclxuICQoXCIucGxheWVyX19wbGF5YmFja1wiKS5jbGljayhlID0+IHtcclxuICBjb25zdCBiYXIgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgY29uc3QgY2xpY2tlZFBvc2l0aW9uID0gZS5vcmlnaW5hbEV2ZW50LmxheWVyWDtcclxuICBcclxuICBjb25zdCBuZXdCdXR0b25Qb3NpdGlvblBlcmNlbnQgPSAoY2xpY2tlZFBvc2l0aW9uIC8gYmFyLndpZHRoKCkpICogMTAwO1xyXG4gIGNvbnN0IG5ld1BsYXliYWNrUG9zaXRpb25TZWMgPVxyXG4gICAgKHBsYXllci5nZXREdXJhdGlvbigpIC8gMTAwKSAqIG5ld0J1dHRvblBvc2l0aW9uUGVyY2VudDtcclxuICBcclxuICAkKFwiLnBsYXllcl9fcGxheWJhY2stYnV0dG9uXCIpLmNzcyh7XHJcbiAgICBsZWZ0OiBgJHtuZXdCdXR0b25Qb3NpdGlvblBlcmNlbnR9JWBcclxuICB9KTtcclxuICBcclxuICBwbGF5ZXIuc2Vla1RvKG5ld1BsYXliYWNrUG9zaXRpb25TZWMpO1xyXG4gfSk7XHJcblxyXG4gJChcIi5wbGF5ZXJfX3NwbGFzaFwiKS5jbGljayhlID0+IHtcclxuICBwbGF5ZXIucGxheVZpZGVvKCk7XHJcbn0pO1xyXG59O1xyXG5cclxuLy/Qs9GA0L7QvNC60L7RgdGC0YxcclxuXHJcbmNvbnN0IHBsYXlWb2x1bWUgPSAkKFwiLnBsYXllcl9fdm9sdW1lXCIpO1xyXG5sZXQgaXNNdXRlZCA9IGZhbHNlOyBcclxuXHJcbiQoXCIucGxheWVyX192b2x1bWVcIikuY2xpY2soZSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIFxyXG5cclxuICBpZiAoIWlzTXV0ZWQpIHtcclxuICAgIHBsYXllci51bk11dGUoKVxyXG4gICAgaXNNdXRlZCA9IHRydWVcclxuICB9IGVsc2Uge1xyXG4gICAgcGxheWVyLm11dGUoKVxyXG4gICAgaXNNdXRlZCA9IGZhbHNlXHJcbiAgfVxyXG59KTtcclxuXHJcbiQoXCIucGxheWVyX19wbGF5YmFjay12b2x1bWVcIikuY2xpY2soZSA9PiB7XHJcbiAgY29uc3QgYmFyVm9sdW1lID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gIGNvbnN0IGNsaWNrZWRQb3NpdGlvblZvbHVtZSA9IGUub3JpZ2luYWxFdmVudC5sYXllclg7XHJcbiAgLy9jb25zdCB2b2x1bWVJbnQgPSBwbGF5ZXIuZ2V0Vm9sdW1lKCk7XHJcblxyXG4gIFxyXG4gIGNvbnN0IG5ld0J1dHRvblBvc2l0aW9uUGVyY2VudFZvbHVtZSA9IChjbGlja2VkUG9zaXRpb25Wb2x1bWUgLyBiYXJWb2x1bWUud2lkdGgoKSkgKiAxMDA7XHJcbiAgY29uc3QgbmV3UGxheWJhY2tQb3NpdGlvblNlY1ZvbHVtZSA9XHJcbiAgICAocGxheWVyLmdldFZvbHVtZSgpIC8gMTAwKSAqIG5ld0J1dHRvblBvc2l0aW9uUGVyY2VudFZvbHVtZTtcclxuICBcclxuICAkKFwiLnBsYXllcl9fdm9sdW1lLWJ1dHRvblwiKS5jc3Moe1xyXG4gICAgbGVmdDogYCR7bmV3QnV0dG9uUG9zaXRpb25QZXJjZW50Vm9sdW1lfSVgXHJcbiAgfSk7XHJcbiAgXHJcbiAgcGxheWVyLnNldFZvbHVtZSAobmV3QnV0dG9uUG9zaXRpb25QZXJjZW50Vm9sdW1lKTtcclxuIH0pO1xyXG5cclxuXHJcbiBjb25zdCBmb3JtYXRUaW1lID0gdGltZVNlYyA9PiB7XHJcbiAgY29uc3Qgcm91bmRUaW1lID0gTWF0aC5yb3VuZCh0aW1lU2VjKTtcclxuICBcclxuICBjb25zdCBtaW51dGVzID0gYWRkWmVybyhNYXRoLmZsb29yKHJvdW5kVGltZSAvIDYwKSk7XHJcbiAgY29uc3Qgc2Vjb25kcyA9IGFkZFplcm8ocm91bmRUaW1lIC0gbWludXRlcyAqIDYwKTtcclxuICBcclxuICBmdW5jdGlvbiBhZGRaZXJvKG51bSkge1xyXG4gICAgcmV0dXJuIG51bSA8IDEwID8gYDAke251bX1gIDogbnVtO1xyXG4gIH1cclxuICBcclxuICByZXR1cm4gYCR7bWludXRlc30gOiAke3NlY29uZHN9YDtcclxuIH07XHJcblxyXG5cclxuIGNvbnN0IG9uUGxheWVyUmVhZHkgPSAoKSA9PiB7XHJcbiAgbGV0IGludGVydmFsO1xyXG4gIGNvbnN0IGR1cmF0aW9uU2VjID0gcGxheWVyLmdldER1cmF0aW9uKCk7XHJcbiAgXHJcbiAgJChcIi5wbGF5ZXJfX2R1cmF0aW9uLWVzdGltYXRlXCIpLnRleHQoZm9ybWF0VGltZShkdXJhdGlvblNlYykpO1xyXG4gIFxyXG4gIGlmICh0eXBlb2YgaW50ZXJ2YWwgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG4gIH1cclxuICBcclxuICBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgIGNvbnN0IGNvbXBsZXRlZFNlYyA9IHBsYXllci5nZXRDdXJyZW50VGltZSgpO1xyXG4gICAgY29uc3QgY29tcGxldGVkUGVyY2VudCA9IChjb21wbGV0ZWRTZWMgLyBkdXJhdGlvblNlYykgKiAxMDA7XHJcblxyXG4gICAgJChcIi5wbGF5ZXJfX3BsYXliYWNrLWJ1dHRvblwiKS5jc3Moe1xyXG4gICAgICBsZWZ0OiBgJHtjb21wbGV0ZWRQZXJjZW50fSVgXHJcbiAgICB9KTtcclxuICAgXHJcbiAgXHJcbiAgICAkKFwiLnBsYXllcl9fZHVyYXRpb24tY29tcGxldGVkXCIpLnRleHQoZm9ybWF0VGltZShjb21wbGV0ZWRTZWMpKTtcclxuICB9LCAxMDAwKTtcclxuIH07XHJcblxyXG4gY29uc3Qgb25QbGF5ZXJTdGF0ZUNoYW5nZSA9IGV2ZW50ID0+IHtcclxuICAvKlxyXG4gICAgLTEgKNCy0L7RgdC/0YDQvtC40LfQstC10LTQtdC90LjQtSDQstC40LTQtdC+INC90LUg0L3QsNGH0LDRgtC+KVxyXG4gICAgMCAo0LLQvtGB0L/RgNC+0LjQt9Cy0LXQtNC10L3QuNC1INCy0LjQtNC10L4g0LfQsNCy0LXRgNGI0LXQvdC+KVxyXG4gICAgMSAo0LLQvtGB0L/RgNC+0LjQt9Cy0LXQtNC10L3QuNC1KVxyXG4gICAgMiAo0L/QsNGD0LfQsClcclxuICAgIDMgKNCx0YPRhNC10YDQuNC30LDRhtC40Y8pXHJcbiAgICA1ICjQstC40LTQtdC+INC/0L7QtNCw0Y7RgiDRgNC10L/Qu9C40LrQuCkuXHJcbiAgKi9cclxuICBzd2l0Y2ggKGV2ZW50LmRhdGEpIHtcclxuICAgIGNhc2UgMDpcclxuICAgICAgcGxheWVyQ29udGFpbmVyLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICBwbGF5ZXJDb250YWluZXIucmVtb3ZlQ2xhc3MoXCJwYXVzZWRcIik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxOlxyXG4gICAgICBwbGF5ZXJDb250YWluZXIuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgIHBsYXllckNvbnRhaW5lci5hZGRDbGFzcyhcInBhdXNlZFwiKTtcclxuICAgICAgYnJlYWs7XHJcbiAgXHJcbiAgICBjYXNlIDI6XHJcbiAgICAgIHBsYXllckNvbnRhaW5lci5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgcGxheWVyQ29udGFpbmVyLnJlbW92ZUNsYXNzKFwicGF1c2VkXCIpO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbiB9O1xyXG5cclxuZnVuY3Rpb24gb25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkoKSB7XHJcbiAgcGxheWVyID0gbmV3IFlULlBsYXllcihcInl0LXBsYXllclwiLCB7XHJcbiAgICBoZWlnaHQ6IFwiMzkyXCIsXHJcbiAgICB3aWR0aDogXCI2NjJcIixcclxuICAgIHZpZGVvSWQ6IFwiMV9mM1JjeVlkZkFcIixcclxuICAgIGV2ZW50czoge1xyXG4gICAgICBvblJlYWR5OiBvblBsYXllclJlYWR5LFxyXG4gICAgICBvblN0YXRlQ2hhbmdlOiBvblBsYXllclN0YXRlQ2hhbmdlXHJcbiAgICB9LFxyXG4gICAgcGxheWVyVmFyczoge1xyXG4gICAgICBjb250cm9sczogMCxcclxuICAgICAgZGlzYWJsZWtiOiAxLFxyXG4gICAgICBzaG93aW5mbzogMCxcclxuICAgICAgcmVsOiAwLFxyXG4gICAgICBhdXRvcGxheTogMCxcclxuICAgICAgbW9kZXN0YnJhbmRpbmc6IDBcclxuICAgIH1cclxuICB9KTtcclxuIH1cclxuXHJcbiAgZXZlbnRzSW5pdCgpOyIsImNvbnN0IHNsaWRlciA9ICQoJy5zbGlkZXJfX2xpc3QnKS5ieFNsaWRlcih7XHJcbnBhZ2VyOiBmYWxzZSxcclxuY29udHJvbHM6IGZhbHNlLCAgXHJcbn1cclxuKTtcclxuXHJcbiQoXCIuc2xpZGVyX19hcnJvdy0tbGVmdFwiKS5jbGljaygoZSk9PntcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgc2xpZGVyLmdvVG9QcmV2U2xpZGUoKTtcclxufVxyXG4pO1xyXG5cclxuJChcIi5zbGlkZXJfX2Fycm93LS1yaWdodFwiKS5jbGljaygoZSk9PntcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgc2xpZGVyLmdvVG9OZXh0U2xpZGUoKTtcclxufVxyXG4pOyIsIlxyXG5jb25zdCBmaW5kQmxvY2tCeUFsaWFzID0gKGFsaWFzKSA9PiB7XHJcbnJldHVybiAkKFwiLnJldmlld3NfX2l0ZW1cIikuZmlsdGVyKChuZHgsIGl0ZW0pID0+IHtcclxucmV0dXJuICQoaXRlbSkuYXR0cihcImRhdGEtbGlua2VkLXdpdGhcIikgPT09IGFsaWFzO1xyXG59KTtcclxufTtcclxuJChcIi5pbnRlcmFjdGl2ZS1hdmF0YXJfX2xpbmtcIikuY2xpY2soXHJcbiAgZSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgY29uc3QgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgICBjb25zdCB0YXJnZXQgPSAkdGhpcy5hdHRyKFwiZGF0YS1vcGVuXCIpO1xyXG4gICAgY29uc3QgaXRlbVRvU2hvdyA9IGZpbmRCbG9ja0J5QWxpYXModGFyZ2V0KTtcclxuICAgIGNvbnN0IGN1ckl0ZW0gPSAkdGhpcy5jbG9zZXN0KFwiLnJldmlld3NfX3N3aXRjaGVyLWl0ZW1cIik7XHJcblxyXG4gICAgaXRlbVRvU2hvdy5hZGRDbGFzcyhcImFjdGl2ZVwiKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cclxuICAgIGN1ckl0ZW0uYWRkQ2xhc3MoXCJhY3RpdmVcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICB9XHJcbik7Il19
