/* eslint-disable indent, no-unused-vars */
import * as d3      from 'd3';
import * as debug   from 'debug';

export class Oscil {
    constructor() {
        this.log = debug('oscil');
        this.drag = null;
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
        nodeCloned.originalx = nodeCloned.originalx + 30;
        nodeCloned.fx = nodeCloned.fx + 30;
        nodeCloned.originaly = nodeCloned.originaly + 20;
        nodeCloned.fy = nodeCloned.fy + 20;
        nodeCloned.children =  [layout.lastNodeId, layout.lastNodeId + 1, layout.lastNodeId + 2];
        layout.nodes.push(nodeCloned);

        layout.lastNodeId = layout.lastNodeId + 3;
    }

    draw(container, nodes) {
        this.log('draw');
        const g = container.append('svg:g')
//             .attr('transform', 'translate(0, -30)');

        this.drag = d3.drag()
          .on('start', (d) => {
          })
          .on('drag', (d) => {
            this.log('drag');
            d.fx = d3.event.x;
            d.fy = d3.event.y;

            var deltax = d.originalx - d.fx;
            var deltay = d.originaly - d.fy;

            if (d.children) {
                for (var i = 0; i < d.children.length; i++) {
                    var index = d.children[i];
                    nodes[index].fx = nodes[index].originalx - deltax;
                    nodes[index].fy = nodes[index].originaly - deltay;
                }
            }
          })
          .on('end', (d) => {
          });

        var halfcircle = function(x, y, rad) {
            var arc = d3.arc();
            return g.append('path')
            .attr('transform', 'rotate(180)')
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
                } else {
                    d3.select(this).attr('class', 'selected');
                }
            })
            .on('keydown', function (d) {
                debugger;
                switch (d3.event.keyCode) {
                    case 46: // deletei
                        debugger;
                    break;
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
          .attr('y', -45)
          .text((d) => 'amp');

        g.append('svg:line')
            .attr('x1', '30')
            .attr('y1', '0')
            .attr('x2', '30')
            .attr('y2', '-10')
            .attr('style', 'stroke:black;stroke-width:3');
        g.append('svg:text')
          .attr('x', 20)
          .attr('y', -45)
          .text((d) => 'freq');

        var elem = halfcircle(0, 0, 50).style('opacity', 1.0);
        // elem.call(drag);
        container.call(this.drag);

        // // show node IDs
        g.append('svg:text')
          .attr('x', 0)
          .attr('y', 26)
          .attr('class', 'id')
          .text((d) => 'OSCIL');
    }
}
