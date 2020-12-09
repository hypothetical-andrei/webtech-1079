class State {
  constructor () {
    this.state = {}
  }

  setValue (key, value) {
    this.state[key] = value
  }

  getValue (key) {
    return this.state[key]
  }
}

const state = new State()

module.exports = state