const chai = require('chai')
const expect = chai.expect
const main = require('../js/main')

describe('renderHeroes', function () {
  it('is a function', function () {
    expect(renderHeroes).to.be.a('function')
  })

  it('for every el in array shoud crete a card', function () {
    const arr = [1, 2, 3]
    //const expected = ??
    //const result = ??
    //expect(result).to.deep.eq(expected)
  })

})
