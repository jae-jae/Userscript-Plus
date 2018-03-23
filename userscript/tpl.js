// ==UserScript==
// @name         Userscript+ : Show Site All UserJS
// @name:zh      Userscript+ : 显示当前网站所有可用的UserJS脚本 Jaeger
// @name:zh-CN   Userscript+ : 显示当前网站所有可用的UserJS脚本 Jaeger
// @name:zh-TW   Userscript+ : 顯示當前網站所有可用的UserJS腳本 Jaeger
// @name:ja   Userscript +：現在のサイトの利用可能なすべてのUserJSスクリプトを表示するJaeger
// @namespace    https://github.com/jae-jae/Userscript-Plus
// @version      2.3.0
// @description         Show current site all UserJS，The easier way to install UserJs for Tampermonkey.
// @description:zh      显示当前网站的所有可用UserJS(Tampermonkey)脚本,交流QQ群:104267383
// @description:zh-CN   显示当前网站的所有可用UserJS(Tampermonkey)脚本,交流QQ群:104267383
// @description:zh-TW   顯示當前網站的所有可用UserJS(Tampermonkey)腳本,交流QQ群:104267383
// @description:ja   現在のサイトで利用可能なすべてのUserJS（Tampermonkey）スクリプトを表示します。
// @author       Jaeger <JaegerCode@gmail.com>
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggEBCQHM3fXsAAAAVdJREFUOMudkz2qwkAUhc/goBaGJBgUtBCZyj0ILkpwAW7Bws4yO3AHLiCtEFD8KVREkoiFxZzX5A2KGfN4F04zMN+ce+5c4LMUgDmANYBnrnV+plBSi+FwyHq9TgA2LQpvCiEiABwMBtzv95RSfoNEHy8DYBzHrNVqVEr9BWKcqNFoxF6vx3a7zc1mYyC73a4MogBg7vs+z+czO50OW60Wt9stK5UKp9Mpj8cjq9WqDTBHnjAdxzGQZrPJw+HA31oulzbAWgLoA0CWZVBKIY5jzGYzdLtdE9DlcrFNrY98zobqOA6TJKHW2jg4nU5sNBpFDp6mhVe5rsvVasUwDHm9Xqm15u12o+/7Hy0gD8KatOd5vN/v1FozTVN6nkchxFuI6hsAAIMg4OPxMJCXdtTbR7JJCMEgCJhlGUlyPB4XfumozInrupxMJpRSRtZlKoNYl+m/6/wDuWAjtPfsQuwAAAAASUVORK5CYII=
// @include        *
// @exclude      http://www.dev/Show-Site-All-UserJS/ui.html
{ljs}
// @resource     ui     https://raw.githubusercontent.com/jae-jae/Show-Site-All-UserJS/master/dist/ui.html?_={time}
// @resource     uiJs   https://raw.githubusercontent.com/jae-jae/Show-Site-All-UserJS/master/dist/ui.js?_={time}
// @resource     count  https://greasyfork.org/scripts/by-site.json
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @noframes
// @connect     cdn.bootcss.com
// @connect     raw.githubusercontent.com
// @connect     gist.githubusercontent.com
// @connect     greasyfork.org
// @run-at      document-end
// ==/UserScript==

unsafeWindow.GmAjax = GM_xmlhttpRequest;

(function() {

    {code}

})();