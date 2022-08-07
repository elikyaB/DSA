// split array into 2
// recursively call merge on each split
// return single-item array to merge function for sorting

function mergeSort (array) {

    const separate = (arr) => {
        let len = arr.length
        if (len<=1) {return arr}
        let half = Math.ceil((len-1)/2)
        let left = arr.slice(0,half)
        let right = arr.slice(half)
        return merge(separate(left), separate(right))
    }

    const merge = (left, right) => {
        const merged = []
        let l = 0, r = 0
        while (merged.length < left.length+right.length) {
            if (left[l] <= right[r]) {
                if (left[l]==undefined) {merged.push(right[r]); r+=1}
                else {merged.push(left[l]); l+=1}
            }
            else {
                if (right[r]==undefined) {merged.push(left[l]); l+=1}
                else {merged.push(right[r]); r+=1}
            }
        }
        return merged
    }

    return separate(array)
}

// TESTS
const generateArray = require('../Testing/generateArray')
const randomArray = generateArray(10, -10, 10)
console.log(randomArray)
console.log(mergeSort(randomArray))