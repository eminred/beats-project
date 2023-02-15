document.getElementById('openOverlay').onclick = function(event) {
  event.preventDefault();
  
  document.getElementById('overlayTemplate').classList.add('active');
  document.getElementById('body').classList.add('menu-open');
}



document.getElementById('close').onclick = function() {
  document.getElementById('overlayTemplate').classList.remove('active');
  document.getElementById('body').classList.remove('menu-open');
}



