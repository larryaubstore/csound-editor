/* eslint-disable indent */
import * as d3      from 'd3';

export class Linen {
    draw(container) {
        const g = container.append('svg:g')
            .attr('transform', 'translate(30, 20)');

        var halfcircle = function(x, y, rad) {
            var arc = d3.arc();
            return g.append('path')
            // .attr('transform', 'translate('+[x,y]+')')
            .attr('transform', 'rotate(180)')
            .attr('style', 'fill:none;stroke:black;stroke-width:3')
            .attr('d', arc({
                innerRadius: 0,
                outerRadius: rad,
                startAngle: -Math.PI * 0.5,
                endAngle: Math.PI * 0.5
            }));
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
          .attr('y', -35)
          .text((d) => 'amp');

        g.append('svg:line')
            .attr('x1', '30')
            .attr('y1', '0')
            .attr('x2', '30')
            .attr('y2', '-10')
            .attr('style', 'stroke:black;stroke-width:3');
        g.append('svg:text')
          .attr('x', 20)
          .attr('y', -35)
          .text((d) => 'freq');

        halfcircle(0, 0, 50).style('opacity', 1.0);

        // // show node IDs
        g.append('svg:text')
          .attr('x', 0)
          .attr('y', 26)
          .attr('class', 'id')
          .text((d) => 'OSCIL');
    }
}
