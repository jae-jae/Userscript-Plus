/* global parent, Event, sessionStorage */

import timeago from 'timeago.js'

export default {
  timeagoFormat (time) {
    let lang = (navigator.language === 'zh-CN') ? 'zh_CN' : 'en_short'
    return timeago(null, lang).format(time)
  },
  installUserJs (uri) {
    HTMLElement.prototype.click = function() {
       let evt = parent.ownerDocument.createEvent('MouseEvents')
       evt.initMouseEvent('click', true, true, parent.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null)
       parent.dispatchEvent(evt)
    } 
    let link = parent.document.createElement('a')
    link.href = uri
    link.click()
  },
  dispatchEvent (eventName) {
    parent.document.getElementById('jae_userscript_box').dispatchEvent(new Event(eventName))
  },
    // 获取油猴缓存好的脚本数据
  getData () {
    let data = sessionStorage.getItem('jae_fetch_userjs_cache')
    data = JSON.parse(data)
    return data
  }
}
