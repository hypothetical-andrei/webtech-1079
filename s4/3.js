String.prototype.format = function (format) {
  let result = this
  for (let key in format) {
    result = result.replace('{' + key + '}', format[key])
  }
  return result
}

console.log('{name} is a {role}'.format({ name: 'andrei', role: 'teacher' }))
