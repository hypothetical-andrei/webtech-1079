const nothing = require('./nothing')
const SimpleObject = require('./simple-object')
const first = require('./first')
const second = require('./second')

nothing.doNothing()

let o = new SimpleObject('some object')
o.doStuff()

first.doStuff()
second.doStuff()