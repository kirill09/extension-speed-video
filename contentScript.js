'use strict';

if (Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'playing') == undefined) {
    Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
      get: function(){
          return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
      }
    })
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var vids = document.getElementsByTagName('video') 
    for ( var i = 0; i < vids.length; i++ ) { 
        var currentRate = vids.item(i).playbackRate        
        console.log(currentRate)
        
        switch (message) {
            case 'toggle-info': 
                sendResponse(currentRate)
                break;
            case 'toggle-play':
                vids.item(i).play()
                break;
            case 'toggle-pause':
                if (!vids.item(i).playing) { return; }
                vids.item(i).pause()
                break;
            case 'toggle-reduce-speed':
                if (!vids.item(i).playing) { return; }
                if (currentRate > 0.5) {
                    vids.item(i).playbackRate = currentRate - 0.25
                    sendMessage(vids.item(i).playbackRate)
                }
                break;
            case 'toggle-increase-speed':
                if (!vids.item(i).playing) { return; }
                if (currentRate != 2) {
                    vids.item(i).playbackRate = currentRate + 0.25
                    sendMessage(vids.item(i).playbackRate)
                }
                break;
            default:                
                vids.item(i).playbackRate = message
        }
    }
});

function sendMessage(value) {
    chrome.runtime.sendMessage({playback_rate: value});
}
// (function() {
//     var vids = document.getElementsByTagName('video') 
//     for ( var i = 0; i < vids.length; i++ ) { 
//         vid.onratechange = function() {
//             sendMessage(this.playbackRate)
//         };
//     }
//  })();
// var vid = document.getElementById("myVideo");
// vid.onplay = function() {
//     alert("The video has started to play");
// };
// vid.onratechange = function() {myFunction()};
// function myFunction() {
//     alert("The playing speed of the video was changed");
// }
//Событеи смены скорость и передавать в экстеншен
//Событие плей и пауза