import React from 'react'

class CrewMemberAddForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      role: ''
    }

    this.add = (evt) => {
      this.props.onAdd({
        name: this.state.name,
        role: this.state.role
      })
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
  }
  render() {
    return (
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
        <label htmlFor="role">Role</label>
        <input type="text" name="role" id="role" value={this.state.role} onChange={this.handleChange} />
        <div>
          <input type="button" value="add" onClick={this.add} />
        </div>
      </div>
    )
  }
}

export default CrewMemberAddForm