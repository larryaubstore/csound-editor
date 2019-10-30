/* eslint-disable padded-blocks */
export class Utils {

    addNode(layout, originalNode, deltaX, deltaY, nodeId, scale) {
        var nodeCloned = JSON.parse(JSON.stringify(originalNode));
        nodeCloned.id = nodeId;
        nodeCloned.isChild = true;
        nodeCloned.originalx = nodeCloned.originalx + (deltaX * scale);
        nodeCloned.fx = nodeCloned.fx + (deltaX * scale);
        nodeCloned.originaly = nodeCloned.originaly + (deltaY * scale);
        nodeCloned.fy = nodeCloned.fy + (deltaY * scale);
        layout.nodes.push(nodeCloned);
        return nodeCloned;
    }
}
