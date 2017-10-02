'use strict';

Pix.all = [];
Pix.doNotUse = [];
Pix.workingArr = [];
Pix.clickCountdown = 25;
Pix.imgEl1 = document.getElementById('one');
Pix.imgEl2 = document.getElementById('two');
Pix.imgEl3 = document.getElementById('three');

function Pix(picName, filePath){
  this.picName = picName;
  this.filePath = filePath;
  this.viewNum = 0;
  this.clickNum = 0;
  Pix.all.push(this);
}

new Pix('bag', 'assets/bag.jpg');
new Pix('banana', 'assets/banana.jpg');
new Pix('bathroom', 'assets/bathroom.jpg');
new Pix('boots', 'assets/boots.jpg');
new Pix('breakfast', 'assets/breakfast.jpg');
new Pix('bubblegum', 'assets/bubblegum.jpg');
new Pix('chair', 'assets/chair.jpg');
new Pix('cthulhu', 'assets/cthulhu.jpg');
new Pix('dog-duck', 'assets/dog-duck.jpg');
new Pix('dragon', 'assets/dragon.jpg');
new Pix('pen', 'assets/pen.jpg');
new Pix('pet-sweep', 'assets/pet-sweep.jpg');
new Pix('scissors', 'assets/scissors.jpg');
new Pix('shark', 'assets/shark.jpg');
new Pix('sweep', 'assets/sweep.png');
new Pix('tauntaun', 'assets/tauntaun.jpg');
new Pix('unicorn', 'assets/unicorn.jpg');
new Pix('usb', 'assets/usb.gif');
new Pix('water-can', 'assets/water-can.jpg');
new Pix('wine-glass', 'assets/wine-glass.jpg');

Pix.random = function (){
  var randomIndex = Math.floor(Math.random() * Pix.all.length);
  if (Pix.doNotUse.indexOf(randomIndex) !== -1){
    Pix.random();
  }
  Pix.workingArr.push(Pix.all[randomIndex]);
  Pix.all[randomIndex].viewNum++;
  Pix.doNotUse.push(randomIndex);
};
