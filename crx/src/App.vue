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
    body {
      width: 798px;
    }
    #app {
        position: fixed;
        width: 100%;
    }
</style>