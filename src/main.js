import Vue from 'vue'
import App from './App.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import 'animate.css'

Vue.use(iView);

let appEl = window.document.getElementById('app')

window.app = new Vue({
    el: appEl,
    render: h => h(App)
})