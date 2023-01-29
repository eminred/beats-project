const openButton = document.querySelector("#openOverlay");
const successModal = createModal("");
const body = document.body;

openButton.addEventListener("click", e => {
  body.appendChild(successModal);
})

function createModal(content){
 const overlayElement = document.createElement ("div");
 overlayElement.classList.add("overlay");

   const template = document.querySelector("#overlayTemplate");

  overlayElement.innerHTML = template.innerHTML;


  const closeElement = overlayElement.querySelector(".fullscreen-menu__close");
  closeElement.addEventListener("click", e => {
    e.preventDefault();
    body.removeChild(overlayElement);
  })

    
  //const contentElement = overlayElement.querySelector(".content");
  //contentElement.innerHTML = content;

  return overlayElement;
}