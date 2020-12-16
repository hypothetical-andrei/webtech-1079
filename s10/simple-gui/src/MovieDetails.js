import React from 'react'
import CrewMember from './CrewMember'
import CrewMemberAddForm from './CrewMemberAddForm'
import CrewMemberStore from './CrewMemberStore'

class MovieDetails extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      crewMembers: []
    }

    this.cancel = () => {
      this.props.onCancel()
    }

    this.store = new CrewMemberStore(this.props.item)

    this.add = (crewMember) => {
      this.store.addOne(crewMember)
    }

    this.delete = (id) => {
      this.store.deleteOne(id)
    }

    this.save = (id, crewMember) => {
      this.store.saveOne(id, crewMember)
    }
  }
  
  componentDidMount() {
    this.store.getAll()
    this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
      this.setState({
        crewMembers: this.store.data
      })
    })
  }


  render () {
    return (
      <div>
        i will be the details for {this.props.item}
        {
          this.state.crewMembers.map(e => <CrewMember item={e} key={e.id} onDelete={this.delete} onSave={this.save} />)
        }
        <CrewMemberAddForm onAdd={this.add} />
        <input type='button' value='back' onClick={this.cancel} />
      </div>
    )
  }
}

export default MovieDetails