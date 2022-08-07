// OOP

class Node {
    constructor (data, next=null) {
        this.head = data
        this.next = next
        // this.prev = prev
    }
}

class LinkedList {
    constructor () {
        this.head = null
        this.tail = null
        this.length = 0
    }

    append (data, next=null) {
        this.length++
        let newNode = new Node(data)

        if (this.tail) {
            this.tail.next = newNode
            this.tail = newNode
            return newNode
        }

        this.head = this.tail = newNode
        return newNode
    }

    prepend (data) {
        this.length++
        this.head = new Node(data, this.head)
    }

    pop () {
        if (this.tail) {
            this.length--
            const tailNode = this.tail
            let currentNode = this.head

            while (currentNode.next != tailNode) {
                currentNode = currentNode.next
            }

            this.tail = currentNode
            this.tail.next = null

            return tailNode
        }

        return undefined
    }

    shift () {
        this.length--
        const headNode = this.head
        this.head = headNode.next
        if (this.head == null) {this.tail = null}
        return headNode
    }

    insert (x, data) {
        if (x>0 && x<this.length) {
            let newNode = new Node(data)
            let previousNode = this.head
            let currentNode
            for (let i=1; i<this.length; i++) {
                currentNode = previousNode.next
                if (i==x) {
                    this.length++
                    newNode.next = currentNode
                    previousNode.next = newNode
                    return newNode
                }
                previousNode = currentNode
            }
        }
        if (x >= this.length) {return this.append(data)}
        if (x==0) {return this.prepend(data)}
    }

    remove (x) {
        if (x >= this.length) {return undefined}
        if (x == this.length-1) {return this.pop()}
        if (x>0) {
            let previousNode = this.head
            let currentNode
            for (let i=1; i<this.length; i++) {
                currentNode = previousNode.next
                if (i==x) {
                    this.length--
                    previousNode.next = currentNode.next
                    return currentNode
                }
                previousNode = currentNode
            }
        }
        if (x==0) {return this.shift()}
    }

    search (data) {
        let currentNode = this.head
        for (let i=0; i<this.length; i++) {
            if (currentNode.head == data) {return i}
            currentNode = currentNode.next
        }
        return false
    }

    sortInts () {
        let arr = []
        let currentNode = this.head
        const half = (range) => {return Math.floor(range/2)}
        const binarySort = (n, l=0, r=arr.length) => {
            let h = half(r-l)
            let p = l+h
            // console.log(n, l, h, r, p)
            let pivot = arr[p]
            if (n==pivot || pivot==undefined) {return p}
            if (n<pivot) {return p>l ? binarySort(n, l, p) : l}
            if (n>pivot) {return r>p+1 ? binarySort(n, p, r) : r}
        }
        for (let e=0; e<this.length; e++) {
            arr.splice(binarySort(currentNode.head),0,currentNode.head)
            currentNode = currentNode.next
        }

        for (item of arr) {sort}
    }

    reverse () {
        let firstNode = this.head
        let newTail = new Node(firstNode.head, null)

        const loop = (node, previous=null) => {
            let newHead = new Node(node.head, previous)
            if (node.next != null) {return loop(node.next, newHead)}
            return newHead
        }

        this.tail = newTail
        this.head = loop(firstNode)

        return this
    }

    toArray () {

    }

}

let node = new Node (12)
let LL = new LinkedList()
LL.append(55)
LL.append(4)
LL.append(16)
LL.append(1)
LL.append(10)
LL.insert(1,22)
LL.append(3)
LL.append(-1)
LL.append(39)
LL.sortInts()
console.log(LL.reverse())
