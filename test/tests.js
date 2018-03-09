const expect = chai.expect
const hero = {
  imageSrc: '../images.day1.jpg',
  name: 'Day'
}
describe('heroImageString', function () {
  it('is a function', function () {
    expect(heroImageString).to.be.a('function')
  })
  it('should return a string', function () {
    const result = heroImageString(hero)
    expect(typeof result).to.deep.eq('string')
  })
  it('should return img tag with src and alt attributes', function () {
    const expected = `<img src=${hero.imageSrc} alt=${hero.name}>`
    const result = heroImageString(hero)
    expect(result).to.deep.eq(expected)
  })
})

describe('heroCardAttributes', function () {
  it('is a function', function () {
    expect(heroCardAttributes).to.be.a('function')
  })
  it('should return an object', function () {
    const result = heroCardAttributes(hero)
    expect(typeof result).to.deep.eq('object')
  })
  it('should return a card which has name and url attr', function () {
    const result = heroCardAttributes(hero)
    expect(result.attr('data-hero-name')).to.deep.eq(hero.name)
  })
})

describe('heroSpanText', function () {
  it('is a function', function () {
    expect(heroSpanText).to.be.a('function')
  })
  it('should return an object', function () {
    const result = heroSpanText(hero)
    expect(typeof result).to.deep.eq('object')
  })
  it('should return a span with hero name text', function () {
    const result = heroSpanText(hero)
    expect(result.text()).to.deep.eq('Day')
  })
})
