import React from 'react'

class Movie extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isEditing: false,
      title: this.props.item.title,
      year: this.props.item.year,
      mainGenre: this.props.item.mainGenre
    }

    this.delete = (evt) => {
      this.props.onDelete(this.props.item.id)
    }

    this.edit = () => {
      this.setState({ isEditing: true })
    }

    this.cancel = () => {
      this.setState({ isEditing: false })
    }

    this.save = (evt) => {
      this.props.onSave(this.props.item.id, {
        title: this.state.title,
        year: this.state.year,
        mainGenre: this.state.mainGenre
      })

      this.setState({
        isEditing: false
      })
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }

    this.select = () => {
      this.props.onSelect(this.props.item.id)
    }
  }

  render () {
    const { item } = this.props
    return (
      <div>
        {
          this.state.isEditing ?
            <>
              <span>
                <input type='text' value={this.state.title} onChange={this.handleChange} name='title' />
              </span>
              <span>
                <input type='text' value={this.state.year} onChange={this.handleChange} name='year' />
              </span>
              <span>
                <input type='text' value={this.state.mainGenre} onChange={this.handleChange} name='mainGenre' />
              </span>
              <span>
                <input type='button' value='cancel' onClick={this.cancel} />
                <input type='button' value='save' onClick={this.save} />
              </span>
            </>
          :
          <>
            <span>{item.title}</span>
            <span>{item.year}</span>
            <span>{item.mainGenre}</span>
            <span>
              <input type='button' value='delete' onClick={this.delete} />
              <input type='button' value='edit' onClick={this.edit} />
              <input type='button' value='details' onClick={this.select} />
            </span>
          </>
        }
      </div>
    )
  }
}

export default Movie

