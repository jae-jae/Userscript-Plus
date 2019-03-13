/* global parent, Event, sessionStorage */

import timeago from 'timeago.js'
import fuzzy from 'fuzzy.js'
import psl from 'psl'

let config = {
  cacheKey: 'jae_fetch_userjs_cache',
  countKey: 'jae_fetch_userjs_count',
  host: psl.get(window.location.hostname) || window.location.hostname.split('.').splice(-2).join('.'),
  api: 'https://greasyfork.org/en/scripts/by-site/{host}.json'
}


export default {
  timeagoFormat (time) {
    let lang = (navigator.language === 'zh-CN') ? 'zh_CN' : 'en_short'
    return timeago(null, lang).format(time)
  },
  installUserJs (uri) {
    let evt = parent.document.createEvent('MouseEvents')
    evt.initEvent('click', true, true)
    let link = parent.document.createElement('a')
    link.href = uri
    // link.click()
    link.dispatchEvent(evt)
  },
  dispatchEvent (eventName) {
    parent.document.getElementById('jae_userscript_box').dispatchEvent(new Event(eventName))
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
  getJSON (url, callback) {
    parent.window.GmAjax({
      method: 'GET',
      url: url,
      onload: (res) => {
        let json = JSON.parse(res.responseText)
        callback(json)
      }
    })
  },
    // 获取油猴缓存好的脚本数据
  getData (callback) {
    let data = sessionStorage.getItem(config.cacheKey)
    if (data) {
      data = JSON.parse(data)
      callback(data)
    } else {
      let api = this.nano(config.api, {
        host: config.host
      })
      this.getJSON(api, (json) => {
        sessionStorage.setItem(config.cacheKey, JSON.stringify(json))
        callback(json)
      })
    }
  },

  getCount () {
    let count = sessionStorage.getItem(config.countKey)
    return count >= 50 ? 50 : count
  },

  searcher (data,query) {
    let rt = []
    for(let i =0 ; i < data.length; i++) {
      let item = data[i]
      let max = null
      let frt = null
      for(let key of ['name','description','user']) {
        if (key === 'user') {
          frt = fuzzy(item['user']['name'],query)
        } else {
          frt = fuzzy(item[key],query)
        }
        if (max === null) {
          max = frt
        } else if (max.score < frt.score) {
          max = frt
        }
      }
      rt.push({
        item,
        'score': max.score
      })
    }
    rt = rt.filter((a) => a.score !== 0).sort((a, b) => b.score - a.score).map((a) => a.item)
    return rt
  },

  isZH () {
    let nlang = navigator.language.toLowerCase()
    if (nlang === 'zh') {
        nlang = 'zh-cn'
    }
    return nlang.search('zh-') === 0
  }
}
