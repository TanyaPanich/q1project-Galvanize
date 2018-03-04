const chai = require('chai')
const expect = chai.expect
const main = require('../js/main')

describe('calculator', function () {
  it('is an object', function () {
    expect(main.calculator).to.be.a('object')
  })

  describe('#multiply', function () {
    it('should be a function', function () {
      expect(main.calculator.multiply).to.be.a('function')
    })

    it('should multiply two numbers together', function () {
      expect(main.calculator.multiply(5,2)).to.equal(10)
    })
  })
})
