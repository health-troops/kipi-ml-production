const fetch = require('node-fetch')
const translate = require('@iamtraction/google-translate')

const maxLength = 400
const oovToken = "<OOV>"

const padArray = function(arr, len, fill) {
  return Array(len).fill(fill).concat(arr).slice(-len)
}

const getPrediction = async (text, wordIndex) => {
  if (text.trim() === "My symptoms are ." || text.trim() === "") {
    // Handle manually for completely fine situation
    return [1.0, 0.0, 0.0]
  }
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

const appendSymptoms = (text, symptoms, selfTreatDict) => {
  let result = "My symptoms are "
  let first = true
  symptoms.forEach((id) => {
    if (first) {
      result += selfTreatDict[id].gejala
      first = false
    } else {
      result += ", " + selfTreatDict[id].gejala
    }
  })
  result += ". " + text
  return result
}

const getRecommendation = (predicted, rekomenPrediksi) => {
  let highestId = 0
  predicted.forEach((val, id) => {
    if (val > predicted[highestId]) {
      highestId = id
    }
  })
  return rekomenPrediksi.filter(({ level }) => level === highestId)[0]
}

const getTreatments = (symptoms, selfTreatDict) => {
  return symptoms.map((id) => selfTreatDict[id])
}

exports.getPrediction = getPrediction
exports.translateToEn = translateToEn
exports.appendSymptoms = appendSymptoms
exports.getRecommendation = getRecommendation
exports.getTreatments = getTreatments
