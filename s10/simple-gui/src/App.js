import './App.css'
import React from 'react'
import Movie from './Movie'
import movieStore from './MovieStore'
import MovieAddForm from './MovieAddForm'
import MovieDetails from './MovieDetails'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      movies: [],
      selected: 0
    }

    this.store = movieStore

    this.add = (movie) => {
      this.store.addOne(movie)
    }

    this.delete = (id) => {
      this.store.deleteOne(id)
    }

    this.save = (id, movie) => {
      this.store.saveOne(id, movie)
    }

    this.select = (id) => {
      this.setState({
        selected: id
      })
    }

    this.cancel = () => {
      this.setState({
        selected: 0
      })
    }

  }

  componentDidMount() {
    this.store.getAll()
    this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
      this.setState({
        movies: this.store.data
      })
    })
  }

  render() {
    if (this.state.selected === 0) {
      return (
        <div>
          {
            this.state.movies.map(e => <Movie key={e.id} item={e} onDelete={this.delete} onSave={this.save} onSelect={this.select} />)
          }
          <MovieAddForm onAdd={this.add} />
        </div>
      )
    } else {
      return <MovieDetails onCancel={this.cancel} item={this.state.selected} />
    }
  }
}

export default App
