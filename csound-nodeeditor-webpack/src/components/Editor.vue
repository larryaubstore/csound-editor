<template>
    <div class="linen-container">
        <circle-slider style="position: absolute" v-model="sliderValue"></circle-slider>
    </div>
</template>

<style>

    svg {
      background-color: #FFF;
      cursor: default;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
    }

    svg:not(.active):not(.ctrl) {
      cursor: crosshair;
    }

    path.link {
      fill: none;
      stroke: #000;
      stroke-width: 4px;
      cursor: default;
    }

    svg:not(.active):not(.ctrl) path.link {
      cursor: pointer;
    }

    path.link.selected {
      stroke-dasharray: 10,2;
    }

    path.link.dragline {
      pointer-events: none;
    }

    path.link.hidden {
      stroke-width: 0;
    }

    circle.node {
      stroke-width: 1.5px;
      cursor: pointer;
    }

    circle.node.reflexive {
      stroke: #000 !important;
      stroke-width: 2.5px;
    }

    text {
      font: 16px sans-serif;
      pointer-events: none;
    }

    text.id {
      text-anchor: middle;
      font-weight: bold;
    }
</style>

<script>

import { Layout }             from './layout';

export default {

    name: 'Linen',
    mounted: function () {
        var layout = new Layout();
        layout.draw();
    },
    data: function () {
        return {
            sliderValue: 75
        };
    },
    watch: {
        sliderValue: function(newValue, oldValue) {
        }
    }
}

</script>
