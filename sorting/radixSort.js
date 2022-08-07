function radixSort (array, method='lsd') {
    // HELPERS
    const digitCount = (num) => {return num===0 ? 1 : Math.floor(Math.log10(Math.abs(num))+1)}
    const sigDigit = (num, i) => {return Math.floor(Math.abs(num)/Math.pow(10,i)) % 10}

    // KEY VARS
    let k = 0
    let radix = 10
    let baseIndex = 0

    // O(kn), where k = max significant digits, n = input
    // iterate 0 -> k to fill bucket, updating k if needed
    // if item is positive push to bucket
    // if item is negative, update radix and lengthen array, push to negative index (0-9 out of 19)
    // concat buckets then loop again if there's a more significant digit
    const lsd = () => {
        for (let i=0; i<=k; i++) {
            let buckets = Array.from({length:radix},()=>[])
            for (item of array) {
                let isNegative = item < 0
                let d = sigDigit(item, i)
                let len = digitCount(item)
                if (len>k) {k=len}
                if (!isNegative) {buckets[baseIndex+d].push(item)}
                else {
                    if (radix==10) {
                        let negatives = Array.from({length:radix},()=>[])
                        baseIndex = 10
                        radix = 20
                        buckets = negatives.concat(buckets)
                    }
                    buckets[baseIndex-1-d].push(item)
                }
            }
            array = [].concat(...buckets)
        }
    }

    // O(n + nk + rk), where n = input, k = max recursions, r = radix count (10 or 20)
    // first loop: establish min and max values, derive k
    // second loop: check if negative then recursively traverse nested array to push value
    // recursively traverse nested buckets then concat back up
    const msd = () => {
        let min = array[0]
        let max = array[0]
        for (let i=1; i<array.length; i++) {
            if (array[i]>max) {max=array[i]; continue}
            if (array[i]<min) {min=array[i]}
        }
        if (min<0) {radix = 20; baseIndex = 10;}
        k = Math.max(digitCount(min), digitCount(max)) - 1

        let buckets = Array.from({length:radix},()=>[])

        const nester = (arr, i, neg) => {
            let b
            let d = sigDigit(item, i)
            if (i!==k) {b = neg ? 9-d : d}
            else {b = neg ? baseIndex-1-d : baseIndex+d}
            
            if (arr[b]==undefined) {arr = Array.from({length:10},()=>[])}
            if (i==0) {arr[b].push(item); return arr}
            else {arr[b] = nester(arr[b], i-1, neg); return arr}
        }

        for (item of array) {
            let isNegative = item < 0
            buckets = nester(buckets, k, isNegative)
        }

        const merger = (arr, k) => {
            if (k==0) {return [].concat(...arr)}
            else {return [].concat(...merger(arr,k-1))}
        }

        array = merger(buckets, k)
    }

    if (method=='lsd') {lsd()}
    if (method=='msd') {msd()}

    return array
}

// TESTS
const generateArray = require('../Testing/generateArray')
const randomArray = generateArray(10, -100, 100)
console.log(randomArray)
console.log(radixSort(randomArray, 'lsd'))
// console.log(radixSort([12,6,3,7,13,8]))
// console.log(radixSort([-3,7,-1,-88,5,100]))