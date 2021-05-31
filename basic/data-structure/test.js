class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    } 
}

class LinkedList {
    constructor() {
        this.root = null;
    }

    add(value) {
        const node = new Node(value);
        let next = this.root;
        if (!next) {
            this.root = node;
        } else {
            while(next.next) {
                next = next.next;
            }
            next.next = node;
        }
    }

    delete(value) {
        if (this.root) {
            console.log(this.root.value);
            if (this.root.value === value) {
                this.root = null;
            } else {
                let pre = this.root;
                while(pre.next) {
                    if (pre.next.value === value) {
                        break;
                    } else {
                        pre = pre.next;
                    }
                }
                if (pre.next) {
                    pre.next = pre.next.next;
                }
            }
        }
    }
}

const linkedList = new LinkedList();

linkedList.add(23);
linkedList.add(21);
linkedList.add(5);
linkedList.add(3);

linkedList.delete(21);

console.log(JSON.stringify(linkedList));
