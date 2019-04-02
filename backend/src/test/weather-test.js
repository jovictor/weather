// Framework for to test
const chai = require('chai');
const fetch = require('node-fetch');
const assert = chai.assert;

describe('TDD API consume', () => {
 // Testing comunication with API
  it('API response', async () => {
    await fetch('https://api.darksky.net/forecast/9eb31f3c966b0932c87bff5d885aacf4/37.8267,-122.4233?lang=pt&units=si')
    .then(res => {
      assert.equal(res.status, 200);
    })
  })
})

