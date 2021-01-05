class Recursion {
    constructor() {
        this.node = {
            value: 3,
            children: [
                {
                    value: 4,
                    children: [{
                        value: 5
                    }]
                },
                {
                    value: 6,
                    children: [{
                        value: 7
                    }]
                },
                {
                    value: 8,
                },
            ]
        }
    }

    calcSum(node) {
        if(node.children && node.children.length) {
            let sum = node.value;
            node.children.forEach(item => {
                sum += this.calcSum(item);
            });
            return sum;
        } else {
            return node.value;
        }
    }
}

const recursion = new Recursion();
const sum = recursion.calcSum(recursion.node);
console.log(sum);