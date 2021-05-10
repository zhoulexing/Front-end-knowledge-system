class Dictionnary {
    constructor() {
        this.map = {};
    }

    set(key, value) {
        this.map[key] = value;
    }

    get(key) {
        return this.map[key];
    }
}


class Graph {
    constructor() {
        this.vertices = [];
        this.adjList = new Dictionnary();
    }

    addVertex(v) {
        this.vertices.push(v);
        this.adjList.set(v, []);
    }

    addEdge(v, w) {
        this.adjList.get(v).push(w);
        this.adjList.get(w).push(v);
    }

    toString() {
        this.vertices.forEach(item => {
            console.log(`${item}--->`, this.adjList.get(item).join(" "));
        });
    }

    initColor() {
        const color = [];
        this.vertices.forEach(item => {
            color[item] = "white";
        });
        return color;
    }

    initDistance() {
        const distance = [];
        const preDistance = [];
        this.vertices.forEach(item => {
            distance[item] = 0;
            preDistance[item] = null;
        });
        return { distance, preDistance };
    }

    bfs(v, callback) {
        const color = this.initColor();
        const queue = [v];

        const { distance, preDistance } = this.initDistance();
        while(queue.length > 0) {
            const item = queue.shift();
            const adjList = this.adjList.get(item);
        
            color[item] = "grey";
            adjList.forEach(it => {
                if(color[it] === "white") {
                    distance[it] = distance[item] + 1;
                    color[it] = "grey";
                    preDistance[it] = item;
                    queue.push(it);
                }
            });
            color[item] = "black";

            if(callback) {
                callback(item);
            };
        }
        
        return { distance, preDistance };
    }

    getShortestPath() {
        
    }
}

const myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const graph = new Graph();
myVertices.forEach(item => {
    graph.addVertex(item);
});
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

graph.toString();
console.log(graph.bfs("A"));