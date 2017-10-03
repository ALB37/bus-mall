'use strict';

Pix.all = [];
// Pix.doNotUse = [];
Pix.workingArr = [];
Pix.clickCountdown = 25;
Pix.imgEl1 = document.getElementById('one');
Pix.imgEl2 = document.getElementById('two');
Pix.imgEl3 = document.getElementById('three');
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
  return Math.floor(Math.random() * (Pix.all.length - 3));
};

// if (Pix.doNotUse.indexOf(randomIndex) !== -1){
//   Pix.random();
// }
Pix.grabImages = function(){
  var obj1 = Pix.all.splice(Pix.random(), 1);
  var obj2 = Pix.all.splice(Pix.random(), 1);
  var obj3 = Pix.all.splice(Pix.random(), 1);
  Pix.workingArr = [obj1, obj2, obj3];
  for (var i = 0; i < Pix.workingArr.length; i++){
    Pix.workingArr[i][0].viewNum++;
  }
  // Pix.workingArr.push(Pix.all[randomIndex]);
  // Pix.doNotUse.push(randomIndex);
  // Pix.all[randomIndex].viewNum++;
};

Pix.populateImgs = function(){
  // Pix.random();
  Pix.imgEl1.src = Pix.workingArr[0][0].filePath;
  // Pix.random();
  Pix.imgEl2.src = Pix.workingArr[1][0].filePath;
  // Pix.random();
  Pix.imgEl3.src = Pix.workingArr[2][0].filePath;
  // }
};

Pix.rePopulateImgs = function(){
  for (var i = 0; i < Pix.workingArr.length; i++){
    Pix.all = Pix.all.concat(Pix.workingArr[i][0]);
  }
  for (var j = 0; j < Pix.workingArr.length; j++){
    Pix.workingArr.shift();
  }
  Pix.grabImages();
  Pix.populateImgs();
};

// Pix.bufferClear = function(){
//   for (var i = 0; i < Pix.doNotUse.length; i++){
//     Pix.doNotUse.shift();
//   }
// };

// Pix.imgEl1.addEventListener('click', Pix.clickImg1);
// Pix.imgEl2.addEventListener('click', Pix.clickImg2);
// Pix.imgEl3.addEventListener('click', Pix.clickImg3);
Pix.imageEls.addEventListener('click', function(event){
  console.log(event.target.id);
  if (event.target.id === 'one'){
    Pix.clickImg1();
  };
  if (event.target.id === 'two'){
    Pix.clickImg2();
  };
  if (event.target.id === 'three'){
    Pix.clickImg3();
  };
});

Pix.clickImg1 = function(){
  console.log('Hey!');
  Pix.workingArr[0][0].clickNum++;
  Pix.reLoad();
};

Pix.clickImg2 = function(){
  console.log('Hey!');
  Pix.workingArr[1][0].clickNum++;
  Pix.reLoad();
};

Pix.clickImg3 = function(){
  console.log('Hey!');
  Pix.workingArr[2][0].clickNum++;
  Pix.reLoad();
};

Pix.reLoad = function(){
  if (Pix.clickCountdown > 0){
    Pix.rePopulateImgs();
    // Pix.bufferClear();
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
    liEl.textContent = Pix.all[i].clickNum + ' vote(s) for the ' + Pix.all[i].picName + ' which was viewed ' + Pix.all[i].viewNum + ' time(s).';
    Pix.ulEl.appendChild(liEl);
  }
};
Pix.grabImages();
Pix.populateImgs();


var wtf = document.getElementById('wtf');
wtf.addEventListener('click', function(event){
  console.log('wtf', event.target);
});
