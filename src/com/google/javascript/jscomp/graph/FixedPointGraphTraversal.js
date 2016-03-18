export default class FixedPointGraphTraversal {
    constructor(callback) {
        this.callback = callback;
    }

    computeFixedPoint1(graph) {
        let nodes = [];

        for (let node of graph.getDirectedGraphNodes()) {
            nodes.push(node.getValue());
        }

        this.computeFixedPoint2b(graph, nodes);
    }

    computeFixedPoint2a(graph, entry) {
        this.computeFixedPoint2b(graph, [entry]);
    }

    computeFixedPoint2b(graph, entrySey) {
        let nodeCount = graph.getNodes().length;

        let maxIterations = Math.max(nodeCount * nodeCount * nodeCount, 100);

        let workSet = [];
        for (let n of entrySet) {
            workSet.push(graph.getDirectedGraphNode(n));
        }

        let cycleCount = 0;
        for (; workSet.length > 0 && cycleCount < maxIterations; cycleCount++) {
            const source = workSet[cycleCount];

            if (source === undefined) {
                continue;
            }

            const sourceValue = source.getValue();

            delete source[cycleCount];

            const outEdges = source.source.getOutEdges();

            for (let edge of outEdges) {
                const destNode = edge.getDestination().getValue();

                if (callback.traverseEdge(sourceValue, edge.getValue(), destNode)) {
                    workSet.push(edge.getDestination());
                }
            }
        }

        Preconditions.checkState(cycleCount != maxIterations, 'Fixed point computation not halting');
    }
};
