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
            arr.push(currentNode.data)
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
LL.append(8)
console.log('// APPEND', '\n', LL, LL.toArray(), '\n')

LL.append(69, 420, 350)
console.log('// APPEND', '\n', LL, LL.toArray(), '\n')

LL.prepend(44)
console.log('// PREPEND', '\n', LL, LL.toArray(), '\n')

LL.sortInt()
console.log('// SORTINT', '\n', LL, LL.toArray(), '\n')

LL.pop()
console.log('// POP', '\n', LL, LL.toArray(), '\n')

LL.reverse()
console.log('// REVERSE', '\n', LL, LL.toArray(), '\n')

LL.append(666)
console.log('// APPEND', '\n', LL, LL.toArray(), '\n')


const test = [39, 55, 22, 4, 16, 1, 10, 3, -1]
const LL2 = new LinkedList().append(...test)
console.log(LL2, LL2.toArray())

console.log(LL.join(LL2), LL.toArray())


