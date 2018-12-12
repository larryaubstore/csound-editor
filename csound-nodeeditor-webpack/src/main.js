/* eslint-disable indent, quotes, no-unused-vars, eqeqeq */
import Vue                from 'vue';
import NodeEditor         from './components/NodeEditor.vue';

import Rete               from 'rete';
import ConnectionPlugin   from 'rete-connection-plugin';
import VueRenderPlugin    from 'rete-vue-render-plugin';
import ContextMenuPlugin  from 'rete-context-menu-plugin';
import AreaPlugin         from 'rete-area-plugin';
import CommentPlugin      from 'rete-comment-plugin';

import * as d3            from 'd3';
import { NumComponent }   from './components/nodeEditor/numComponent';
import { NumControl }     from './components/nodeEditor/numControl';
const numSocket = new Rete.Socket('Number value');

Vue.config.productionTip = false

var instance = new Vue({
  render: h => h(NodeEditor),
  mounted: function () {
    class AddComponent extends Rete.Component {
        constructor(){
            super("Add");
        }

        builder(node) {
            var inp1 = new Rete.Input('num1', "Number", numSocket);
            var inp2 = new Rete.Input('num2', "Number2", numSocket);
            var out = new Rete.Output('num', "Number", numSocket);

            inp1.addControl(new NumControl(this.editor, 'num1'))
            inp2.addControl(new NumControl(this.editor, 'num2'))

            return node
                .addInput(inp1)
                .addInput(inp2)
                .addControl(new NumControl(this.editor, 'preview', true))
                .addOutput(out);
        }

        worker(node, inputs, outputs) {
            var n1 = inputs['num1'].length ? inputs['num1'][0] : node.data.num1;
            var n2 = inputs['num2'].length ? inputs['num2'][0] : node.data.num2;
            var sum = n1 + n2;

            this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(sum);
            outputs['num'] = sum;
        }
    }

    (async () => {
        var container = document.querySelector('#rete');
        var components = [new NumComponent(numSocket), new AddComponent()];

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
});

instance.$mount('#app');
