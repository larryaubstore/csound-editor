<template>
    <div>
        <div class="linen-container">

        </div>

        <div class="right-container">

            
            <v-btn color="blue" 
                   v-on:click="selectNode()"
                   active-class="pushed_button"
                   id="oscil_btn">OSCIL</v-btn>
              
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
      height: 100vh;
      /* background-color: white; */
      position: absolute;
      left: 150px;
      top: 0px;
      z-index: 10;
    }

    .right-container {
      background-color: white;
      width:600px;
      height: 300px;
      right: 30px;
      position: absolute;
      z-index: 5;
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
        top: 150px;
        right: 300px;
    }

    #oscil_btn {
        position: absolute;
        top: 250px;
        left: 225px;
 
    }

    .selected {
        fill: red !important;
    }

    .nodevalue {
        font-weight: bold;
    }
</style>

<script>

import { Layout }                       from './layout';
import { RadialMenu,  RadialMenuItem }  from 'vue-radial-menu';
import { Oscil }                        from './d3Component/oscil';
import * as d3      from 'd3';
import 'vuetify/dist/vuetify.min.css';

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
            layout: null
        };
    },
    methods: {
      handleClick (item, event) {
        // document.getElementById('oscil_btn').className = 'v-btn theme--light red';
        document.getElementById('oscil_btn').innerText = item;
        switch(item) {
            case 'oscil':
                // insert new node at point
                const point = [event.x - 150, event.y - 50];
                var oscil = new Oscil();
                oscil.addCircle(this.layout, point);
                this.layout.restart();
                //this.layout.mousedown(event);
                break;
        }
        // this.lastClicked = item;
      },
      selectNode() {
          document.getElementById('oscil_btn').className = 'v-btn theme--light red';
      }
    },
    watch: {
        sliderValue: function(newValue, oldValue) {
        }
    }
}

</script>
