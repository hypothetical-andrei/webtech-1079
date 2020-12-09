const fib = (n) => {
  switch (n) {
    case 0:
    case 1:
      return 1
    default:
      return fib(n - 1) + fib(n - 2)
  }
}

if (process.argv.length < 3) {
  console.log('usage: node 2.js <fibonacci index>')
} else {
  let index = parseInt(process.argv[2])
  if (isNaN(index) || index < 0) {
    console.log('index must be a positive integer')
  } else {
    console.log(fib(index))
  }
}