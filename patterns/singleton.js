// in single.js:
class Counter {
    constructor() {
      this.counterVal = 0;
      this.name = 'counterA';
    }
  
    inc() {
      this.counterVal += 1;
      return this.counterVal;
    }
  
    dec() {
      this.counterVal -= 1;
      return this.counterVal;
    }
  }
  
  const instance = new Counter();
  
  class SingleCounter {
    constructor() {
      return instance;
    }
  }
  
  module.exports = {
    SingleCounter,
  };
  
  // from another local file:
  const { SingleCounter } = require('./single');
  
  const firstCounter = new SingleCounter();
  const secondCounter = new SingleCounter();
  
  firstCounter.inc();
  firstCounter.inc();
  
  console.log(secondCounter.counterVal); // => 2
  console.log(firstCounter.counterVal); // => 2
  
  secondCounter.name = 'counterB';
  console.log(firstCounter.name); // => counterB
  console.log(secondCounter.name); // => counterB