<template>
  <div id="rete"></div>
</template>

<script>

export default {
    name: 'NodeEditor',
    methods: {
        load: function () {

        }
    }
}

</script>

<style>
  html, body {
    height: 100%;
    height: 100%;
  }

  .node .control input, .node .input-control input {
    width: 140px;
  }

  select, input {
    width: 100%;
    border-radius: 30px;
    background-color: white;
    padding: 2px 6px;
    border: 1px solid #999;
    font-size: 110%;
    width: 170px;
  }

  svg.connection { // dirty fix, path coordinates are incorrect with default 1px for some reason
    width: 12px;
    height: 12px;
  }

</style>
