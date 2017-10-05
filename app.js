'use strict';


// Global Variables //

Pix.all = [];
Pix.workingArr = [];
Pix.clickCountdown = 24;
Pix.imgEl1 = document.getElementById('one');
Pix.imgEl2 = document.getElementById('two');
Pix.imgEl3 = document.getElementById('three');
Pix.imageEls = document.getElementById('images');
Pix.h1El = document.getElementById('results');
Pix.button = document.getElementById('skip-button');
Pix.buttonPress = 0;
Pix.viewArr = [];
Pix.clickArr = [];
Pix.nameArr = [];

// Constructor and Instances //

function Pix(picName, filePath){
  this.picName = picName;
  this.filePath = filePath;
  this.viewNum = 0;
  this.clickNum = 0;
  Pix.all.push(this);
}

// Check if local storage exists, populate objects based on result
if (Boolean(localStorage.remember) === true) {
  //Bring in old info that was stored
  Pix.all = JSON.parse(localStorage.pixAll);
} else {
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
  new Pix('sweep', 'assets/sweep.jpg');
  new Pix('tauntaun', 'assets/tauntaun.jpg');
  new Pix('unicorn', 'assets/unicorn.jpg');
  new Pix('usb', 'assets/usb.jpg');
  new Pix('water-can', 'assets/water-can.jpg');
  new Pix('wine-glass', 'assets/wine-glass.jpg');
}


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
  Pix.workingArr = [obj1[0], obj2[0], obj3[0]];
  //Increase the view number for the objects chosen
  for (var i = 0; i < Pix.workingArr.length; i++){
    Pix.workingArr[i].viewNum++;
  }
};

//Display images on the screen
Pix.populateImgs = function(){
  Pix.imgEl1.src = Pix.workingArr[0].filePath;
  Pix.imgEl2.src = Pix.workingArr[1].filePath;
  Pix.imgEl3.src = Pix.workingArr[2].filePath;
};

//Concatenate the working array to the Pix.all array
Pix.reConcatArrs = function(){
  // for (var i = 0; i < Pix.workingArr.length; i++){
  Pix.all = Pix.all.concat(Pix.workingArr);
  // }
};

//Clear the working array and draw new images
Pix.rePopulateImgs = function(){
  Pix.reConcatArrs();
  Pix.workingArr = [];
  Pix.grabImages();
  Pix.populateImgs();
};

//Event handler for click event
Pix.clickHandler = function(event){
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
  if (event.target.id === 'skip-button'){
    Pix.buttonEvent();
  }
};

//Increment the vote tally for the picture chosen
Pix.clickImg1 = function(){
  Pix.workingArr[0].clickNum++;
  Pix.reLoad();
};

Pix.clickImg2 = function(){
  Pix.workingArr[1].clickNum++;
  Pix.reLoad();
};

Pix.clickImg3 = function(){
  Pix.workingArr[2].clickNum++;
  Pix.reLoad();
};

//Event listener for click on one of the images
Pix.imageEls.addEventListener('click', Pix.clickHandler);

//Button Conditionals; what happens when you click the skip button.
Pix.buttonEvent = function(){
  if (Pix.buttonPress > 2){
    return alert('You can\'t skip any more images! Please pick your favorite, even if you don\'t like any.');
  }
  if (Pix.buttonPress < 2) {
    Pix.buttonPress ++;
    Pix.reLoad();
    return alert('You can skip voting on ' + (3 - Pix.buttonPress) + ' more image sets');
  }
  if (Pix.buttonPress === 2) {
    Pix.buttonPress ++;
    Pix.reLoad();
    return alert('You\'ve used up all your skips now!');
  }
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

//Populate results arrays
Pix.resultsArrays = function(){
  for (var i = 0; i < Pix.all.length; i++){
    Pix.viewArr.push(Pix.all[i].viewNum);
    Pix.clickArr.push(Pix.all[i].clickNum);
    Pix.nameArr.push(Pix.all[i].picName);
  }
};

//Draw the tally screen
Pix.displayResults = function(){
  Pix.reConcatArrs();
  Pix.resultsArrays();
  Pix.imageEls.removeEventListener('click', Pix.clickHandler);
  Pix.drawChart();
  Pix.storeData();
};

//Store data in localStorage
Pix.storeData = function(){
  localStorage.pixAll = JSON.stringify(Pix.all);
  localStorage.remember = true;
};

//Chart Data
Pix.chartData = {
  labels: Pix.nameArr,
  datasets: [
    {
      label: 'Number of Votes',
      data: Pix.clickArr,
      backgroundColor: 'forestgreen'
    }]
};

//Draw Chart
Pix.drawChart = function(){
  var newEl = document.createElement('h1');
  newEl.innerHTML = '&darr; Results: &darr;';
  Pix.h1El.appendChild(newEl);
  var newLink = document.createElement('a');
  newLink.href = 'rec.html';
  newLink.innerHTML = 'Link to Survey Summary Data';
  Pix.h1El.appendChild(newLink);
  Pix.button.parentNode.removeChild(Pix.button);
  var ctx = document.getElementById('vote-tally').getContext('2d');
  new Chart(ctx,{
    type: 'bar',
    data: Pix.chartData,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            beginAtZero: true
          }
        }]
      },
      legend: {
        labels: {
          fontColor: 'black',
          fontSize: 24
        }
      },
    },
  });
};

// Executable Code //

Pix.grabImages();

Pix.populateImgs();
