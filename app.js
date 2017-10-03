'use strict';


// Global Variables //

Pix.all = [];
Pix.workingArr = [];
Pix.clickCountdown = 24;
Pix.imgEl1 = document.getElementById('one');
Pix.imgEl2 = document.getElementById('two');
Pix.imgEl3 = document.getElementById('three');
Pix.imageEls = document.getElementById('images');
Pix.ulEl = document.getElementById('results');


// Constructor and Instances //

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


// Functions //

//Generate random index from Pix.all, excluding last 3 indices
Pix.random = function(){
  return Math.floor(Math.random() * (Pix.all.length - 3));
};

//Move three random elements from Pix.all into the working array
Pix.grabImages = function(){
  var obj1 = Pix.all.splice(Pix.random(), 1);
  var obj2 = Pix.all.splice(Pix.random(), 1);
  var obj3 = Pix.all.splice(Pix.random(), 1);
  Pix.workingArr = [obj1, obj2, obj3];
  //Increase the view number for the objects chosen
  for (var i = 0; i < Pix.workingArr.length; i++){
    Pix.workingArr[i][0].viewNum++;
  }
};

//Display images on the screen
Pix.populateImgs = function(){
  Pix.imgEl1.src = Pix.workingArr[0][0].filePath;
  Pix.imgEl2.src = Pix.workingArr[1][0].filePath;
  Pix.imgEl3.src = Pix.workingArr[2][0].filePath;
};

//Concatenate the working array to the Pix.all array
Pix.reConcatArrs = function(){
  for (var i = 0; i < Pix.workingArr.length; i++){
    Pix.all = Pix.all.concat(Pix.workingArr[i][0]);
  }
};

//Clear the working array and draw new images
Pix.rePopulateImgs = function(){
  Pix.reConcatArrs();
  Pix.workingArr = [];
  Pix.grabImages();
  Pix.populateImgs();
};

//Event listener for click on one of the images
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

//Increment the vote tally for the picture chosen
Pix.clickImg1 = function(){
  Pix.workingArr[0][0].clickNum++;
  Pix.reLoad();
};

Pix.clickImg2 = function(){
  Pix.workingArr[1][0].clickNum++;
  Pix.reLoad();
};

Pix.clickImg3 = function(){
  Pix.workingArr[2][0].clickNum++;
  Pix.reLoad();
};

//Generate new images to vote on, or move to tally screen after 25 votes
Pix.reLoad = function(){
  if (Pix.clickCountdown > 0){
    Pix.rePopulateImgs();
    Pix.clickCountdown--;
    return;
  } else {
    Pix.displayResults();
  }
};

//Draw the tally screen
Pix.displayResults = function(){
  Pix.reConcatArrs();
  Pix.imageEls.innerHTML = '';
  for (var i = 0; i < Pix.all.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = Pix.all[i].clickNum + ' vote(s) for the ' + Pix.all[i].picName + ' which was viewed ' + Pix.all[i].viewNum + ' time(s).';
    Pix.ulEl.appendChild(liEl);
  }
};


// Executable Code //

Pix.grabImages();

Pix.populateImgs();
