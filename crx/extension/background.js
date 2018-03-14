
const countApi = 'https://greasyfork.org/scripts/by-site.json'

function getCurrentTabUrl(callback) {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
      active: true,
      currentWindow: true
    };
  
    chrome.tabs.query(queryInfo, (tabs) => {
      // chrome.tabs.query invokes the callback with a list of tabs that match the
      // query. When the popup is opened, there is certainly a window and at least
      // one tab, so we can safely assume that |tabs| is a non-empty array.
      // A window can only have one active tab at a time, so the array consists of
      // exactly one tab.
      var tab = tabs[0];

      // A tab is a plain object that provides information about the tab.
      // See https://developer.chrome.com/extensions/tabs#type-Tab
      var url = tab.url;
  
      // tab.url is only available if the "activeTab" permission is declared.
      // If you want to see the URL of other tabs (e.g. after removing active:true
      // from |queryInfo|), then the "tabs" permission is required to see their
      // "url" properties.
      console.assert(typeof url == 'string', 'tab.url should be a string');
  
      callback(url);
    });
  
    // Most methods of the Chrome extension APIs are asynchronous. This means that
    // you CANNOT do something like this:
    //
    // var url;
    // chrome.tabs.query(queryInfo, (tabs) => {
    //   url = tabs[0].url;
    // });
    // alert(url); // Shows "undefined", because chrome.tabs.query is async.
  }

  function getUrlHostname(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.hostname
  }

  function changeBadge(data) {
    getCurrentTabUrl(function(url){
      let host =  getUrlHostname(url).split('.').splice(-2).join('.')
      let count = data[host]
      count = count > 50 ? 50 : count
      chrome.storage.local.set({'host':host})
      if(count) {
       chrome.browserAction.setBadgeText({
         text: count.toString()
       })
      }else {
        chrome.browserAction.setBadgeText({
          text: ''
        })
      }
   })
  }

fetch(countApi).then((r) => {
  r.json().then((data) => {
      alert('data loaded')
      chrome.tabs.onUpdated.addListener(() => {
        changeBadge(data)
      })
      chrome.tabs.onActivated.addListener(() => {
        changeBadge(data)
      })
  })
})