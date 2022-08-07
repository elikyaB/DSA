// increment index through collection
// if element at index < previous element copy array up to sorted element and insert new value
// continue iterating from last known index until end then return

function insertionSort (array) {
    let previous = null
    let element = null
    for (let i=0; i<array.length; i++) {
        if (!previous) {previous = array[i]}
        else if (array[i]<previous) {
            previous, element = array[i]
            array.splice(i,1)
            for (let e=0; e<i; e++) {
                if (element<array[e]) {array.splice(e,0,element); break;}
            }
        } else {previous = array[i]}
    }
    return array;
}

console.log(insertionSort([12,6,3,7,13,8]))
console.log(insertionSort([-3,7,-1,-88,5,100]))

module.exports = insertionSort