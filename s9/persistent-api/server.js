const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors')
const Op = Sequelize.Op

const sequelize = new Sequelize('sequelize_tests', 'app1', 'welcome123', {
  dialect: 'mysql'
})

const Movie = sequelize.define('movie', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 40]
    }
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1890
    }
  },
  mainGenre: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['DRAMA', 'COMEDY']
  }
})

const CrewMember = sequelize.define('crewMember', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3,20]
    }
  },
  role: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['ACTOR', 'DIRECTOR', 'PRODUCER']
  }
})

Movie.hasMany(CrewMember)

const app = express()
app.use(cors())
app.use(express.static('../../s10/simple-gui/build'))
app.use(bodyParser.json())

app.get('/create', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})

// get /movies?filter=abc&page=2&pageSize=5
app.get('/movies', async (req, res, next) => {
  const query = {
    where: {}
  }
  if (req.query.filter) {
    query.where.title = {
      [Op.like]: `%${req.query.filter}%`
    }
  }
  let pageSize = 10
  if (req.query.pageSize) {
    pageSize = parseInt(req.query.pageSize)
  }
  if (req.query.page) {
    const page = parseInt(req.query.page)
    query.limit = pageSize
    query.offset = page * pageSize
  }
  try {
    const movies = await Movie.findAll(query)
    res.status(200).json(movies)
  } catch (err) {
    next(err)
  }
})

app.post('/movies', async (req, res, next) => {
  try {
    await Movie.create(req.body)
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})

app.get('/movies/:mid', async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.mid)
    if (movie) {
      res.status(200).json(movie)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.put('/movies/:mid', async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.mid)
    if (movie) {
      await movie.update(req.body)
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.delete('/movies/:mid', async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.mid)
    if (movie) {
      await movie.destroy()
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.get('/movies/:mid/crew-members', async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.mid, {
      include: [ CrewMember ]
    })
    if (movie) {
      res.status(200).json(movie.crewMembers)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.post('/movies/:mid/crew-members', async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.mid)
    if (movie) {
      const crewMember = new CrewMember(req.body)
      crewMember.movieId = movie.id
      await crewMember.save()
      res.status(201).json({ message: 'created' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.get('/movies/:mid/crew-members/:cmid', async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.mid)
    if (movie) {
      const crewMembers = await movie.getCrewMembers({ 
        where: { 
          id: 
          req.params.cmid 
        } 
      })
      const crewMember = crewMembers.shift()
      if (crewMember) {
        res.status(200).json(crewMember)
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.put('/movies/:mid/crew-members/:cmid', async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.mid)
    if (movie) {
      const crewMembers = await movie.getCrewMembers({ 
        where: { 
          id: 
          req.params.cmid 
        } 
      })
      const crewMember = crewMembers.shift()
      if (crewMember) {
        crewMember.name = req.body.name
        crewMember.role = req.body.role
        await crewMember.save()
        res.status(202).json({ message: 'accepted' })
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.delete('/movies/:mid/crew-members/:cmid', async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.mid)
    if (movie) {
      console.warn(req.params.cmid)
      const crewMembers = await movie.getCrewMembers({ 
        where: { 
          id: 
          req.params.cmid 
        } 
      })
      const crewMember = crewMembers.shift()
      console.warn(crewMember)
      if (crewMember) {
        await crewMember.destroy()
        res.status(202).json({ message: 'accepted' })
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'server error' })
})

app.listen(8080)