// aka recursive binary search for sorted arrays of integers
// sliding window technique halving the index to approach index for .splice

function binarySearch (arr, ele, l=null, r=null) {
    let i
    if (l!==null) {i = l + Math.floor((r-l)/2)}
    else {i = Math.floor(arr.length/2)}
    console.log('metrics', l, arr[l], i, arr[i], r, arr[r])
    if (ele == arr[i]) {return i}
    if (ele < arr[i]) {
        r = i
        if (l!==null) {
            if (r-l>1) {return binarySearch(arr, ele, l, r)}
            return ele == arr[l] ? l : -1
        } else {l = 0}
    }
    else {
        l = i
        if (r!==null) {
            if (r-l>1) {return binarySearch(arr, ele, l, r)}
            return ele == arr[r] ? r : -1
        } else {r = arr.length-1}
    }
    return binarySearch(arr, ele, l, r)
}

// TESTS
// const testArr = [1,2,3,5,7,8,10,15,45,69,117,350,420,666,777]
// console.log(testArr.length)
// console.log(binarySearch(testArr,4))

module.exports = binarySearch