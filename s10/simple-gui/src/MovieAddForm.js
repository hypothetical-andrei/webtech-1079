import React from 'react'

class MovieAddForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      year: '',
      mainGenre: ''
    }

    this.add = (evt) => {
      this.props.onAdd({
        title: this.state.title,
        year: this.state.year,
        mainGenre: this.state.mainGenre
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
        <label htmlFor="title">title</label>
        <input type="text" name="title" id="title" value={this.state.title} onChange={this.handleChange} />
        <label htmlFor="year">year</label>
        <input type="text" name="year" id="year" value={this.state.year} onChange={this.handleChange} />
        <label htmlFor="mainGenre">Genre</label>
        <input type="text" name="mainGenre" id="mainGenre" value={this.state.mainGenre} onChange={this.handleChange} />
        <div>
          <input type="button" value="add" onClick={this.add} />
        </div>
      </div>
    )
  }
}

export default MovieAddForm