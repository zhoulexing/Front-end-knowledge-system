class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
    }

    append(element) {
        const node = new Node(element);
        if(this.head === null) {
            this.head = node;
        } else {
            let current = this.head;
            while(current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    }

    removeAt(position) {
        if(position > -1 && position < this.length) {
            let current = this.head;
            let previous;
            let index = 0;
            if(position === 0) {
                this.head = current.next;
            } else {
                while(index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.length--;
            return current.element;
        } else {
            return null;
        }
    }

    insert(position, element) {
        if(position >= 0 && position <= this.length) {
            const node = new Node(element);

            let current = this.head;
            let previous;
            let index = 0;
            if(position === 0) {
                node.next = current;
                this.head = node;
            } else {
                while(index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = node;
                node.next = current;
            }
            this.length++;
            return true;
        } else {
            return false;
        }
    }
}

const linkedList = new LinkedList();

linkedList.append("1");
linkedList.append("2");
linkedList.insert(2, "3");
console.log(linkedList);
console.log(linkedList.removeAt(1));