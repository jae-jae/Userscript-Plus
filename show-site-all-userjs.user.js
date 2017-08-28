// ==UserScript==
// @name         Show Site All UserJS 
// @name:zh      显示当前网站所有可用的UserJS脚本 Jaeger
// @name:zh-CN   显示当前网站所有可用的UserJS脚本 Jaeger
// @namespace    https://gist.github.com/jae-jae/39d526079cb2408389129caf98debc29
// @version      2.0
// @description  显示当前网站的所有可用UserJS(Tampermonkey)脚本,交流QQ群:104267383
// @author       Jaeger <JaegerCode@gmail.com>
// @icon         https://greasyfork.org/assets/blacklogo16-bc64b9f7afdc9be4cbfa58bdd5fc2e5c098ad4bca3ad513a27b15602083fd5bc.png
// @include        *
// @exclude      http://www.dev/Show-Site-All-UserJS/ui.html
// @require      https://cdn.bootcss.com/babel-core/5.6.15/browser-polyfill.min.js
// @require      https://cdn.bootcss.com/babel-core/5.6.15/browser.min.js
// @require     https://raw.githubusercontent.com/jae-jae/l.js/master/userjs/l.userjs.min.js
// @require     https://gist.githubusercontent.com/jae-jae/35a1833079d26e6c9d9c6d5bed982353/raw/userjs-base.js
// @resource     ui    http://www.dev/Show-Site-All-UserJS/ui.html?xx3dd353
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @noframes
// @connect     cdn.bootcss.com
// @connect     raw.githubusercontent.com
// @connect     gist.githubusercontent.com
// @connect     greasyfork.org
// ==/UserScript==


/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
/* jshint esnext: true */

class FetchUserjs{
    constructor(){
        this.homeUrl = 'https://greasyfork.org/zh-CN/scripts/24508';
        this.api = 'https://greasyfork.org/en/scripts/by-site/${host}.json';
        this.host =  location.host.split('.').splice(-2).join('.');
        this.showTime = 10;
        this.quietKey = 'jae_fetch_userjs_quiet';
        this.cacheKey = 'jae_fetch_userjs_cache';
        this.tplBox = `<div id="jae_fetch_userjs_wrapper">
    <style>
    #jae_fetch_userjs {
        position: fixed;
        width: 350px;
        /* border: 1px solid #adb1bb; */
        bottom: 10px;
        right: 20px;
        z-index: 9999;
        height: 51px;
    }
    </style>
    <div id="jae_fetch_userjs" class="">
       
    </div>
</div>`;
    }

    getJSON(url,callback){
        GM_xmlhttpRequest({
            method:'GET',
            url:url,
            onload:(res)=>{
                let json = JSON.parse(res.responseText);
                callback(json);
            }
        });
    }

    getData(host,callback){
        
        let data = sessionStorage.getItem(this.cacheKey);
        if(data)
        {
            data = JSON.parse(data);
            callback(data);

        }else{
            let api = juicer(this.api,{host:this.host});
            this.getJSON(api,(json)=>{
                sessionStorage.setItem(this.cacheKey,JSON.stringify(json));
                callback(json);
            });
        }
        
        
    }

    setSize(w,h){
        $('#jae_fetch_userjs').css({width:w,height:h})
    }

    addEventListener(eventName,handler){
        document.getElementById('jae_fetch_userjs').addEventListener(eventName,handler)
    }

    bindEvent(){
        /*$('#jae_fetch_userjs_switch').click(()=>{
            $('#jae_fetch_userjs').toggleClass('jae_fetch_userjs_show_file');
            clearTimeout(this.timeId);
        });

        $(".jae_fetch_userjs_file_name").click(function(){
            let url = $(this).data('url');
            window.open(url);
        });

        $("#jae_fetch_userjs_close").click(()=>{
            sessionStorage.setItem(this.quietKey,1);
            $('#jae_fetch_userjs_wrapper').remove();
        });
        
        $(".jae_fetch_userjs_install").click(function(){
            $(this).html('<i></i>下载中...');
        });

        $("#jae_fetch_userjs_home").click(()=>{
            window.open(this.homeUrl);
        });

        this.timeId = setTimeout(()=>{
            $('#jae_fetch_userjs_wrapper').remove();
        },this.showTime*1000);*/
        this.addEventListener('max',()=>{
            this.setSize(860,500)
        })

        this.addEventListener('min',()=>{
            setTimeout(()=>{
                this.setSize(350,51)
            },800)
        })

        this.addEventListener('close',()=>{
            //sessionStorage.setItem(this.quietKey,1);
            $('#jae_fetch_userjs_wrapper').remove();
        })
    }

    get isQuiet(){
        let quiet = sessionStorage.getItem(this.quietKey);
        return quiet?true:false;
    }

    render(){
        this.isQuiet || this.getData(this.host,(json)=>{
            if(json.length){
                let box = juicer(this.tplBox,{list:json,count:json.length});
                $('body').append(box);
                this.bindEvent();
            }
        });
    }

}

ljs.exec(['jQuery','iframe'],()=>{
    let fu = new FetchUserjs();
    //fu.render();
    $('body').append(fu.tplBox);
    let ui = GM_getResourceText('ui');
    console.log(ui);
    //iframe.create($('#jae_fetch_userjs')[0],ui);
    let dom = document.getElementById('jae_fetch_userjs')
    var tpl = '<iframe src="about:blank" style="width:100%;height:100%;border:0px;display: block!important;" allowTransparency="true"></iframe>';
        dom.innerHTML = tpl;
        var iframeDom = dom.children[0];
        iframe.write(iframeDom,ui);
    fu.bindEvent()
});

/* jshint ignore:start */
]]></>).toString();
var c = babel.transform(inline_src);
eval(c.code);
/* jshint ignore:end */