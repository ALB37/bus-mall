'use strict';

var user = document.getElementById('user');

function clearTable(){
  user.innerHTML = '';
};

function newElement(type, content, parent){
  var newEl = document.createElement(type);
  newEl.textContent = content;
  parent.appendChild(newEl);
};

function makeHeaderRow(){
  var trEl = document.createElement('tr');
  newElement('th', 'Product', trEl);
  newElement('th', 'Views', trEl);
  newElement('th', 'Clicks', trEl);
  newElement('th', '% of Clicks When Viewed', trEl);
  newElement('th', 'Recommended?', trEl);
  user.appendChild(trEl);
};

function tableData(){
  for (var i = 0; i < JSON.parse(localStorage.pixAll).length; i++){
    var trEl = document.createElement('tr');
    var name = JSON.parse(localStorage.pixAll)[i].picName;
    var views = JSON.parse(localStorage.pixAll)[i].viewNum;
    var clicks = JSON.parse(localStorage.pixAll)[i].clickNum;
    var percent = Math.round(((parseInt(clicks) / parseInt(views)) * 100));
    newElement('th', name, trEl);
    newElement('td', views, trEl);
    newElement('td', clicks, trEl);
    newElement('td', (percent + '%'), trEl);
    if (percent > 33){
      newElement('td', 'YES', trEl);
    } else {
      newElement('td', 'NO', trEl);
    }
    user.appendChild(trEl);
  }
};

clearTable();
makeHeaderRow();
tableData();
