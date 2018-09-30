// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, command);
  });
});
chrome.tabs.onActivated.addListener(function(activeInfo) {
  requestInfo(activeInfo.tabId)
});
chrome.tabs.onUpdated.addListener(function(activeInfo) {
  showSpeedIcon("")
});
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.playback_rate != undefined) {
      console.log(request.playback_rate)
      showSpeedIcon(request.playback_rate)
    }
  });

function requestInfo(tabId){
  showSpeedIcon("")
  chrome.tabs.sendMessage(tabId, "toggle-info", function (response) {
    if (response == undefined) { return; }
    showSpeedIcon(""+response)
  });
}

function showSpeedIcon(value) {
  if (typeof(value) != 'string') {
    value = "" + value
  }
  chrome.browserAction.setBadgeText({text: value});
  chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
}
