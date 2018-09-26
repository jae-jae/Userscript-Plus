<template>
    <div class="support-box" v-if="showSupportBox">
        <Carousel v-model="curIndex" autoplay loop dots="none" arrow="never" :autoplay-speed="10000">
            <a v-for="item in goods" :key="item.url" :href="item.url" target="_blank">
                <CarouselItem class="carouse-item">
                    {{item.title}}
                </CarouselItem>
            </a>
        </Carousel>
    </div>
</template>

<script>
import Tools from '../common/js/tools'
export default {
    data () {
        return {
            curIndex: 0,
            goods: []
        }
    },
    mounted () {
        window.fetch('https://api.jae.sh/userscript-plus')
              .then((r) => {
                return r.json()
              }).then((json) => {
                  this.goods = json
                  this.curIndex = this.random(0,json.length - 1)
              })
    },
    computed: {
        showSupportBox () {
            return this.goods.length > 0 && Tools.isZH()
        }
    },
    methods: {
        random (min, max) {
            return (Math.random() * (max - min + 1) | 0) + min
        }
    }
}
</script>

<style>
    .support-box {
        height: 28px;
        line-height: 28px;
    }
    .carouse-item {
        background-color: #ffffff;
    }
</style>
