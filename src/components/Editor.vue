<template>
    <div>


        <div class="linen-container"></div>

        <div class="right-container">
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

            <div id="btn_label" class="node-selected">OSCIL</div>
        </div>

        <div class="details-container">

            <template v-if="inputAmp">
                <label for="famp">amp</label>
                <br/>
                <input type="text" id="famp" name="amp" v-model="inputAmp" class="inputcustom" placeholder="10000">
                <br/>
            </template>

            <template v-if="inputFreq">
                <label for="ffreq">freq</label>
                <br/>
                <input type="text" id="ffreq" name="freq" v-model="inputFreq" class="inputcustom" placeholder="440">
            </template>
     
        </div>


        <div class="details-container">
            <slider min="1" max="5" step="1" v-model="scale" />
        </div>
    </div>


</template>

<style>

    body {
      margin-top: 0px;
      margin-left: 0px;
      background-color: #ffedd6;
    }

    .linen-container {
      height: 500px;
      background-color: white; 
      float: left;
      z-index: 10;
      width: 960px;
      margin: 20px;
    }

    .right-container {
      background-color: white;
      width:300px;
      height: 300px;
      float: left;
      z-index: 5;
      margin: 20px;
    }

    .details-container {
      background-color: white;
      width:300px;
      height: 300px;
      float: left;
      z-index: 5;
      margin: 20px;
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

    .selected {
        fill: red !important;
    }

    .nodevalue {
        font-weight: bold;
    }


    .vue-grid-item {
        border: 1px solid black;
    }

    .node-selected {
        position: relative;
        top: 135px;
        left: 125px;
    }
    
    .vue-radial-menu-wrapper {
        position: relative;
        top: 125px;
        left: 125px;
    }

    .inputcustom {
        width: 50%;
        margin-left: 20px;
        display: inline-block;
        border: 1px solid #ccc;
        box-shadow: inset 0 1px 3px #ddd;
        border-radius: 4px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 12px;
        padding-bottom: 12px;
    }

    label {
        margin-left: 20px;
    }
</style>

<script>

import { Layout }                       from './layout';
import { RadialMenu,  RadialMenuItem }  from 'vue-radial-menu';
import { Oscil }                        from './d3Component/oscil';
import { Buzz }                         from './d3Component/buzz';

import * as d3      from 'd3';
import VueGridLayout from 'vue-grid-layout';
import Slider from 'vue-custom-range-slider'
import 'vue-custom-range-slider/dist/vue-custom-range-slider.css';

export default {

    name: 'Editor',
    components: {
        RadialMenu,
        RadialMenuItem,
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem,
        Slider
    },
    mounted: function () {
        this.layout = new Layout(this);
        this.layout.draw();
    },
    data: function () {
        return {
            items: [ 
                 'oscil',
                 'fosil', 
                 'linen', 
                 'echo',
                 'buzz',
                 'grain',
                 'expon',
                 'linseg'
            ],
            lastClicked: '',
            layout: null,
            inputAmp: '',
            inputFreq: '',
            scale: '2'
        };
    },
    methods: {

      resetInputZone() {
        this.inputAmp = '';
        this.inputFreq = '';
      }, 
      handleClick (item, event) {
        this.resetInputZone();
        document.getElementById('btn_label').innerText = item.toUpperCase();
        switch(item) {
            case 'oscil':
                // insert new node at point
                var point = [150, 150];
                this.inputAmp = 10000;
                this.inputFreq = 440;
                var oscil = new Oscil();
                oscil.addCircle(this.layout, point);
                this.layout.restart();
                break;
            case 'buzz':
                var point = [150, 150];
                this.inputAmp = 10000;
                this.inputFreq = 440;
                var buzz = new Buzz();
                buzz.addCircle(this.layout, point);
                this.layout.restart();

                break;
        }
      }
    },
    watch: {
        sliderValue: function(newValue, oldValue) {
        },
        inputAmp: function(newValue, oldValue) {
        }, 
        inputFreq: function(newValue, oldValue) {
        },
        scale: function(newValue, oldValue) {
            this.layout.restart();
        }
    }
}

</script>
