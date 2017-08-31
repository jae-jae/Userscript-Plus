<template>
    <div>
        <Card :padding="0">
            <div slot="title" @click="bodySwitch" class="card-title">
                <Icon :type="titleIcon"></Icon>
                <span>发现 <Badge :count="count"></Badge> 个脚本适用于当前页面</span>
            </div>
            <div slot="extra">
                <span v-show="showBody">
                     <Button type="dashed" @click="open('https://greasyfork.org/zh-CN/scripts/24508/feedback')">
                        <Icon type="bug"></Icon>
                    </Button>

                    <Button type="dashed" @click="open('https://greasyfork.org/zh-CN/scripts/24508')">
                        <Icon type="fork"></Icon>
                    </Button>

                    <Button type="dashed" @click="open('https://github.com/jae-jae/Show-Site-All-UserJS')">
                        <Icon type="social-github"></Icon>
                    </Button>

                     <Button type="dashed" @click="showDonate = true">
                        <Icon type="card"></Icon>
                    </Button>
                </span>
                <Button type="dashed" @click="close">
                    <Icon type="close-round"></Icon>
                </Button>
            </div>
            <transition name="custom-classes-transition" enter-active-class="animated jello" leave-active-class="animated bounceOutRight">
                <div v-show="showBody">
                    <Table highlight-row :columns="columns" :data="data"></Table>
                </div>
            </transition>
        </Card>
        <Modal v-model="showDonate" width="400">

            <Tabs value="wechat">

                <Tab-Pane label="微信打赏" name="wechat">
                    <div style="text-align: center;">
                        <img width="200px" src="http://ww1.sinaimg.cn/large/7de3675bly1fizyy2pivwj2074074js6.jpg">
                    </div>
                </Tab-Pane>

                <Tab-Pane label="支付宝打赏" name="alipay">
                    <div style="text-align: center;">
                        <img width="200px" src="http://ww1.sinaimg.cn/large/7de3675bly1fizyyh7m7yj20ci0ciwfl.jpg">
                    </div>
                </Tab-Pane>

                <Tab-Pane label="PayPal打赏" name="paypal">
                    <div style="text-align: center;">
                        <a href="https://paypal.me/jaepay/10" target="_blank">
                            <img src="http://ww1.sinaimg.cn/large/7de3675bly1fizzsw92owj207s03s748.jpg">
                        </a>
                    </div>
                </Tab-Pane>

            </Tabs>

            <div slot="footer">
                <Button type="info" size="large" long @click="showDonate=false">关闭</Button>
            </div>

        </Modal>
    </div>
</template>

<script>
    import Tools from '../common/js/tools'
    import Info from './Info.vue'
    export default {
        components: { Info },
        mounted: function() {
            //let host =  location.host.split('.').splice(-2).join('.');
            /*let host = 'baidu.com'
            fetch(`https://greasyfork.org/zh-CN/scripts/by-site/${host}.json`)
                .then((r) => {
                    r.json().then((json) => {
                        this.data = json
                    })
                })*/
            this.data = Tools.getData()
        },
        data: ()=>{
            return {
                showBody: false,
                titleIcon: 'chevron-up',
                count: 0,
                showDonate: false,
                //表头
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
            }
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