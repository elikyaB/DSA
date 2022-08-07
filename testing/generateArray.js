function generateArray (length, min, max) {
    const arr = []
    const spread = Math.abs(min) + Math.abs(max)
    for (let i=0; i<=length; i++) {
        arr.push(min + Math.round(Math.random()*spread))
    }
    return arr
}

module.exports = generateArray