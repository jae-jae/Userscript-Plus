import timeago from 'timeago.js'

export default {
    timeagoFormat(time) {
        return timeago(null, 'zh_CN').format(time)
    },
    installUserJs(uri) {
        let link = parent.document.createElement("a");
        link.href = uri;
        link.click();
    },
    msg(msg) {
        app.$Message.info(msg);
    },
    dispatchEvent(eventName) {
        parent.document.getElementById('jae_fetch_userjs').dispatchEvent(new Event(eventName))
    },
    //获取油猴缓存好的脚本数据
    getData() {
        let data = sessionStorage.getItem('jae_fetch_userjs_cache');
        data = JSON.parse(data);
        return data;
    }
}