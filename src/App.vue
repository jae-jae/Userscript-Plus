<template>
    <div id="app">
        <MainTable></MainTable>
    </div>
</template>

<script>
    import MainTable from './components/Table.vue'
    export default {
      components: {MainTable},
      mounted: function(){
      	//旧版本无法正常工作，更新脚本
      	if(!parent.document.getElementById('jae_userscript_box')){
      		parent.window.open('https://greasyfork.org/scripts/24508-userscript-show-site-all-userjs/code/Userscript+%20:%20Show%20Site%20All%20UserJS.user.js')
      		
      	}
      }
    }
</script>

<style>
    #app {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
    }
</style>