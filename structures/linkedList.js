class Node {
    constructor (data, next=null) {
        this.data = data
        this.next = next
        // this.prev = prev
    }
}

class LinkedList {
    constructor (head=null, tail=null, length=0) {
        this.head = head
        this.tail = tail
        this.length = length
    }

    append (...data) {
        for (let i=0; i<data.length; i++) {
            this.length++
            let newNode = new Node(data[i])

            if (this.tail) {
                this.tail.next = newNode
                this.tail = newNode
            } else {
                this.head = this.tail = newNode
            }
        }
        return this
    }

    prepend (...data) {
        // prepends in order so last element will be head node
        for (let i=0; i<data.length; i++) {
            this.length++
            this.head = new Node(data[i], this.head)
        }
        return this
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

    insert (x, ...data) {
        if (x>0 && x<this.length) {
            let previousNode = this.head
            let currentNode
            for (let i=1; i<this.length; i++) {
                currentNode = previousNode.next
                if (i==x) {
                    const loop = (element=0) => {
                        let newNode = new Node(data[element])
                        element++
                        if (element < data.length) {
                            newNode.next = loop(element)
                        } else {
                            newNode.next = currentNode
                        }
                        return newNode
                    }
                    previousNode.next = loop()
                }
                previousNode = currentNode
            }
            this.length += data.length
            return this
        }
        if (x >= this.length) {return this.append(...data)}
        if (x==0) {return this.prepend(...data)}
    }

    remove (x, n=1) {
        if (x >= this.length) {return undefined}

        let removed = []

        const loop = (node, r) => {
            if (r>0 && node != null) {
                removed.push(node.data)
                return loop(node.next, r-1)
            }
            else {
                this.length -= n-r
                return node
            }
        }

        if (x == this.length-1) {removed.push(this.pop())}
        if (x == 0) {this.head = loop(this.head, n)}
        if (x>0) {
            let previousNode = this.head
            let currentNode
            for (let i=1; i<this.length; i++) {
                currentNode = previousNode.next
                if (i==x) {
                    if (i+n > this.length-1) {
                        this.tail = previousNode
                    }
                    previousNode.next = loop(currentNode, n)
                    break
                }
                previousNode = currentNode
            }
        }
        
        return removed
    }

    search (data) {
        let currentNode = this.head
        for (let i=0; i<this.length; i++) {
            if (currentNode.data == data) {return i}
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
            arr.splice(binarySort(currentNode.data),0,currentNode.data)
            currentNode = currentNode.next
        }

        currentNode = this.head
        for (let i=0; i<arr.length; i++) {
            currentNode.data = arr[i]
            currentNode = currentNode.next
        }

        return this
    }

    reverse () {
        const loop = (node, previous=null) => {
            let newHead = new Node (node.data, previous)
            if (!previous) {this.tail = newHead}
            if (node.next != null) {return loop(node.next, newHead)}
            return newHead
        }

        this.head = loop(this.head)
        return this
    }

    toArray () {
        let arr = []
        let currentNode = this.head
        while (currentNode !== null) {
            arr.push(currentNode?.data)
            currentNode = currentNode.next
        }
        return arr
    }

    join (linkList) {
        let newTail = linkList.tail
        this.tail.next = linkList.head
        this.tail = newTail
        this.length += linkList.length
        return this
    }
}

let LL = new LinkedList()

LL.append(69, 420, 350)
console.log('// APPEND', '\n', LL, LL.toArray(), '\n')

LL.prepend(44, 11, 88)
console.log('// PREPEND', '\n', LL, LL.toArray(), '\n')

LL.sortInt()
console.log('// SORTINT', '\n', LL, LL.toArray(), '\n')

LL.pop()
console.log('// POP', '\n', LL, LL.toArray(), '\n')

LL.reverse()
console.log('// REVERSE', '\n', LL, LL.toArray(), '\n')

const test = [39, 55, 22, 4, 16, 1, 10, 3, -1]
const LL2 = new LinkedList().append(...test)
console.log('// NEW LIST', '\n', LL2, LL2.toArray())

console.log('// JOIN', '\n', LL.join(LL2), LL.toArray())

LL.insert(1, 1, 2, 3)
console.log('// INSERT', '\n', LL, LL.toArray(), '\n')

LL.remove(15, 3)
console.log('// REMOVE', '\n', LL, LL.toArray(), '\n')