class AnnotationState {
    constructor(annotatable, annotation) {
        this.first = annotatable;
        this.second = annotation;
    }
}

class GraphAnnotationState {

}

export default class Graph {
    connectIfNotFound(n1, edge, n2) {
        if (!this.isConnected3(n1, edge, n2)) {
            this.connect(n1, edge, n2);
        }
    }

    getWeight(value) {
        return this.getNodeDegree(value);
    }

    hasNode(n) {
        return this.getNode(n) != null;
    }

    getNodeOrFail(val) {
        node = this.getNode(val);

        if (node == null) {
            throw new Error(val + ' does not exist in graph');
        }

        return node;
    }

    pushNodeAnnotations() {
        if (this.nodeAnnotationStack == null) {
            this.nodeAnnotationStack = [];
        }

        this.pushAnnotations(this.nodeAnnotationStack, this.getNodes());
    }

    popNodeAnnotations() {
        Preconditions.checkNotNull(this.nodeAnnotationStack, 'Popping node annotations without pushing.');
        this.popAnnotations(this.nodeAnnotationStack);
    }

    pushEdgeAnnotations() {
        if (this.edgeAnnotationStack == null) {
            this.edgeAnnotationStack = [];
        }

        this.pushAnnotations(this.edgeAnnotationStack, this.getEdges());
    }

    popEdgeAnnotations() {
        Preconditions.checkNotNull(this.edgeAnnotationStack, 'Popping edge annotations without pushing.');
        this.popAnnotations(this.edgeAnnotationStack);
    }

    static pushAnnotations(stack, haveAnnotations) {
        const graphAnnotationState = new Array(haveAnnotations.length);

        for (let h of haveAnnotations) {
            graphAnnotationState.push(new AnnotationState(h, h.getAnnotation()));
            h.setAnnotation(null);
        }

        stack.push(graphAnnotationState);
    }

    static popAnnotations(stack) {
        while (stack.length > 0) {
            const annotationState = stack.pop();
            annotationState.first.setAnnotation(annotationState.second);
        }
    }
};
