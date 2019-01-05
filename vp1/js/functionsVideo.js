var intro = document.querySelector('.bann_er');
var introPlayer = document.querySelector('.banner__video');

var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
if (iOS) {
  intro.style.backgroundImage = 'url("' + introPlayer.poster + '")';
  introPlayer.style.display = 'none';
}