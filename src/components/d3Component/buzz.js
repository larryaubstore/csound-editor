/* eslint-disable indent, no-unused-vars */
import * as d3      from 'd3';
import * as debug   from 'debug';
import * as _       from 'lodash';
import { Utils }    from '../../utils';

export class Buzz {
    constructor() {
        this.log = debug('buzz');
        this.drag = null;
        this.prefix = '#buzz_';
        this.utils = new Utils();
    }

    addCircle(layout, point) {
        this.log('addCircle');

        var nodeCloned = null;
        const node = { id: ++layout.lastNodeId,
                     reflexive: false,
                     isChild: true,
                     x: point[0],
                     y: point[1],
                     fx: point[0],
                     fy: point[1],
                     originalx: point[0],
                     originaly: point[1]
                    };
        nodeCloned = JSON.parse(JSON.stringify(node));
        layout.nodes.push(nodeCloned);

        this.utils.addNode(layout, node, 60, 0, layout.lastNodeId + 1, layout.getEditor().scale);
        this.utils.addNode(layout, node, 30, 90, layout.lastNodeId + 2, layout.getEditor().scale);
        nodeCloned = this.utils.addNode(layout, node, 30, 20, layout.lastNodeId + 3, layout.getEditor().scale);
        nodeCloned.isChild = false;
        nodeCloned.type = 'buzz';
        nodeCloned.children =  [layout.lastNodeId, layout.lastNodeId + 1, layout.lastNodeId + 2];
        layout.lastNodeId = layout.lastNodeId + 3;
        nodeCloned.master = layout.lastNodeId;
    }

    draw(container, nodes, layout) {
        this.log('draw');
        const g = container.append('svg:g')
             .attr('transform', 'scale(' + layout.getEditor().scale + ')');
//             .attr('transform', 'translate(0, -30)');

        this.drag = d3.drag()
          .on('start', (d) => {
          })
          .on('drag', (d) => {
            this.log('drag');
            if (layout.selectedComponent !== null) {
                d3.select(this.prefix + layout.selectedComponent.id).attr('class', '');
                layout.selectedComponent = d;
                d3.select(this.prefix + layout.selectedComponent.id).attr('class', 'selected');
            } else {
                layout.selectedComponent = d;
                d3.select(this.prefix + layout.selectedComponent.id).attr('class', 'selected');
            }

            d.fx = d3.event.x;
            d.fy = d3.event.y;

            var deltax = d.originalx - d.fx;
            var deltay = d.originaly - d.fy;

            if (d.children) {
                for (var i = 0; i < d.children.length; i++) {
                    var index = d.children[i];
                    var nodeToMove = _.find(nodes, function (o) {
                        return o.id === index;
                    });
                    nodeToMove.fx = nodeToMove.originalx - deltax;
                    nodeToMove.fy = nodeToMove.originaly - deltay;
                }
            }
          })
          .on('end', (d) => {
          });

        var halfcircle = function(x, y, rad) {
            var arc = d3.arc();
            return g.append('rect')
            .attr('transform', 'translate(-80, -10)')
            .attr('id', function (d) {
                return 'buzz_' + d.id;
            })
            .attr('style', 'fill:white;stroke:black;stroke-width:3;cursor:pointer;')
            .attr('x', 10)
            .attr('y', 10)
            .attr('width', 140)
            .attr('height', 50)
            .on('mouseover', function (d) {
                // enlarge target node
                // d3.select(this).attr('transform', 'scale(1.1) rotate(180)');
            })
            .on('mouseout', function (d) {
                // unenlarge target node
                // d3.select(this).attr('transform', 'rotate(180)');
            })
            .on('click', function (d) {
                var classAttr = d3.select(this).attr('class');
                if (classAttr === 'selected') {
                    d3.select(this).attr('class', '');
                    layout.selectedComponent = null;
                } else {
                    if (layout.selectedComponent !== null) {
                        d3.select('#buzz_' + layout.selectedComponent.id).attr('class', '');
                    }
                    d3.select(this).attr('class', 'selected');
                    layout.selectedComponent = d;
                }
            });
       };

        var out = g.append('svg:line')
            .attr('x1', '0')
            .attr('y1', '50')
            .attr('x2', '0')
            .attr('y2', '60')
            .attr('style', 'stroke:black;stroke-width:3');

        var amp = g.append('svg:line')
            .attr('x1', '-30')
            .attr('y1', '0')
            .attr('x2', '-30')
            .attr('y2', '-10')
            .attr('style', 'stroke:black;stroke-width:3');
        g.append('svg:text')
          .attr('x', -45)
          .attr('y', -65)
          .text((d) => 'amp');
        g.append('svg:text')
          .attr('x', -45)
          .attr('y', -45)
          .attr('class', 'nodevalue')
          .text((d) => layout.getEditor().inputAmp);

        var freq = g.append('svg:line')
            .attr('x1', '30')
            .attr('y1', '0')
            .attr('x2', '30')
            .attr('y2', '-10')
            .attr('style', 'stroke:black;stroke-width:3');
        g.append('svg:text')
          .attr('x', 20)
          .attr('y', -65)
          .text((d) => 'freq');
        g.append('svg:text')
          .attr('x', 20)
          .attr('y', -45)
          .attr('class', 'nodevalue')
          .text((d) => layout.getEditor().inputFreq);

        var knh = g.append('svg:line')
          .attr('x1', '60')
          .attr('y1', '0')
          .attr('x2', '60')
          .attr('y2', '-10')
          .attr('style', 'stroke:black;stroke-width:9');

        //  total number of harmonics requested

        var elem = halfcircle(0, 0, 50).style('opacity', 1.0);
        // elem.call(drag);
        container.call(this.drag);

        // // show node IDs
        g.append('svg:text')
          .attr('x', 0)
          .attr('y', 26)
          .attr('class', 'id')
          .text((d) => 'BUZZ');
    }
}
