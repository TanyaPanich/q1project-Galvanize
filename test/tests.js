const expect = chai.expect

xdescribe('heroImageString', function () {
  it('is a function', function () {
    expect(heroImageString).to.be.a('function')
  })

  it('should return img tag with src and alt attributes', function () {
    const hero = {
      imageSrc: '../images.day1.jpg',
      name: 'Day'
    }
    const expected = `<img src=${hero.imageSrc} alt=${hero.name}>`
    const result = heroImageString(hero)
    expect(result).to.deep.eq(expected)
  })

})
xdescribe('heroCardAttributes', function () {
  it('is a function', function () {
    expect(heroCardAttributes).to.be.a('function')
  })

  it('should return a card which has name and url attr', function () {
    const hero = {
      imageSrc: '../images.day1.jpg',
      name: 'Day'
    }
    const result = heroCardAttributes(hero)
    expect(result.attr('data-hero-name')).to.deep.eq(hero.name)
  })

})
