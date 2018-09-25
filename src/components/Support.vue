<template>
    <div>
        <Carousel autoplay loop dots="none" arrow="never" :autoplay-speed="10000">
            <a v-for="item in goods" :key="item.url" :href="item.url" target="_blank">
                <CarouselItem >
                    {{item.title}}
                </CarouselItem>
            </a>
        </Carousel>
    </div>
</template>

<script>
export default {
    data () {
        return {
            goods: [
                {
                    'title': '商品一',
                    'url': 'http://www.qq.com'
                },
                {
                    'title': '商品二',
                    'url': 'http://www.baidu.com'
                },
                {
                    'title': '商品三',
                    'url': 'http://www.52youhou.com'
                }
            ]
        }
    }
}
</script>

<style>

</style>
