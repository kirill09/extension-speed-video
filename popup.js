'use strict';

let changeSpeedButton = document.getElementsByName('changeSpeed');

changeSpeedButton.forEach(function(item){
  item.onclick = function(element) {
    let speed = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, speed);
    });
  };
})
