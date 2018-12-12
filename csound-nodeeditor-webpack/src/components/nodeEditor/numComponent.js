import Rete               from 'rete';
import { NumControl }     from './numControl';

export class NumComponent extends Rete.Component {
    constructor(numSocket) {
        super('Number');
        this.numSocket = numSocket;
    }

    builder(node) {
        var out1 = new Rete.Output('num', 'Number', this.numSocket);
        return node.addControl(new NumControl(this.editor, 'num')).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.data.num;
    }
}
