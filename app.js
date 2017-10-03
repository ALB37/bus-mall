'use strict';

Pix.all = [];
Pix.doNotUse = [];
Pix.workingArr = [];
Pix.clickCountdown = 25;
Pix.imgEl1 = document.getElementById('1');
Pix.imgEl2 = document.getElementById('2');
Pix.imgEl3 = document.getElementById('3');
Pix.imageEls = document.getElementById('images');
Pix.ulEl = document.getElementById('results');

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

Pix.random = function(){
  var randomIndex = Math.floor(Math.random() * Pix.all.length);
  if (Pix.doNotUse.indexOf(randomIndex) !== -1){
    Pix.random();
  }
  Pix.workingArr.push(Pix.all[randomIndex]);
  Pix.doNotUse.push(randomIndex);
  Pix.all[randomIndex].viewNum++;
};

Pix.populateImgs = function(){
  for (var i = 1; i < 4; i++){
    Pix.random();
    var currentImg = document.getElementById(toString(i));
    currentImg.src = Pix.workingArr[i].filePath;
  }
};

Pix.rePopulateImgs = function(){
  for (var i = 0; i < 3; i++){
    Pix.workingArr.shift();
  }
  Pix.populateImgs();
};

Pix.bufferClear = function(){
  for (var i = 0; i < 3; i++){
    Pix.doNotUse.shift();
  }
};

Pix.imgEl1.addEventListener('click', Pix.clickImg1);
Pix.imgEl2.addEventListener('click', Pix.clickImg2);
Pix.imgEl3.addEventListener('click', Pix.clickImg3);

Pix.clickImg1 = function(){
  Pix.all[Pix.doNotUse[0]].clickNum++;
  Pix.reLoad();
};

Pix.clickImg2 = function(){
  Pix.all[Pix.doNotUse[1]].clickNum++;
  Pix.reLoad();
};

Pix.clickImg3 = function(){
  Pix.all[Pix.doNotUse[2]].clickNum++;
  Pix.reLoad();
};

Pix.reLoad = function(){
  if (Pix.clickCountdown > 0){
    Pix.rePopulateImgs();
    Pix.bufferClear();
    Pix.clickCountdown--;
    return;
  } else {
    Pix.displayResults();
  }
};

Pix.displayResults = function(){
  Pix.imageEls.innerHTML = '';
  for (var i = 0; i < Pix.all.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = Pix.all[i].clickNum + ' votes for the ' + Pix.all[i].picName;
    Pix.ulEl.appendChild(liEl);
  }
};

Pix.populateImgs();
