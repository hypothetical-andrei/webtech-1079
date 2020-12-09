const express = require('express')
const fetch = require('node-fetch')

const app = express()
const WEATHER_URL = 'http://www.meteoromania.ro/wp-json/meteoapi/v2/starea-vremii'

app.get('/weather', async (req, res) => {
  try {
    const meteoResponse = await fetch(WEATHER_URL)
    const responseContent = await meteoResponse.json()
    if (req.query.city) {
      const cityRecord = responseContent.features.find(e => e.properties.nume === req.query.city.toUpperCase())
      if (cityRecord) {
        res.status(200).json(cityRecord)
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(200).json(responseContent)      
    }
  } catch (err) {
    console.warn(err)
    res.status(500).json({ message: 'server error' })
  }
})

app.listen(8080)