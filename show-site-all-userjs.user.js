// ==UserScript==
// @name         Show Site All UserJS | 显示当前网站所有可用的UserJS脚本 Jaeger
// @namespace    https://gist.github.com/jae-jae/39d526079cb2408389129caf98debc29
// @version      2.0
// @description  显示当前网站的所有可用UserJS(Tampermonkey)脚本,交流QQ群:104267383
// @author       Jaeger <JaegerCode@gmail.com>
// @icon         https://greasyfork.org/assets/blacklogo16-bc64b9f7afdc9be4cbfa58bdd5fc2e5c098ad4bca3ad513a27b15602083fd5bc.png
// @include        *
// @require      https://cdn.bootcss.com/babel-core/5.6.15/browser-polyfill.min.js
// @require      https://cdn.bootcss.com/babel-core/5.6.15/browser.min.js
// @require     https://raw.githubusercontent.com/jae-jae/l.js/master/userjs/l.userjs.min.js
// @require     https://gist.githubusercontent.com/jae-jae/35a1833079d26e6c9d9c6d5bed982353/raw/userjs-base.js
// @grant        GM_xmlhttpRequest
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
        this.tplBox = '<div id="jae_fetch_userjs_wrapper"><style>#jae_fetch_userjs{position:fixed;width:400px;background-color:#f5f6f7;border:1px solid #adb1bb;color:#424e67;z-index:1000;bottom:10px;right:20px;z-index:9999}#jae_fetch_userjs span{height:22px;display:inline;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-family:"microsoft yahei",tahoma,arial}#jae_fetch_userjs_info{width:380px;padding:5px 10px;font-size:14px;line-height:22px;overflow:hidden}#jae_fetch_userjs_info_file,#jae_fetch_userjs_info_count{max-width:150px;padding:0 5px;font-weight:700;color:#3b8cff}#jae_fetch_userjs i,#jae_fetch_userjs_close,#jae_fetch_userjs_switch{height:22px;background:url(data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QNvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6Q0EzRkUwOTg3REU0RTMxMTgxNUJDQzVGMjRGRTIzNTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkMzQUI4MkY5Rjg2MTFFNkE4QzdGNkM0OUY0RUZBQUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkMzQUI4MkU5Rjg2MTFFNkE4QzdGNkM0OUY0RUZBQUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowQzkyMDRGQjlGODYxMUU2QTExMkMxQkEwOUJENzExQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowQzkyMDRGQzlGODYxMUU2QTExMkMxQkEwOUJENzExQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwMBAQEBAQEBAgEBAgICAQICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//AABEIAFgATgMBEQACEQEDEQH/xACiAAEAAgEFAQEAAAAAAAAAAAAABgcIAwQFCQoBAgEBAAEEAwEAAAAAAAAAAAAAAAUCBgcIAwQJARAAAQUAAQMDAQcCBgMAAAAABAECAwUGBwARCBITFBUhFqfnaAkZIhcxQVFhcSMyJBgRAAICAQMCAgUKBQQDAAAAAAECAwQFABESEwYhBzFBIhRmUSOk5BWl5QgYGfCBkTJCYcE0FnGhsf/aAAwDAQACEQMRAD8A9C9d+9TbX12yhzHiZb6KzKnIjrq6p5XKOtbBgzJp3uhq6/iQ0hZGCwOke1nuIxrXL3VEVevQy1+Q+njqByOW7zgq1EVS7yY9UjQsQBvI+RQbFiFBPHckeG521qFB+amzctCnQ7blnnYkKqXCzttufBFpsd9gSQN9gD47DfU14t/d/n5C5gwPEdr42GZA3Z8hZ3j0w4jlJ5x2csL6/Fzz5i6InjKmlmlrDCv+4d88D09Dm90cnbqC7u/JNH212Rke9KfdSXYKGMmuKi0AiTpDC0wCyrelAEir7LhHHiDsRqU7f/Mw+a7np9tWME1aW1dirMxt8miaSQR7tGaqElGPtKWU+BHp13WdaIa2p06aadNNOmmnTTTppp0006aa8jH7bWz4U498os/seYNYfiiKeO8jxl6TNWj4dLS6z+hzdgFtzTIvkVY04VykgZjJY4ISIfTOqMkR7PaD802C797l8pLOD7JpR34pzEbUSh2tdOKaGdGqqp2kYPFxkiKs7I28ftLxbza8isn2rhPMCDJ9zWXqvEJOhISog5vHJEyzsw3QFX3RwQqsuz+Dbjez3nFOn/cxwOn4duL/AEOU0/lXitMTeXkAg0NloNHy+NeXEubFGGGngykEx7YQVKRSpY4llf6fcRjeGPHd44n8qeSxPe8FatmanZ9qBYoizFIYMa0UQnZmYGwQhaXp7RqW4LvxLHle327f8+ad/tiWabG2O4oJTJIAA0kt0SOYgACIQW4x8/bIHI7bgD1tdeMuvSDTppp0006aadNNOmmnTTTpprAST9sDwallklk4Ob6pHukejOSeXY2+p7vU70xx75sbG+pfsRqIif4InbrYxPzafmCRAi9wHiBt/wAHGn0f6mnuf/J8fXrDreQPlIzFjifEnf8A5Vwf+hY21IMf+3T4a4LV5vb5ThxtXqMjeVWlztm/fco2KV11Smw2FWd8G02xtcU4Q0dkiMnhljVWp6mqn2dRmb/M755dx4e12/mM4ZsVdryQTJ7nQTnFKpSROcdVHXkpIJRlYA+BGu3jPJHyvw+Qgy2OxfTyFaZJY294ttxkRgyNxedlOzAHZlI8PEazb6wNrK+nTTTppp0006aadNNOmmnTTVa67kiuxOgztXe1xw9PoVUZuq7sdUAW0k7IAao5ERZoZrB0iJFIvaJZPTF6velhjlqVCVJXbcer1kes/wAvX/X0A7CdvTpkeSK7baDRVdFXHEU+eVBnaruxtQfbRzvgOqgUVEmmmr3Rqksid4kk9UXq96KaOIyEKC2259XrA9R/n6v6+gjcDv6NWV1Tpp0006aadNNOmmnTTTppp001SvK2M1PIktXjoHggYGxhnk2Nh7jX2xMSK6FaIEZze8ENkNK5spTHJJHH6mMRskjCB642EZ5/5j0fJv8AL/L1D+vgNjQwJ8P8fX/H8f7hxTjNTx3LaY6d4J+BroYJMdYe41lsNEqthSiOGa3vPDWjRNbEU9yySR+lj0dJG8ghIwkPP/M+n5N/l/n6x/TwOwKCPD/H1fx/H+5urqjVenTTTppp0006aadNNOmmnTTXRJqv3u87W6K4Aynj2fps4EeSLUX9lyfFmzbcKGVzIrCWjh490DK35TWo9sXy5nNav2qi90T0KxH5BcnaxkFnM9yx1cm8atJDHQM6xsRuUEpuQl+J8C3TUEjwG3jrUTIfmvpQXZYcdhXnoq5CSPaETOoOwYxitJx39O3Nv9dcF/OT+l/8a/yk6k/2/fi37r/EddP9Wvw/9O+p6fzk/pf/ABr/ACk6ft+/Fv3X+I6fq1+H/p31PT+cn9L/AONf5SdP2/fi37r/ABHT9Wvw/wDTvqen85P6X/xr/KTp+378W/df4jp+rX4f+nfU9P5yf0v/AI1/lJ0/b9+Lfuv8R0/Vr8P/AE76np/OT+l/8a/yk6ft+/Fv3X+I6fq1+H/p31PT+cn9L/41/lJ0/b9+Lfuv8R0/Vr8P/Tvqen85P6X/AMa/yk6ft+/Fv3X+I6fq1+H/AKd9T1ztV+93nSajTE2nj4fWXVcAETmauDk+OwC0Zst3Vgn151svHgU1AodMWSbHKghjZ3C+yqRrIkjYu5+QXJw3akVPuWKWhLK6zyGgUaFRFI6OkfvrCblKqRMvUiKiTqDlxKnuV/zX0Xqzy2MK8dpEUxILQZZWMiKys/uymPihZweD8inAheQYeenr0w1pXrvNzfC3ALOL+KNPq8lnK4b/AOeeQtFqTnVEmXmPiM8Z/HKtfe/WM1xLzLaaJKvb8qTEMtZIq0+suLR8kAVmoUbZPPnK9+eY793ZjE4e7alk/wCzUoa6dQWAhXO5txF058jjI4epVx6oa6tPFPWrqsk9QTsV3Ax/avZ//XcbfyFWui/YVmWVuHRLg4vGoZOcVO68vGe2zdU9KSKaVmSGwYwDi95acWcR5bl/iTG4jiI8kTZZ++AAz3F2rPob3Xa87mHX5PPENsdjm92yZ5o9XFFGJBVAIr52sjYPEyMdmW/Jnu/vTL9k5rO5/NRrNQswu81+uk0VasmNrWJl4Vp6hHEyMzSPYl8FLM0rs0rWB5m9uds47ubGYnE4x2itQyKsdSYxSTTNclijPKaKwDuFACLFH4sAvBFVBy3k/wAPePeE424q0eJzew5BDo+NbDLai4ynImOqAc7pTd5yWFntfqJRuGiS+RKOz2olxWg3UTq2I8OgGgcoyECLL0vKXvfzK7h7pzGLz1qjjZ7GVSxXisUrMjzQJUotNWrhsmq0pY6rVp5arCdoZbksg6vTm4djzD7V7Kw2Cx1/FV7V6GCg0Mzw2YEWKRp7KxTTbUi1hHnE8cc46SyLXRDw5x8v1wzwvxod43/3J3HGWNqdGBBobldYXX77WV6Y4OoEoMqPtqZ3kFlg8nr+YNzbuEzhDKWUWT4qERQta+F6/O+e++6oPNH/AKt2/lr02MkaGL3dXp1395aRprBqyfY9hrFbG1IxJdQ2lkHU6byEh1FXaXaWBl7GXP5nH1IryiR+sy2JlMARYohPGcjCsU92dytVhC0Z4h1QboTGeWOJuNsryNxvgxszkosdSj+Qgtwbf6LJ5O8sw835M8vYLPHH6LQ8gcSC6+/qKnPVsEQstvFK8SKZWMRjHOjleze8u6cv2xlO4pbd1s5O2GaJYYbFiKNp8FjbcyJDDTyLVoZJJp3aRazKJGQMSxAaO7h7c7fx2bx+JFaqMVEMmHMksMEjLFlLdeJmlls0hPJGkcSqjTglA5A2BK5Ib3xo4wF4/wCN6wPirNu01TxTyDpJIrS64+phopWaW00TbzkK8ofMP7yQZelyF3WHyFRfeGOtDMHmV3olfXx4t7c81e7Ze5cpanzFr7KmzNOAGOK5KxHQjhMVOKbtroGxLZiniEbe5tPLHJGByRbLX9mOwu3EwtGsmMgF6LH2ZfbkrxhdpWk6lmSPNdXopFJFIXX3kRJIjbgMYB04ZewpKu8DL0md+9dEnyB7WljtSqM2cIwWYOYmouhYym1d9XMm+SBOQKeFEZFE4oIwdJRZd48vWyFvHvDi7XueR3UxymNZVDKwYLJExXqQuRwmRJIZWiZxDPBKUmTVTHzVK9tZL8HvFPxDoHMbFWBBKOAeEi78o2ZJIw4UyRSpyjaXbWLjKlqxaDDGWG2sSzoLyx5At60/MPr62UUlanEVOTZanhwnjjGtl0ZpMx7HW8DQ6mX4AUlnfQmBfuu/bbI9wJHQqpGYkpxuk4dwy9S1JYMaMULKVpRIsJFZjPcT3mdamOksquBqwLTxDPbmZxI1h1aLipB4QJDzZQwDA2XYyAzKIqzdGJrFysuru1Aa+uarFVrkVqtVWua5FRUVF7dl79lRUVOvgIYbjxB19IIOx9Os5i/Ozd0+bx2c4uzNDhUy9+BcmWF5X5Xkwq9iy+K4jwGDF9zYYueagIz+e4ernGTV0gzLM13vrFAsUTG69w/l67dvZW9lO7rdnIG3WeJUiexRWI2LWRuW22rWgJhNNkphEswcwRDph5Obk5gl84svTo1aPblaGksEyuzSCK0ZBDBTr1x89BvGY4qcXNoivVf2+KFVAr7lTyv5B5B5QP5Hrlr6WSCkTI5EYmhy1lNl8e44uxsKgRv0Aeslk0RdgU2wnmGlKIAKlr5JngySwy3L2h5Odtdt9pR9r2erOrWPebLLNYQT2eCokjfPGQCFUjMKK6xpNGllY1sKjpDdx+ZmbzXccmdrcISIujAGjicww7lmRfmwm8pZuqxRnaN2gLmEsrb+38zOXp6bJUuXlzGHHo+P1wehZnMBxlXh7IVdHuLtVsq2twlaGPTILtZIG1XplCaRG8xG/JIkf116XkZ2VHeu38uLeQlsZL3uEz3L7tWboVYvYd7bsZeVUObG6ylCsBPSjUa5rXmt3QatapjDXprFSFeXp1qirOOpO+7KtdQse05UQ+MYYNIBzdjqnCuUDhsOBg8kFPlq6UynvNlaxWs5+g22loGSx0BB9m2AD6bnMs2eR1VVjRtYPNK6YiUqZkEkF8Q9o15M/J3FmZFuWlSSKtGYwkNWCYgzBI935z2NgLFhyS6qEjSGNpFktWXuSaPER4bFo1auWjkncOWlsSxb9Is+y8Iodz0YVGyMS7tI4RktLeeTpWm0mN1WcwtNQ2+RxttTCl6qyI5NJi2mp3+k5H1XIlZJqRUhiti9BqTEAjso7aStZKsrSJS2QFQ2h295TRYnFXsPlMhPYpXb0crLXQUFNWvTgpV6UgrtuY1hrx9YwNXWcrwMaQtJE9yZnzDkvZCrksfShgs1q0iKZmNsieazJamsp1hsHMkr9MSiYxAlg7SBHSz9Z5uQ6235WrzuHa1nFnLmgtNhpcMzkrkX69NtTx4426qTaD2ooimNdE2GcMenFqTQY4opxHzQQEx2nhvIJ8LSw9mvnJT3fha0daC37jS6IqoSfdxVaNm4+JZJHsyWIpWd45lSSSJrgv8Am8mRs5GCfFR/9dyczTSwC1ZEpnZQOqZw4G/gFaNYEieMKrxllVxhdnNRc46/G0eYMfXWATi44PkQhWoxFecKRX2NPdV1gHPT6CluakyUOwBMGlBsQ5pYCIZIJXxuztlMRSzmOfF5ZBLWkCk8S8bK6MHSWJ0YSQyxSKssMsbrLDIqSRyLIisMS0shaxl1b2PYxyqW23CuCrAqySKylJEdCUkjdDHIjMjoUYqZVtOQg72ujzOPyofHmJQ5l+fmau1tbhLnUugIYtvd3NvLLaWwlBHYEhZ8Qh0raWrmexHkHl2tlZQ+B7Znx9o5XN3Hyee6ZhSeSOOPpV91PTiijAjjaYoktyRAptTqrcY68NOrVkcrmorkAoYyutLFcxI0SO785dj7bu5LusfJkrIxPQiJG7zSWJ56zRqr37J3Rv8AU5URVRqepG93f6f1ORP+V6uwkDYH16gdjqe8o7lOS+QtfvG53P5JuqvrG6bncuAldS1aHFSEfGDFR70b6Uf/AFu7p6393dk79ktztHt89q9tUu3WtWbpp10i61h+csnBQOTNsPk8B6hsNztvqX7gy327mrOYEENYWJmfpxLxjTkSdlH/AN+U7nWg3jTkVwglh9w9k2vsKe00FefLmrmEE6ipKJ+ptrgIyUNgxdbXZpinzTRudHGH2lVfQqOWs91dsCd632jRNmKeOF0E8RdJZZvd44mUMWV3n+ZVSATJ7AHIEaDt7PNEtj3K2K7xPKrGJwrRxx9Z3VioBVYvnCwJAT2vQRqLH1llVvbHZVx1dJIpKMYcJOI96hmTgFNa2eONVUU4WWGRE/8ACWNzHdnNVEl69urbXlVljlA47lGDAclDr6Cf7kZWX5VYMPAg6jp61msQtmN42O+3JSu/FirekD+1gVPyMCD4g63FlR3VONSmW1VYVoukqvrufINEmGiuqVtraUa2tY+ZjEMA+sUhg3ux+pnvjSM792OROKrkKF2WeGnNHLNVm6UwRgxil6ccvTkAPsv0pY5OJ2PB1bbZhvVYp26iQy2o3jini6kZYEB4+bx8139K843XceG6kerWzDCMPIaKAISaS6KaVowkExMzohoJCSZGwwsfIsY40L5Hr27MY1XL2RFXrsTzQVo+tYdI4wQOTEKN2IVRuSBuWIAHrJAHiRrjhimsSdKBGeUgnZQSdgCSdhudgASfkAJPgNboykuq+vqLc+otAarQRGT0NmaAWNX3cNcZJXWE9QbNEwWyiBPgfBM6Fz0imarHdnIqdcMF+jYszUa08MlusVE0aurPEXUOgkUEshdCHUMAWUhhuDvrklp3IIIrU8UiVZwxjdlYLIEbixRiNnCsCrcSdmGx8dah2fvayso7qxqLIKn0sBxOetCgyIa+7Hqz5quykqzJI2jmoBYDvhm9tzlikTs7t3TvTXyOPt3LFGrPFJdqMizRqwLxGRBIgkUHdeaEMu4HIeI38dVT0bkFaG5PFIlSwGMTlSFkCMUfg3obiwKtt6D6fSNcR139dTRUVPsVHIqoi/anZezkRUX7f8nIvdP9uvgII3Gmp7l903N5HkrKrnKC0/uHQUlKl6eF7t7mXU21zGu+RQnd+4iWLc8ohLfT/wBkUy/anbstt5ft85TM4rMe9WYvsyzLL0kbaKfq1Z63GZP8uHW6iHf2WX0ePhMY/Lijjr+N6EMnvsSR9Rl3ki4TxTbxt6uXT4MPWG/01Aurl1D69FvGYh9nxLxPa5njoreWea4eLyPsUlZnTvXtuRfFvw2zuczV1Yck8ZcsUVLaaKi0jy4yhGV2ebX1bo7aAxzjIn+YXdc1ap3nmamWyaY6paza2d5ZJk2q0s/3NNPPElG9j5ZY4ZYBG0chmumawGpyQAQOu83bsc1ntrHT4+m1uxXxRh9hYj8/ZxWFSKJ2tVbaI0scpcPGI6wjiK2UlJkXWNHmRXcjavyK4XzVNCC0x/G11Ib/AHCyGe5GpMNirjmraCiXx2d0WZu6xkIle0EQNoFYw0ydIK2vgcTNAG/K3kba7Xw/llncreaQwDKxBPc7M1KW3aixdVmhSaGeKQln6skpmnMUadS1ZkEUck62N5p185ku+cTjqQj6poyFveIIrUdeB7soErRSxSIAFCInTjEkjcYIVMjrGZZ5FY7b7jjDj0viLhek4/tMrxWfVzUHIHB3FVXoNth7rX8p1StzUurxMDcnyNU1+dJ0VhTUqjJ7em94FI3jxfKhvLHN4Dt/u3Jwd6Z2xkqlzMJIJqeVyEkNW1FWx8nz4r2j7xSkeZKUNm1z8aPTscllfoyPfGJy+YwFOXtXFQ07NbHlDHZx9RJJ68k1tNojNAOjZjWJ7EsEPDwtcotii9SpuFeV6XM+I1mHc8k6DQJnLWNs9WZruW8nHXbnc1MWd4lxGA0FNt8zl7Cg4/qg7G/1FacM8VY1VkSPbC18l5d+dnXst50wz0cVWre9QnaRa2OsF6lSQzZG1chlqz2EmuSNBToTxOJN9mcqXKrbvaPcdTHeWbJcyE8/QlG6ma5CEsWEEdOvXlSeGJoq0ayWLcLqyAbhdwgLbblOcefnPir7nP0BtfJF5MSZWr40zK6ytuK0vy056YyBQ6PkriiOrxjM+ilyWItxDEHEJDJ2SFqyxcvaEcsfl9mPtsVo7IbBCxJen93eJ17dxB35S0cgZLRm2jEMlZmkaR18XIR+HPS793404kzuhOW6SVYusrq2YvjYqlqmEg6ftmVZ1VAiN/aOS5QcmX2cqeOrIaXkqKjD4SoNxxbyTpqOo5BFv87yJYHnbGPK5CMny2NnJ1tvFopqmtNLD0FMYXVnMlNbXtiHjxL2pjsnd7nilTFGxPn7NXIUYJZKbQzUkRKxsWSvbqha8ZhWxPFHLTtRR2K7JAbJeRsiZ2/Uq4SVWyAigxMM9W1LGlhZI7LMZhDByzDEzuJTFE7pZgd4pVaUQ8Yx0O5ewoqq9BstHnvvXUhfJIkzr7UymEtjYwyFqhbY+ta22+grbewthCFMEcUCksIxgU8kZcHohlquQuY+Sri7Pudx+IEwjWVo1LDqNGj/ADfW6fMQtKssUcpSSWCxGrQyaZY6WpWtpPeh94rLuenzZA7cTwDsvt9Pnx6ioySPHyWOWJ2WRLc5mO26pX1vMGJfUcldg7Gm0w0NPnYJ8JIttXy4uyzGfqoqGZcJoQHU4EQrgCci6tOzRg7m1wQFHZXYtfAAyWuyL4m7W9pJYGMsxFsdNxaSeaQzD3uFxZmaQTR5ET18rBIDansZC5O6ZctukHc1Tp53wZJQEjBrnmpgaKNBGfd5FMMYQxtTMU1CVCIIoalC9ZI1Z2ue1OW0WJ0Vxk9ZTn0GjoDyay3qLMaUQ0M0SV0M0M0MyMe3s9i+l3b0ub2VFVFReozEZfG57GQZnDTx2cZZjWSOSNgysrDcEEbj0ekekHwPjruZDH3cVdlx2RieG9C5R0cEMrA7EEH+D6RqZ7Tmjk3kKuzVTrtTPZV2OsbW0zAsNdTVDKUy4Ez1eW4JaSurpI4IK7J1owkCqsAAwccIzIY09PUHguxO1O2rVq5haaxWb0Ucc7F5ZDKsTTOvPqu4JL2J3kbblM8rPKzsd9S+X7t7hzsNevk7LSQ1Xd4gFjj6bOI1PHpqngFijVB/bGqKsYVfDUb2W40290V9qdLY/LttKbCfbqPFECIVOLCgwf8A6IbIBUQMZPRGqtVyJ3VVVznOWUwfb+K7cxlbEYqLhSqoUj3JdlDHk3tsS3tN4t47egAAAAdHK5rI5y/PkshJys2HDPsAqkqNl9ldh7I8B4b+skkknZXepvtEJmQLmwcaJjs/91s3Ao4kCVlCl3d6RK9ijQQvJb9a0Rs/uTLJL3nVvq9DWNbz0MRjsXNbs0YxHNds+8Tndj1JulFBz9okL81DEmy8V9jfbkWJ4LmSu34q8Vt+aVYOjENlHCPm8nHwA39uR23bdva232AA1LrYaTQVedo7WyfNS5MOcLO1EA4lfV1bDHxSWBcNfXDiiSW1tIPE406RjzDVijWeWRY2emmjhMXjLdrIU4gt+44aaQlnkkKghFLuWYRxgsIogRFEGbpovJt6rmWyF6rXp2ZN6lVCsSAKqIGILEKoVS7kAySEGSQhebNxG0s23NHKHIswJGv2NlZygY8bBRfGjApYy8oLbP0P0u4iohKyK+eXfv8AnFEnNIKNMRs5EskrWuSGwHYnaXbKSR4WjFEkl5rZ5F5SthoxD1IjK0hhCwjpRpEUjiiJjjRUJBkcv3b3FnXWTKW5JGSqK/hxj5Qh+pwcRhBJyk9t2kDO7gM7MwBE5N8tPI6x2FvuTeXNRNe3tcfUWkXqr482RU2aMU6sZiowY8WLXkTxNIWGGvjjQtqEIiTp7nVv1/JryvrYSHt+vhai4+vKkkZ9szrJHvwkNoubTOoJTk0xbpkxE9P2dTMnmZ35NlJMvJk7BuSoyMPZ6RRtuSiDj0ApIDbLGBz9v+/2tUvm9Ve5DQiarOlw1ugrnlz1liyvrZ5KowoUgVtnVQlhkDVdxW/JWevNHZGVWGRxFCSQEwQyx31lMPj81jXw+TRpcbKFDoXcCRVZW6chVg0kT8eE0Tlo54i8MyyRSOjWlRyNzG3lyNJhHdQsVYKh4MwI5ICpCOu/KN1AeJwskRR0Vgdqr6XLpjpz3FZ1t+unFBLhgLWuu5gHVtiZTlkRSGU6XojYG2UY0kUdkoATimyuCEWEuHxyZb7cSIJkzW6DOpK84g/NFkVSFk6TczA0gZoBNOIigsTB/pyNxsf9mO/Kl1uqFIB4yFeLMjEFk6g49UIQJenEZAxij4/KvK6G6qNLfVdOebS46vCtNNaQDyvBpgrK7q88BMcSiezB8y5uRoI2qvqe5/2IqIvZczGNoXamOtzxx5C9I8cEZIDyskUkzhF9J4xRO7EDYAePpGqa+PvWqti5Xid6taNXlcA8UVpEiVm9Q5O6qB6STv8ALr//2Q==) no-repeat 0 0}#jae_fetch_userjs_close{width:16px;float:right;background-position:0 -22px}#jae_fetch_userjs_switch{width:78px;float:right;margin-right:10px;background-position:0 -44px}.jae_fetch_userjs_show_file #jae_fetch_userjs_switch.expand{background-position:0 -66px}.jae_fetch_userjs_show_file #jae_fetch_userjs_file_list{display:block;max-height:400px;overflow-y:scroll;}#jae_fetch_userjs i{display:inline-block;float:left;width:22px}#jae_fetch_userjs_file_list{display:none;padding:0 10px;border-top:1px solid #adb1bb;font-size:12px}#jae_fetch_userjs_file_list .jae_fetch_userjs_file{padding:10px 0;border-bottom:1px solid #dfdfdf;line-height:22px;overflow:hidden}#jae_fetch_userjs_file_list .jae_fetch_userjs_file a{float:right;text-decoration:none;color:#5a5f65}#jae_fetch_userjs_file_list .jae_fetch_userjs_file span{width:420px}.jae_fetch_userjs_file_name{cursor:pointer}.jae_fetch_userjs_file{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}#jae_fetch_userjs_home{cursor:pointer;}</style><div id="jae_fetch_userjs" class=""><div id="jae_fetch_userjs_info"><a href="javascript:void(0)" id="jae_fetch_userjs_close"></a> <a href="javascript:void(0)" id="jae_fetch_userjs_switch" class="expand"></a> <i id="jae_fetch_userjs_home"></i> <span>发现</span> <span id="jae_fetch_userjs_info_count">${count}</span><span>个脚本适用于当前页面</span></div><div id="jae_fetch_userjs_file_list">{@each list as item,index}<div class="jae_fetch_userjs_file"><a class="jae_fetch_userjs_install" href="${item.code_url}"><i></i>安装</a><span class="jae_fetch_userjs_file_name" data-url="${item.url}" title="${item.description}" >${parseInt(index)+1}.${item.name}</span><span style="color:#afa8a8;margin-left:4px;" title="${item.code_updated_at}">(${item.code_updated_at|timeago})</span></div>{@/each}</div></div></div>';
        this.timeago = new timeago(null,'zh_CN');
        juicer.register('timeago', this.timeago.format);
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

    bindEvent(){
        $('#jae_fetch_userjs_switch').click(()=>{
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
        },this.showTime*1000);
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

ljs.exec(['jQuery','juicer','timeago'],()=>{
    let fu = new FetchUserjs();
    fu.render();
});

/* jshint ignore:start */
]]></>).toString();
var c = babel.transform(inline_src);
eval(c.code);
/* jshint ignore:end */