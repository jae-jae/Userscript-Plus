/* global parent, Event, sessionStorage */

import timeago from 'timeago.js'
import fuzzy from 'fuzzy'

let config = {
  api: 'https://greasyfork.org/en/scripts/by-site/{host}.json'
}

export default {
  timeagoFormat (time) {
    let lang = (navigator.language === 'zh-CN') ? 'zh_CN' : 'en_short'
    return timeago(null, lang).format(time)
  },
  installUserJs (uri) {
    let jsStr = `
    var evt = document.createEvent('MouseEvents');
    evt.initEvent('click', true, true);
    var link = document.createElement('a');
    link.href = '${uri}';
    link.dispatchEvent(evt);
    `
    chrome.tabs.executeScript(null,{code: jsStr})
  },
  /* Nano Templates - https://github.com/trix/nano */
  nano (template, data) {
    return template.replace(/\{([\w.]*)\}/g, function (str, key) {
      let keys = key.split('.')
      let v = data[keys.shift()]
      for (let i = 0, l = keys.length; i < l; i++) v = v[keys[i]]
      return (typeof v !== 'undefined' && v !== null) ? v : ''
    })
  },

  get currentTab() {
    return new Promise(function(resolve, reject){
      let queryInfo = {
        active: true,
        currentWindow: true
      }
      
      chrome.tabs.query(queryInfo, (tabs) => {
        let tab = tabs[0]
        resolve(tab)
      });
    })
  },

  get sessionStorage () {
    return new Promise(function(resolve, reject){
      chrome.runtime.getBackgroundPage(function (bg) {
        resolve(bg.sessionStorage)
      })
    })
  },

  get host() {
    return new Promise((resolve, reject) => {
      this.currentTab.then((tab) => {
        let a = document.createElement('a');
        a.href = tab.url;
        resolve(a.hostname.split('.').splice(-2).join('.'))
      })
      
    })
  },

    // 获取油猴缓存好的脚本数据
  getData (callback) {
    this.sessionStorage.then((bgSessionStorage) => {
      this.host.then((host) => {
        let data = bgSessionStorage.getItem(host)
        if (data) {
          data = JSON.parse(data)
          callback(data)
        } else {
          let api = this.nano(config.api, {
            host: host
          })
          fetch(api)
            .then((r) => {
              r.json().then((json) => {
                bgSessionStorage.setItem(host, JSON.stringify(json))
                callback(json)
              })
            })
        }

      })
    })
   
  },

  searcher (data,query) {
    let rt = []
    for(i =0 ; i < data.length; i++) {
      let item = data[i]
      let max = null
      for(j in ['name','description','user']) {
        
      }
    }
  }
}
