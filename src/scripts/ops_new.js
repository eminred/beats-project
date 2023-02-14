/*const sections = $("section");
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
    */