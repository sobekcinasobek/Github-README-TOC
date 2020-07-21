chrome.webNavigation.onHistoryStateUpdated.addListener(function () {
        chrome.tabs.executeScript(null, {file: 'src/main.js'});
},{url: [{hostSuffix: 'github.com'}]});
