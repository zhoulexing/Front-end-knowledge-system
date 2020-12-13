class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(key) {
        const node = new Node(key);
        if(this.root === null) {
            this.root = node;
        } else {
            this.insertNode(this.root, node);
            // 树再平衡
            if(this.heightNode(this.root.left) - this.heightNode(this.root.right) > 1) {
                if(key < this.root.left.key) {
                    this.root = this.rotationLL(this.root);
                } else {
                    this.root = this.rotationLR(this.root);
                }
            }

            if(this.heightNode(this.root.right) - this.heightNode(this.root.left) > 1) {
                if(key < this.root.right.key) {
                    this.root = this.rotationRR(this.root);
                } else {
                    this.root = this.rotationRL(this.root);
                }
            }
        }
    }

    insertNode(node, newNode) {
        if(newNode.key < node.key) {
            if(node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if(node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // 中序遍历,从小到大
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback);
    }

    inOrderTraverseNode(node, callback) {
        if(node !== null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }

    // 先序遍历，优先于后代节点的顺序访问每个节点
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root, callback);
    }

    preOrderTraverseNode(node, callback) {
        if(node !== null) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }

    // 后序遍历，先访问节点的后代
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback);
    }

    postOrderTraverseNode(node, callback) {
        if(node !== null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }

    remove(key) {
        this.removeNode(this.root, key);
    }

    removeNode(node, key) {
        if(node === null) {
            return null;
        }
        if(key > node.key) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else if(key < node.key) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else {
            if(node.left === null && node.right === null) {
                node = null;
                return node;
            }
            if(node.left === null) {
                node = node.right;
                return node;
            }
            if(node.right === null) {
                node = node.left;
                return node;
            }
            const aux = this.findMinNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key);
            return node;
        }
    }

    findMinNode(node) {
        while(node && node.left !== null) {
            node = node.left;
        }
        return node;
    }

    heightNode(node) {
        if(node === null) {
            return -1;
        } else {
            return Math.max(this.heightNode(node.left), this.heightNode(node.right)) + 1;
        }
    }

    // 向左的单旋转
    rotationRR(node) {
        const tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
    }

    // 向右的单旋转
    rotationLL(node) {
        const tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    }

    // 向右的双旋转
    rotationLR(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }

    // 向左的双旋转
    rotationRL(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }
}

const tree = new BinarySearchTree();
tree.insert(20);
tree.insert(10);
tree.insert(7);
tree.insert(8);
tree.insert(21);
tree.insert(25);
tree.insert(13);
tree.insert(11);
console.log(JSON.stringify(tree));
console.log("------------------------");
tree.inOrderTraverse(console.log);
console.log("------------------------");
tree.preOrderTraverse(console.log);
console.log("------------------------");
tree.postOrderTraverse(console.log);
console.log("------------------------");
tree.remove(10);
tree.preOrderTraverse(console.log);
console.log("------------------------");
console.log(tree.heightNode(tree.root));


