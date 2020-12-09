const sampleArray = [1,2,3,4,5,6,7,8]

const sampleTranformation = (x) => x * 2

const map = (a, t) => {
  const result = []
  for (const element of a) {
    result.push(t(element))
  }
  return result
}

console.log(map(sampleArray, sampleTranformation))
console.log(map(['cat', 'bear', 'tiger'], (x) => x.length))