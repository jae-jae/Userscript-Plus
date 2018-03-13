class FetchUserjs {
    constructor() {
        this.host = window.location.hostname.split('.').splice(-2).join('.');
        this.showTime = 10;
        this.quietKey = 'jae_fetch_userjs_quiet';
        this.countKey = 'jae_fetch_userjs_count';
        this.tplBox = '<div id="jae_userscript_box"><style>.jae-userscript{position:fixed;width:370px;bottom:10px;right:20px;z-index:9999999999;height:56px}.jae-userscript-shadow{box-shadow:0 1px 4px rgba(0,0,0,.3),\\t\\t\\t\\t0px 0 20px rgba(0,0,0,.1) inset}.jae-userscript-shadow::before,.jae-userscript-shadow::after{content:"";position:absolute;z-index:-1}.jae-userscript-shadow::before,.jae-userscript-shadow::after{content:"";position:absolute;z-index:-1;bottom:15px;left:10px;width:50%;height:20%}.jae-userscript-shadow::before,.jae-userscript-shadow::after{content:"";position:absolute;z-index:-1;bottom:15px;left:10px;width:50%;height:20%;box-shadow:0 15px 10px rgba(0,0,0,.7);transform:rotate(-3deg)}.jae-userscript-shadow::after{right:10px;left:auto;transform:rotate(3deg)}</style><div class="jae-userscript" class=""></div></div>';
    }

    getCountData(host) {
        let countData = GM_getResourceText('count')
        countData = JSON.parse(countData)
        let count =  countData[host]
        sessionStorage.setItem(this.countKey, count)
        return count
    }

    setSize(w, h) {
        $('.jae-userscript').css({
            width: w,
            height: h
        })
    }

    addEventListener(eventName, handler) {
        document.getElementById('jae_userscript_box').addEventListener(eventName, handler)
    }

    bindEvent() {
        this.timeId = setTimeout(() => {
            $('#jae_userscript_box').remove();
        }, this.showTime * 1000);

        this.addEventListener('max', () => {
            this.setSize(860, 492)
            $('.jae-userscript').addClass('jae-userscript-shadow')
            clearTimeout(this.timeId);
        })

        this.addEventListener('min', () => {
            setTimeout(() => {
                $('.jae-userscript').removeClass('jae-userscript-shadow')
                this.setSize(370, 56)
            }, 500)
        })

        this.addEventListener('close', () => {
            sessionStorage.setItem(this.quietKey, 1);
            $('#jae_userscript_box').remove();
        })

        this.addEventListener('loading',() => {
            clearTimeout(this.timeId);
        })
    }

    execFrameJs(frameWindow) {
        let uiJs = GM_getResourceText('uiJs');
        return function(jsStr) {
            frameWindow.eval(jsStr);
        }.call(frameWindow, uiJs);
    }

    get isQuiet() {
        let quiet = sessionStorage.getItem(this.quietKey);
        return quiet ? true : false;
    }

    render() {
        if (!this.isQuiet) {
            let count = this.getCountData(this.host)
            console.log('count:' + count)
            if(count) {
                $('body').append(this.tplBox);

                let ui = GM_getResourceText('ui');
                let dom = document.getElementsByClassName('jae-userscript')[0]
                var tpl = '<iframe name="jaeFetchUserJSFrame" src="about:blank" style="width:100%;height:100%;border:0px;display: block!important;" allowTransparency="true"></iframe>';
                dom.innerHTML = tpl;
                var iframeDom = dom.children[0];
                iframe.write(iframeDom, ui);

                this.execFrameJs(jaeFetchUserJSFrame.window);

                this.bindEvent();
            }
        }
    }

}

ljs.exec(['jQuery', 'iframe'], () => {
    let fu = new FetchUserjs();
    fu.render();
});