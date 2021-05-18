const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const helperFunctions = require('./helper')

const app = express();
const port = 3000
const serverApiKey = '$Hell0Guy5;)(Wh4t][&*sU^p'

const wordIndex = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'additional_model_files/word_index.json')))

// MIDDLEWARE
app.use(cors());
app.use(express.json())

// ENDPOINTS
app.get('/', async (req, res) => {
  res.send("Welcome to EKIPI ML Backend")
})

app.post('/', async (req, res) => {
  const { apiKey, lang } = req.body
  let { text } = req.body

  if (apiKey !== serverApiKey) {
    res.status(403).send("Forbidden")
  } else {
    try {
      if (lang !== 'en') {
        text = await helperFunctions.translateToEn(text)
      }
      const result = await helperFunctions.getPrediction(text, wordIndex)
      res.json(result)
    } catch(e) {
      console.log(e)
      res.status(403).send("Unknown error")
    }
  }
})

// RUNNING BACKEND
app.listen(port, () => {
  console.log(`KIPI ML Backend listening at http://localhost:${port}`)
})
