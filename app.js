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
  // Pix.imageEls.innerHTML = '';
  Pix.imageEls.removeEventListener('click', Pix.clickHandler);
  // for (var i = 0; i < Pix.all.length; i++){
  //   var liEl = document.createElement('li');
  //   liEl.textContent = Pix.all[i].clickNum + ' vote(s) for the ' + Pix.all[i].picName + ' which was viewed ' + Pix.all[i].viewNum + ' time(s).';
  //   Pix.ulEl.appendChild(liEl);
  // }
  Pix.drawChart();
};

Pix.chartData = {
  labels: Pix.nameArr,
  datasets: [
    {
      label: 'Number of Votes',
      data: Pix.clickArr,
      backgroundColor: 'black'
    }]
};

Pix.drawChart = function(){
  var ctx = document.getElementById('vote-tally').getContext('2d');
  new Chart(ctx,{
    type: 'bar',
    data: Pix.chartData,
    options: {
      legend: {
        labels: {
          fontColor: 'black',
          fontSize: 24
        }
        // responsive: false
      },
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 25,
          min: 0,
          stepSize: 1.0
        }
      }]
    }
  });
};
// Executable Code //

Pix.grabImages();

Pix.populateImgs();
