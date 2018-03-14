<template>
    <div id="app">
        <MainTable></MainTable>
    </div>
</template>

<script>
    import MainTable from './components/Table.vue'
    export default {
      components: {MainTable},
      mounted: function () {
    
      }
    }
</script>

<style>
    #app {
        position: fixed;
        width: 100%;
    }
</style>