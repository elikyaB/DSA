// loop and setup left and right indexes
// if right greater than left, swap=true
// if swap=true, restart sort, else return

function bubbleSort(array) {
    let swapHappened = false
    for (let i=0; i<array.length-1; i++) {
      let j = i+1
      if (array[i]>array[j]) {
        let lesser = array[j]
        let greater = array[i]
        array[i] = lesser
        array[j] = greater
        swapHappened = true
      }
    }
    if (swapHappened) {bubbleSort(array)}
    return array
}

console.log(bubbleSort([12,6,3,7,13,8]))
console.log(bubbleSort([-3,7,-1,-88,5,100]))