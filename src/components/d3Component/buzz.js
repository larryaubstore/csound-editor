/* eslint-disable indent, no-unused-vars */
import * as d3      from 'd3';
import * as debug   from 'debug';
import * as _       from 'lodash';

export class Buzz {
    constructor() {
        this.log = debug('buzz');
        this.drag = null;
        this.prefix = '#buzz_';
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

        nodeCloned = JSON.parse(JSON.stringify(node));
        nodeCloned.id = layout.lastNodeId + 1;
        nodeCloned.isChild = true;
        nodeCloned.originalx = nodeCloned.originalx + 60;
        nodeCloned.fx = nodeCloned.fx + 60;
        nodeCloned.originaly = nodeCloned.originaly - 0;
        nodeCloned.fy = nodeCloned.fy - 0;
        layout.nodes.push(nodeCloned);

        nodeCloned = JSON.parse(JSON.stringify(node));
        nodeCloned.id = layout.lastNodeId + 2;
        nodeCloned.isChild = true;
        nodeCloned.originalx = nodeCloned.originalx + 30;
        nodeCloned.fx = nodeCloned.fx + 30;
        nodeCloned.originaly = nodeCloned.originaly + 90;
        nodeCloned.fy = nodeCloned.fy + 90;
        layout.nodes.push(nodeCloned);

        /***********************/
        nodeCloned = JSON.parse(JSON.stringify(node));
        nodeCloned.id = layout.lastNodeId + 3;
        nodeCloned.isChild = false;
        nodeCloned.type = 'buzz';
        nodeCloned.originalx = nodeCloned.originalx + 30;
        nodeCloned.fx = nodeCloned.fx + 30;
        nodeCloned.originaly = nodeCloned.originaly + 20;
        nodeCloned.fy = nodeCloned.fy + 20;
        nodeCloned.children =  [layout.lastNodeId, layout.lastNodeId + 1, layout.lastNodeId + 2];
        layout.nodes.push(nodeCloned);

        layout.lastNodeId = layout.lastNodeId + 3;
        nodeCloned.master = layout.lastNodeId;
    }

    draw(container, nodes, layout) {
        this.log('draw');
        const g = container.append('svg:g')
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
            return g.append('path')
            .attr('transform', 'rotate(180)')
            .attr('id', function (d) {
                return 'buzz_' + d.id;
            })
            .attr('style', 'fill:white;stroke:black;stroke-width:3;cursor:pointer;')
            .attr('d', arc({
                innerRadius: 0,
                outerRadius: rad,
                startAngle: -Math.PI * 0.5,
                endAngle: Math.PI * 0.5
            }))
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

        g.append('svg:line')
            .attr('x1', '0')
            .attr('y1', '50')
            .attr('x2', '0')
            .attr('y2', '60')
            .attr('style', 'stroke:black;stroke-width:3');

        g.append('svg:line')
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

        g.append('svg:line')
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
