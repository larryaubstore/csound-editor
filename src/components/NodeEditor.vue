<template>
  <div id="rete"></div>
</template>

<script>

/* eslint-disable indent, quotes, no-unused-vars, eqeqeq, no-extra-parens, no-unused-expressions  */
import Vue                from 'vue';

import Rete               from 'rete';
import ConnectionPlugin   from 'rete-connection-plugin';
import VueRenderPlugin    from 'rete-vue-render-plugin';
import ContextMenuPlugin  from 'rete-context-menu-plugin';
import AreaPlugin         from 'rete-area-plugin';
import CommentPlugin      from 'rete-comment-plugin';

import * as d3            from 'd3';
import { NumComponent }   from './nodeEditor/numComponent';
import { NumControl }     from './nodeEditor/numControl';
import { AddComponent }   from './nodeEditor/addComponent';
const numSocket = new Rete.Socket('Number value');

export default {
    name: 'NodeEditor',
    methods: {
        load: function () {
        }
    },
    mounted: function () {
        (async () => {
            var container = document.querySelector('#rete');
            var components = [new NumComponent(numSocket), new AddComponent(numSocket)];

            var editor = new Rete.NodeEditor('demo@0.1.0', container);
            editor.use(ConnectionPlugin);
            editor.use(VueRenderPlugin);
            editor.use(ContextMenuPlugin);
            editor.use(AreaPlugin);
            editor.use(CommentPlugin);

            var engine = new Rete.Engine('demo@0.1.0');

            components.map(c => {
                editor.register(c);
                engine.register(c);
            });

            var n1 = await components[0].createNode({num: 2});
            var n2 = await components[0].createNode({num: 0});
            var add = await components[1].createNode();

            n1.position = [80, 200];
            n2.position = [80, 400];
            add.position = [500, 240];

            editor.addNode(n1);
            editor.addNode(n2);
            editor.addNode(add);

            editor.connect(n1.outputs.get('num'), add.inputs.get('num1'));
            editor.connect(n2.outputs.get('num'), add.inputs.get('num2'));

            editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
              console.log('process');
                await engine.abort();
                await engine.process(editor.toJSON());
            });

            editor.view.resize();
            AreaPlugin.zoomAt(editor);
            editor.trigger('process');
        })();
    }
}
</script>

<style>

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
