<template>
    <div class="linen-container">
        <circle-slider style="position: absolute; right: 15px;top: 15px" v-model="sliderValue"></circle-slider>
        <div style="position: absolute; right:35px; top: 55px; font-weight: bold">ZOOM</div>


        <radial-menu
              style="background-color: white"
              :itemSize="50"
              :radius="120"
              :angle-restriction="180">
                <radial-menu-item 
                  v-for="(item, index) in items" 
                  :key="index" 
                  style="background-color: white" 
                  v-on:click="handleClick(item, $event)">
                  <span>{{item}}</span>
                </radial-menu-item>
        </radial-menu>
        <div style="color: rgba(0,0,0,0.6); margin-top: 16px;">{{ lastClicked }}</div>
    </div>
</template>

<style>

    body {
      margin-top: 0px;
      margin-left: 0px;
      background-color: #ffedd6;
    }

    .linen-container {
      height: 100vh;
      background-color: white;
      position: absolute;
      left: 150px;
      top: 0px;
    }

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

    circle.node.fixed {
      fill: #f00 !important;
    }

    .vue-radial-menu-wrapper {
        position: absolute;
        top: 400px;
        right: 40px;
    }
</style>

<script>

import { Layout }                       from './layout';
import { RadialMenu,  RadialMenuItem }  from 'vue-radial-menu';
import { Oscil }                        from './d3Component/oscil';

export default {

    name: 'Editor',
    components: {
        RadialMenu,
        RadialMenuItem
    },
    mounted: function () {
        this.layout = new Layout();
        this.layout.draw();
    },
    data: function () {
        return {
            sliderValue: 50,
            items: ['oscil', 'fosil', 'linen', 'echo' ],
            lastClicked: '',
            layout: null
        };
    },
    methods: {
      handleClick (item, event) {
        switch(item) {
            case 'oscil':
                var oscil = new Oscil();

                this.layout.mousedown(event);
                break;
        }
        // this.lastClicked = item;
      }
    },
    watch: {
        sliderValue: function(newValue, oldValue) {
        }
    }
}

</script>
