<template>
    <div>
        <transition name="custom-classes-transition" enter-active-class="animated lightSpeedIn">
            <div v-show="showTitle">
            <Card :padding="0">
                <div slot="title" @click="bodySwitch" class="card-title">
                    <Icon :type="titleIcon"></Icon>
                    <!--<span>发现 <Badge :count="count"></Badge> 个脚本适用于当前页面</span>-->
                    <i18n path="table.tips" tag="span">
                        <Badge place="count" :count="count" style="padding:0px 5px;"></Badge>
                    </i18n>
                    <span v-show="showBody">
                	- Userscript+
                </span>
                </div>
                <div slot="extra">
                <span v-show="showBody">
                    <Tooltip :content="$t('table.feedback')" placement="bottom">
                        <Button type="dashed" @click="open('https://greasyfork.org/zh-CN/scripts/24508/feedback')">
                            <Icon type="bug"></Icon>
                        </Button>
                    </Tooltip>

                    <Tooltip content="GreasyFork" placement="bottom">
                        <Button type="dashed" @click="open('https://greasyfork.org/zh-CN/scripts/24508')">
                            <Icon type="fork"></Icon>
                        </Button>
                    </Tooltip>

                    <Tooltip content="GitHub" placement="bottom">
                        <Button type="dashed" @click="open('https://github.com/jae-jae/Userscript-Plus')">
                            <Icon type="social-github"></Icon>
                        </Button>
                    </Tooltip>

                    <Tooltip :content="$t('table.donate')" placement="bottom">
                         <Button type="dashed" @click="showDonate = true">
                            <Icon type="card"></Icon>
                        </Button>
                    </Tooltip>
                </span>

                    <Tooltip :content="$t('table.close')" placement="left">
                        <Button type="dashed" @click="close">
                            <Icon type="close-round"></Icon>
                        </Button>
                    </Tooltip>

                </div>
                <transition name="custom-classes-transition" enter-active-class="animated lightSpeedIn" leave-active-class="animated bounceOutRight">
                    <div v-show="showBody">
                        <Table highlight-row :columns="columns" :data="data"></Table>
                    </div>
                </transition>
            </Card>
            <Modal v-model="showDonate" width="400">

                <Tabs value="wechat">

                    <Tab-Pane :label="$t('table.wechat')" name="wechat">
                        <div style="text-align: center;">
                            <img width="200px" src="https://ww1.sinaimg.cn/large/7de3675bly1fizyy2pivwj2074074js6.jpg">
                        </div>
                    </Tab-Pane>

                    <Tab-Pane :label="$t('table.alipay')" name="alipay">
                        <div style="text-align: center;">
                            <img width="200px" src="https://ww1.sinaimg.cn/large/7de3675bly1fizyyh7m7yj20ci0ciwfl.jpg">
                        </div>
                    </Tab-Pane>

                    <Tab-Pane :label="$t('table.paypal')" name="paypal">
                        <div style="text-align: center;">
                            <a href="https://paypal.me/jaepay/10" target="_blank">
                                <img src="https://ww1.sinaimg.cn/large/7de3675bly1fizzsw92owj207s03s748.jpg">
                            </a>
                        </div>
                    </Tab-Pane>

                </Tabs>

                <div slot="footer">
                    <Button type="info" size="large" long @click="showDonate=false">{{$t('table.closeDonate')}}</Button>
                </div>

            </Modal>
        </div>
        </transition>

        <div v-show="!showTitle" @mouseover='showTitle = true'>

            <Indicator :count="count"></Indicator>

        </div>
    </div>


</template>

<script>
	/* global Event */
    import Tools from '../common/js/tools'
    import Info from './Info.vue'
    import Indicator from './Indicator.vue'
    export default {
      components: { Info, Indicator },
      mounted: function () {
            // let host =  location.host.split('.').splice(-2).join('.');
            /* let host = 'baidu.com'
            fetch(`https://greasyfork.org/zh-CN/scripts/by-site/${host}.json`)
                .then((r) => {
                    r.json().then((json) => {
                        this.data = json
                    })
                }) */
        this.data = Tools.getData()
      },
      data: function () {
        return {
          showTitle: false,
          showBody: false,
          titleIcon: 'chevron-up',
          count: 0,
          showDonate: false,
                // 表头
          columns: [{
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(Info, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            type: 'index',
            width: 50,
            align: 'center'
          },
          {
            title: this.$t('table.title'),
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
            title: this.$t('table.author'),
            render: (h, params) => {
              return h('span', {
                attrs: {
                  title: this.$t('table.authorTips', {name: params.row.user.name})
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
            title: this.$t('table.dailyInstalls'),
            width: 105,
            key: 'daily_installs',
            sortable: true
          },
          {
            title: this.$t('table.updatedTime'),
            key: 'code_updated_at',
            render: (h, params) => {
              return h('span', Tools.timeagoFormat(params.row.code_updated_at))
            },
            sortable: true
          },
          {
            title: this.$t('table.action'),
            width: 100,
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
                      this.$Message.info(this.$t('table.scriptInstalling'))
                      Tools.installUserJs(params.row.code_url)
                    }
                  }
                }, this.$t('table.install'))
              ])
            }
          }
          ],
                // 表格数据
          data: []
        }
      },
      watch: {
        data (val) {
          this.count = val.length
        },
        showBody (val) {
          if (val) {
                    // 最大化
            this.titleIcon = 'chevron-down'
            Tools.dispatchEvent('max')
          } else {
                    // 最小化
            this.titleIcon = 'chevron-up'
            Tools.dispatchEvent('min')
          }
          window.dispatchEvent(new Event('resize'))
        }
      },
      methods: {
        close () {
          Tools.dispatchEvent('close')
        },
        bodySwitch () {
          this.showBody = !this.showBody
          setTimeout(() => {
            this.showTitle = this.showBody
          }, 500)
        },
        open (url) {
          window.open(url)
        }
      }
    }
</script>

<style>
    .card-title {
        cursor: pointer;
    }

    .ivu-card-extra {
        top: 8px;
    }

    .ivu-table-body {
        height: 400px;
        overflow-x: hidden;
    }
</style>