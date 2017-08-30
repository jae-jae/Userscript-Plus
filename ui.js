  !(function(window) {
      let expand = `
    <div>
    <Row style="margin-bottom: 16px;">
        <Col span="8">
        <span class="expand-key">版本：</span>
        <span class="expand-value">{{ row.version }}</span>
        </Col>
        <Col span="8">
        <span class="expand-key">评分：</span>
        <span class="expand-value">{{ row.fan_score }}</span>
        </Col>
        <Col span="8">
        <span class="expand-key">总安装量：</span>
        <span class="expand-value">{{ row.total_installs }}</span>
        </Col>
    </Row>
    <Row>
        <Col span="24">
        <span class="expand-key">描述：</span>
        <span class="expand-value">{{ row.description }}</span>
        </Col>
        </Row>
    </div>
        `
      let expandRow = {
          template: expand,
          props: {
              row: Object
          }
      }
      let Tools = {
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
          },

          //带缓存的ajax
          gmAjax(url, cb) {
              let val = GM_getValue(url, '')
              if (val === '') {
                  GM_xmlhttpRequest({
                      method: "GET",
                      url: url,
                      onload: (res) => {
                          GM_setValue(url, res.responseText)
                          cb(res.responseText)
                      },
                      onerror: () => {
                          throw new Error('Get file Fail:' + url);
                      }
                  });
              } else {
                  cb(val)
              }

          },
          //执行JS文件
          execJs(url) {
              return new Promise((resolve, reject) => {
                  this.gmAjax(url, (content) => {
                      eval.call(window, content)
                      resolve()
                  })
              })
          },
          //执行CSS文件
          execCss(url) {
              return new Promise((resolve, reject) => {
                  this.gmAjax(url, (content) => {
                      let css = content,
                          head = window.document.head || window.document.getElementsByTagName('head')[0],
                          style = window.document.createElement('style');

                      style.type = 'text/css';

                      //修复iview字体路径
                      css = css.replace(/url\(fonts/g, 'url(https://cdn.bootcss.com/iview/2.2.0/styles/fonts')

                      if (style.styleSheet) {
                          style.styleSheet.cssText = css;
                      } else {
                          style.appendChild(window.document.createTextNode(css));
                      }

                      head.appendChild(style);
                      resolve()
                  })
              })
          }
      }

      let createApp = function(appEl) {
          return new Vue({
              el: appEl,
              components: { expandRow },
              mounted: function() {
                  /*let host =  location.host.split('.').splice(-2).join('.');
                  fetch(`https://greasyfork.org/zh-CN/scripts/by-site/${host}.json`)
                      .then((r) => {
                          r.json().then((json) => {
                              this.data = json
                          })
                      })*/
                  this.data = Tools.getData()
              },
              data: {
                  showBody: false,
                  titleIcon: 'chevron-up',
                  count: 0,
                  showDonate: false,
                  //表头
                  columns: [{
                          type: 'expand',
                          width: 50,
                          render: (h, params) => {
                              return h(expandRow, {
                                  props: {
                                      row: params.row
                                  }
                              })
                          }
                      },
                      {
                          type: 'index',
                          width: 60,
                          align: 'center'
                      },
                      {
                          title: '标题',
                          key: 'name',
                          width: '35%',
                          ellipsis: false,
                          render: (h, params) => {
                              return h('span', {
                                  attrs: {
                                      title: params.row.description
                                  },
                                  style: {
                                      cursor: 'pointer'
                                  },
                                  on: {
                                      click: _ => {
                                          window.open(params.row.url)
                                      }
                                  }
                              }, params.row.name)
                          }
                      },
                      {
                          title: '作者',
                          render: (h, params) => {
                              return h('span', {
                                  attrs: {
                                      title: `点击访问${params.row.user.name}主页`
                                  },
                                  style: {
                                      cursor: 'pointer'
                                  },
                                  on: {
                                      click: _ => {
                                          window.open(params.row.user.url)
                                      }
                                  }
                              }, params.row.user.name)
                          }
                      },
                      {
                          title: '今日安装',
                          key: 'daily_installs',
                          sortable: true
                      },
                      {
                          title: '更新时间',
                          key: 'code_updated_at',
                          render: (h, params) => {
                              return h('span', Tools.timeagoFormat(params.row.code_updated_at))
                          },
                          sortable: true
                      },
                      {
                          title: '操作',
                          key: 'code_url',
                          align: 'center',
                          render: (h, params) => {
                              return h('div', [
                                  h('Button', {
                                      props: {
                                          type: 'primary',
                                          size: 'small',
                                          icon: 'ios-download-outline'
                                      },
                                      style: {
                                          marginRight: '5px'
                                      },
                                      on: {
                                          click: (event) => {
                                              Tools.msg('脚本安装中...')
                                              Tools.installUserJs(params.row.code_url)
                                          }
                                      }
                                  }, '安装')
                              ])
                          }
                      }
                  ],
                  //表格数据
                  data: []
              },
              watch: {
                  data(val) {
                      this.count = val.length
                  },
                  showBody(val) {
                      if (val) {
                          //最大化
                          this.titleIcon = 'chevron-down'
                          Tools.dispatchEvent('max')
                      } else {
                          //最小化
                          this.titleIcon = 'chevron-up'
                          Tools.dispatchEvent('min')
                      }
                      window.dispatchEvent(new Event('resize'))
                  }
              },
              methods: {
                  close() {
                      Tools.dispatchEvent('close')
                  },
                  bodySwitch() {
                      this.showBody = !this.showBody
                  },
                  open(url) {
                      window.open(url)
                  }
              }
          });
      }
      let app
      Tools.execJs('https://cdn.bootcss.com/vue/2.4.2/vue.js')
          .then(_ => {
              return Tools.execJs('https://cdn.bootcss.com/iview/2.2.0/iview.js')
          })
          .then(_ => {
              return Tools.execJs('https://cdn.bootcss.com/timeago.js/2.0.3/timeago.min.js')
          })
          .then(_ => {
              return Tools.execCss('https://cdn.bootcss.com/iview/2.2.0/styles/iview.css').then(_ => {
                  return Tools.execCss('https://cdn.bootcss.com/animate.css/3.5.2/animate.min.css')
              })
          })
          .then(_ => {
              let appEl = window.document.getElementById('app')
              app = createApp(appEl)
          })
  })(this)