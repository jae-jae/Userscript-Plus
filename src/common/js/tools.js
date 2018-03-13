/* global parent, Event, sessionStorage */

import timeago from 'timeago.js'

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
  sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },
    // 获取油猴缓存好的脚本数据
  getData () {
    this.dispatchEvent('fetchData')
    let data = sessionStorage.getItem('jae_fetch_userjs_cache')
    while(!data) {
      data = sessionStorage.getItem('jae_fetch_userjs_cache')
      await this.sleep(1000)
    }
    data = JSON.parse(data)
    return data
  },

  getCount () {
    return 12
  }
}
