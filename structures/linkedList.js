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

    append (data) {
        if (data instanceof LinkedList) {
            console.log(data.head)
            this.length += data.length
            // console.log(this)
            this.tail.next = data.head
            // console.log(this)
            this.tail = data.tail
            // console.log(this)
            return this
        }

        this.length++
        let newNode = new Node(data)

        if (this.tail) {
            // console.log(this)
            this.tail.next = newNode
            // console.log(this)
            this.tail = newNode
            // console.log(this)
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

    sortInt () {
        let arr = []
        let currentNode = this.head

        const half = (range) => {return Math.floor(range/2)}

        const binarySort = (n, l=0, r=arr.length) => {
            let h = half(r-l)
            let p = l+h
            let pivot = arr[p]
            if (n==pivot || pivot==undefined) {return p}
            if (n<pivot) {return p>l ? binarySort(n, l, p) : l}
            if (n>pivot) {return r>p+1 ? binarySort(n, p, r) : r}
        }

        for (let e=0; e<this.length; e++) {
            arr.splice(binarySort(currentNode.head),0,currentNode.head)
            currentNode = currentNode.next
        }

        currentNode = this.head
        for (let i=0; i<arr.length; i++) {
            currentNode.head = arr[i]
            currentNode = currentNode.next
        }

        return this
    }

    reverse () {
        let firstNode = this.head
        let newTail = new Node(firstNode.head, null)
        let newHead

        const loop = (node, previous=null) => {
            newHead = new Node(node.head, previous)
            if (node.next != null) {loop(node.next, newHead)}
            return newHead
        }

        this.head = loop(firstNode)
        console.log(newHead)
        console.log(this.head)
        this.tail = newTail

        return this
    }

    toArray () {
        let arr = []
        let currentNode = this.head
        while (currentNode !== null) {
            arr.push(currentNode.head)
            currentNode = currentNode.next
        }
        return arr
    }

    fromArray (arr) {
        for (let i=0; i<arr.length; i++) {this.append(arr[i])}
        return this
    }

}

let LL = new LinkedList()
LL.append(8)
LL.prepend(44)
LL.insert(1,2)
LL.sortInt()
LL.reverse()
LL.append(69)
// LL = new LinkedList().fromArray(LL.toArray())
// LL.pop()
// LL.shift()
console.log(LL, LL.toArray())

// const test = [39, 55, 22, 4, 16, 1, 10, 3, -1]
// const LL2 = new LinkedList().fromArray(test)
// console.log(LL2, LL2.toArray())
// LL.append(LL2)
// console.log(LL, LL.toArray())


