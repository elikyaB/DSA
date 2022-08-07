// choose first or last value as pivot
// compare and separate values into left and right partitions
// repeat above for partitions until single-item elements

function quickSort (array, method='first') {
    if (array.length>1) {
        let pivot = method=='last' ? array.pop() : array[0]
        let left = []
        let right = []
        for (let i = method=='last' ? 0 : 1; i<array.length; i++) {
            if (array[i]<=pivot) {left.push(array[i])}
            else {right.push(array[i])}
        }
        array = quickSort(left).concat(pivot).concat(quickSort(right))
    }
    return array
}

// TESTS
const generateArray = require('../Testing/generateArray')
const randomArray = generateArray(10, -10, 10)
console.log(randomArray)
console.log(quickSort(randomArray, 'last'))