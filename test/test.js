const assert = require('assert')
const helperFunctions = require('../helper')

const selfTreatDict = {
  "1": {
    gejala: "Penyakit A",
    penanganan: "Minum obat"
  },
  "2": {
    gejala: "Penyakit Z",
    penanganan: "Tidur"
  },
  "3": {
    gejala: "Zombie Disease",
    penanganan: "Terbang"
  }
}

describe('appendSymptoms', function() {
  it('should append 0 symptoms correctly', function() {
    const text = "Im very very sick"
    const symptoms = []
    const expected = "My symptoms are . " + text

    assert.strictEqual(helperFunctions.appendSymptoms(text, symptoms, selfTreatDict), expected)
  })

  it('should append 1 symptoms correctly', function() {
    const text = "Im very very sick"
    const symptoms = ["2"]
    const expected = "My symptoms are Penyakit Z. " + text

    assert.strictEqual(helperFunctions.appendSymptoms(text, symptoms, selfTreatDict), expected)
  })
  
  it('should append 3 symptoms correctly', function() {
    const text = "Im very very sick"
    const symptoms = [1, 2, 3]
    const expected = "My symptoms are Penyakit A, Penyakit Z, Zombie Disease. " + text

    assert.strictEqual(helperFunctions.appendSymptoms(text, symptoms, selfTreatDict), expected)
  })
})

const rekomenPrediksi = [
  {
      "level": 0,
      "rekomendasi": "Safe."
  },
  {
      "level": 1,
      "rekomendasi": "Dangerous."
  },
  {
      "level": 2,
      "rekomendasi": "Mega mega dangerous."
  }
]

describe('getRecommendation', function() {
  it('should work as expected for Level 0', function() {
    const predicted = [
      0.8,
      0.1,
      0.1
    ]
    const expected = {
      "level": 0,
      "rekomendasi": "Safe."
    }
    assert.deepStrictEqual(helperFunctions.getRecommendation(predicted, rekomenPrediksi), expected)
  })

  it('should work as expected for Level 1', function() {
    const predicted = [
      0.3,
      0.5,
      0.2
    ]
    const expected = {
      "level": 1,
      "rekomendasi": "Dangerous."
    }
    assert.deepStrictEqual(helperFunctions.getRecommendation(predicted, rekomenPrediksi), expected)
  })

  it('should work as expected for Level 2', function() {
    const predicted = [
      0.2,
      0.2,
      0.6
    ]
    const expected = {
      "level": 2,
      "rekomendasi": "Mega mega dangerous."
    }
    assert.deepStrictEqual(helperFunctions.getRecommendation(predicted, rekomenPrediksi), expected)
  })
})

describe('getTreatments', function() {
  it('should work for 0 element', function() {
    assert.deepStrictEqual(helperFunctions.getTreatments([], selfTreatDict), [])
  })
  
  it('should work for 1 element', function() {
    assert.deepStrictEqual(helperFunctions.getTreatments([1], selfTreatDict), [
      {
        gejala: "Penyakit A",
        penanganan: "Minum obat"
      }
    ])
  })
  
  it('should work for 3 element', function() {
    assert.deepStrictEqual(helperFunctions.getTreatments([1, 2, 3], selfTreatDict), [
      {
        gejala: "Penyakit A",
        penanganan: "Minum obat"
      },
      {
        gejala: "Penyakit Z",
        penanganan: "Tidur"
      },
      {
        gejala: "Zombie Disease",
        penanganan: "Terbang"
      }
    ])
  })
})
