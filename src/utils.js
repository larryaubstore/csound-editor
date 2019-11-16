/* eslint-disable padded-blocks */
export class Utils {

    addNode(layout, originalNode, deltaX, deltaY, nodeId, scale) {
        scale = 1;
        var nodeCloned = JSON.parse(JSON.stringify(originalNode));
        nodeCloned.id = nodeId;
        nodeCloned.isChild = true;
        nodeCloned.originalx = nodeCloned.originalx + (deltaX);
        nodeCloned.fx = nodeCloned.fx + (deltaX);
        nodeCloned.originaly = nodeCloned.originaly + (deltaY);
        nodeCloned.fy = nodeCloned.fy + (deltaY);
        layout.nodes.push(nodeCloned);
        return nodeCloned;
    }
}
