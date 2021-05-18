const fetch = require('node-fetch')
const translate = require('@iamtraction/google-translate')

const maxLength = 400
const oovToken = "<OOV>"

const padArray = function(arr, len, fill) {
  return Array(len).fill(fill).concat(arr).slice(-len)
}

const getPrediction = async (text, wordIndex) => {
  const wordArr = text.split(' ').map(val => {
    const word = val.replace(/^[^a-z\d]*|[^a-z\d]*$/gi, '');
    if (word in wordIndex) {
      return wordIndex[word]
    } else {
      return wordIndex[oovToken]
    }
  })
  const paddedWords = padArray(wordArr, maxLength, 0)
  const resp = await fetch("http://localhost:8501/v1/models/my_model:predict", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      instances: [paddedWords]
    })
  })
  const data = await resp.json()
  return data.predictions[0]
}

const translateToEn = async (text) => {
  const to = "en"
  return await translate(`${text}`, { to });
}

exports.getPrediction = getPrediction
exports.translateToEn = translateToEn
