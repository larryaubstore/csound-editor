/* eslint-disable indent, no-unused-vars */
import * as d3      from 'd3';

export class Oscil {
    draw(container, nodes) {
        const g = container.append('svg:g')
//             .attr('transform', 'translate(0, -30)');

        var drag = d3.drag()
          .on('start', (d) => {
          })
          .on('drag', (d) => {
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
            .attr('style', 'fill:white;stroke:black;stroke-width:3')
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
        container.call(drag);

        // // show node IDs
        g.append('svg:text')
          .attr('x', 0)
          .attr('y', 26)
          .attr('class', 'id')
          .text((d) => 'OSCIL');
    }
}