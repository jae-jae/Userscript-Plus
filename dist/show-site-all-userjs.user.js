// ==UserScript==
// @name         Userscript+ : Show Site All UserJS
// @name:zh      Userscript+ : 显示当前网站所有可用的UserJS脚本 Jaeger
// @name:zh-CN   Userscript+ : 显示当前网站所有可用的UserJS脚本 Jaeger
// @namespace    https://github.com/jae-jae/Userscript-Plus
// @version      2.1.0
// @description         Show current site all UserJS，The easier way to install UserJs for Tampermonkey.
// @description:zh      显示当前网站的所有可用UserJS(Tampermonkey)脚本,交流QQ群:104267383
// @description:zh-CN   显示当前网站的所有可用UserJS(Tampermonkey)脚本,交流QQ群:104267383
// @author       Jaeger <JaegerCode@gmail.com>
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggEBCQHM3fXsAAAAVdJREFUOMudkz2qwkAUhc/goBaGJBgUtBCZyj0ILkpwAW7Bws4yO3AHLiCtEFD8KVREkoiFxZzX5A2KGfN4F04zMN+ce+5c4LMUgDmANYBnrnV+plBSi+FwyHq9TgA2LQpvCiEiABwMBtzv95RSfoNEHy8DYBzHrNVqVEr9BWKcqNFoxF6vx3a7zc1mYyC73a4MogBg7vs+z+czO50OW60Wt9stK5UKp9Mpj8cjq9WqDTBHnjAdxzGQZrPJw+HA31oulzbAWgLoA0CWZVBKIY5jzGYzdLtdE9DlcrFNrY98zobqOA6TJKHW2jg4nU5sNBpFDp6mhVe5rsvVasUwDHm9Xqm15u12o+/7Hy0gD8KatOd5vN/v1FozTVN6nkchxFuI6hsAAIMg4OPxMJCXdtTbR7JJCMEgCJhlGUlyPB4XfumozInrupxMJpRSRtZlKoNYl+m/6/wDuWAjtPfsQuwAAAAASUVORK5CYII=
// @include        *
// @exclude      http://www.dev/Show-Site-All-UserJS/ui.html
// @require      https://cdn.bootcss.com/babel-core/5.6.15/browser-polyfill.min.js
// @require      https://cdn.bootcss.com/babel-core/5.6.15/browser.min.js
// @require     https://raw.githubusercontent.com/jae-jae/l.js/master/userjs/l.userjs.min.js
// @require     https://gist.githubusercontent.com/jae-jae/35a1833079d26e6c9d9c6d5bed982353/raw/userjs-base.js
// @resource     ui     https://raw.githubusercontent.com/jae-jae/Show-Site-All-UserJS/master/dist/ui.html?_=6643682D6DEB9F3D51E77F95ACD30EAE
// @resource     uiJs   https://raw.githubusercontent.com/jae-jae/Show-Site-All-UserJS/master/dist/ui.js?_=73F5B0D5151479A0055B036E66203BD8
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
            this.tplBox = '<div id="jae_userscript_box"><style>.jae-userscript{position:fixed;width:370px;bottom:10px;right:20px;z-index:9999999999;height:56px}.jae-userscript-shadow{box-shadow:0 1px 4px rgba(0,0,0,.3),\\t\\t\\t\\t0px 0 20px rgba(0,0,0,.1) inset}.jae-userscript-shadow::before,.jae-userscript-shadow::after{content:"";position:absolute;z-index:-1}.jae-userscript-shadow::before,.jae-userscript-shadow::after{content:"";position:absolute;z-index:-1;bottom:15px;left:10px;width:50%;height:20%}.jae-userscript-shadow::before,.jae-userscript-shadow::after{content:"";position:absolute;z-index:-1;bottom:15px;left:10px;width:50%;height:20%;box-shadow:0 15px 10px rgba(0,0,0,.7);transform:rotate(-3deg)}.jae-userscript-shadow::after{right:10px;left:auto;transform:rotate(3deg)}</style><div class="jae-userscript" class=""></div></div>';
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
            $('.jae-userscript').css({width:w,height:h})
        }

        addEventListener(eventName,handler){
            document.getElementById('jae_userscript_box').addEventListener(eventName,handler)
        }

        bindEvent(){
            this.timeId = setTimeout(()=>{
                $('#jae_userscript_box').remove();
            },this.showTime*1000);

            this.addEventListener('max',()=>{
                this.setSize(860,492)
                $('.jae-userscript').addClass('jae-userscript-shadow')
                clearTimeout(this.timeId);
            })

            this.addEventListener('min',()=>{
                setTimeout(()=>{
                    $('.jae-userscript').removeClass('jae-userscript-shadow')
                    this.setSize(370,56)
                },500)
            })

            this.addEventListener('close',()=>{
                sessionStorage.setItem(this.quietKey,1);
                $('#jae_userscript_box').remove();
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
                    let dom = document.getElementsByClassName('jae-userscript')[0]
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