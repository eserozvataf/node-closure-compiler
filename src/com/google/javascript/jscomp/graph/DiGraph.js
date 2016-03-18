import Graph from 'com/google/javascript/jscomp/graph/Graph';

export default class DiGraph extends Graph {
    isConnected2(n1, n2) {
        return this.isConnectedInDirection2(n1, n2) || this.isConnectedInDirection2(n2, n1);
    }

    isConnected3(n1, e, n2) {
        return this.isConnectedInDirection3(n1, e, n2) || this.isConnectedInDirection3(n2, e, n1);
    }
};
