function sampleFunction(a, b, c) {
  for (let i = 0; i < 100000; i++) {
    console.log(a + b + c + i)
  }
}

function timed(f) {
  return function (...args) {
    let before = Date.now()
    let result = f(...args)
    let after = Date.now()
    console.log(`runtime: ${after - before}ms`)
    return result
  }
}

const timedSampleFunction = timed(sampleFunction)

timedSampleFunction(1,2,3)