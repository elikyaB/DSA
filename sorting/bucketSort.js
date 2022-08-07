// make buckets based on arr.length
// arr.map elements to bucket
// sort each bucket
// add buckets back into original arr

const binarySearch = require('../Searching/binarySearch')

function bucketSort(array) {
    const k = Math.round(Math.sqrt(array.length))

    let min, max
    for (let i=0; i<array.length; i++) {
        if (min==undefined || array[i] < min) {min=array[i]}
        if (max==undefined || array[i] > max) {max=array[i]}
    }

    const buckets = []
    const bucketRange = (Math.abs(min) + Math.abs(max)) / k

    for (let i=0; i<array.length; i++) {
        let e = array[i]
        let b = Math.floor((e-min)/bucketRange)
        if (buckets[b]==undefined) {buckets[b] = [e]}
        else {buckets[b].splice(binarySearch(buckets[b],e),0,e)} // O(log(n))
    }
    return [].concat(...buckets)
}

// TESTS
const generateArray = require('../generateArray')
const randomArray = generateArray(10, -100, 100)
console.log(randomArray)
console.log(bucketSort(randomArray))
console.log(bucketSort([12,6,3,7,13,8]))
console.log(bucketSort([-3,7,-1,-88,5,100]))