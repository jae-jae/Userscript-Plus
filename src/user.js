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
// @resource     ui     https://raw.githubusercontent.com/jae-jae/Show-Site-All-UserJS/master/dist/ui.html
// @resource     uiJs   https://raw.githubusercontent.com/jae-jae/Show-Site-All-UserJS/master/dist/ui.js
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
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
            this.tplBox = '<div id="jae_fetch_userjs_wrapper"><style>    #jae_fetch_userjs {        position: fixed;        width: 370px;                bottom: 10px;        right: 20px;        z-index: 9999999999;        height: 51px;box-shadow: 0px 1px 4px rgba(0,0,0,0.3),\t\t\t\t0px 0px 20px rgba(0,0,0,0.1) inset;    }#jae_fetch_userjs::before,#jae_fetch_userjs::after {   content:"";   position:absolute;   z-index:-1;}#jae_fetch_userjs::before,#jae_fetch_userjs::after {   content:"";   position:absolute;   z-index:-1;   bottom:15px;   left:10px;   width:50%;   height:20%;}#jae_fetch_userjs::before,#jae_fetch_userjs::after {   content:"";   position:absolute;   z-index:-1;   bottom:15px;   left:10px;   width:50%;   height:20%;   box-shadow:0 15px 10px rgba(0, 0, 0, 0.7);   transform:rotate(-3deg);}#jae_fetch_userjs::after{   right:10px;   left:auto;   transform:rotate(3deg); }</style><div id="jae_fetch_userjs" class=""></div></div>';
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
            this.timeId = setTimeout(()=>{
                $('#jae_fetch_userjs_wrapper').remove();
            },this.showTime*1000);

            this.addEventListener('max',()=>{
                this.setSize(860,492)
                clearTimeout(this.timeId);
            })

            this.addEventListener('min',()=>{
                setTimeout(()=>{
                    this.setSize(370,51)
                },800)
            })

            this.addEventListener('close',()=>{
                sessionStorage.setItem(this.quietKey,1);
                $('#jae_fetch_userjs_wrapper').remove();
            })
        }

        execFrameJs(frameWindow){
            let uiJs = GM_getResourceText('uiJs');
            return function(jsStr){
                frameWindow.eval(jsStr);
            }.call(frameWindow,uiJs);
        }

        get isQuiet(){
            let quiet = sessionStorage.getItem(this.quietKey);
            return quiet?true:false;
        }

        render(){
            this.isQuiet || this.getData(this.host,(json)=>{
                if(json.length){

                    $('body').append(this.tplBox);

                    let ui = GM_getResourceText('ui');
                    let dom = document.getElementById('jae_fetch_userjs')
                    var tpl = '<iframe name="jaeFetchUserJSFrame" src="about:blank" style="width:100%;height:100%;border:0px;display: block!important;" allowTransparency="true"></iframe>';
                    dom.innerHTML = tpl;
                    var iframeDom = dom.children[0];
                    iframe.write(iframeDom,ui);

                    this.execFrameJs(jaeFetchUserJSFrame.window);

                    this.bindEvent();
                }
            });
        }

    }

    ljs.exec(['jQuery','juicer','iframe'],()=>{
        let fu = new FetchUserjs();
        fu.render();
    });

/* jshint ignore:start */
]]></>).toString();
var c = babel.transform(inline_src);
eval(c.code);
/* jshint ignore:end */