document.addEventListener('DOMContentLoaded', function () {

    const renderHeroes = function(heroesArr) {
      // if (!localStorage.getItem('heroes')) {
      //   localStorage.setItem('heroes', JSON.stringify(heroesArr))
      // }
      // //? What this line does ??
      // const readyHeroes = JSON.parse(localStorage.getItem('heroes'))
      console.log('ready to render')

      for(let hero of heroesArr) {
        hero.name = heroesArr.name
        hero.imageSrc = heroesArr.thumbnail.path + "/portrait_fantastic." + heroesArr.thumbnail.extension
        hero.description = heroesArr.description
        //heroes.push(oneHero)
        const $cols12m3 = $('<div>').addClass('col s12 m3')
        const $card = $('<div>').addClass('card')
        const $cardImage = $('<div>').addClass('card-image')
        const $img = $('<img>')
        $img.attr({
          src: hero.imageSrc
        })
        const $span = $('<span>').addClass('card-title')
        $span.text(hero.name)

        localStorage.setItem('heroes', JSON.stringify(readyHeroes))

        $cardImage.append($img, $span)
        $card.append($cardImage)
        $cols12m3.append($card)
        const $listings = $('#listings')
        $listings.append($cols12m3)
      }

    }
    function getHeroesAndRender() {
      const heroesURL = [
        `https://gateway.marvel.com:443/v1/public/characters?name=Spider-Man&`,
        `https://gateway.marvel.com:443/v1/public/characters?name=Wolverine&`,
        `https://gateway.marvel.com:443/v1/public/characters?name=Hulk&`,
        //`https://gateway.marvel.com:443/v1/public/characters?name=Captain%20America&`,
        `https://gateway.marvel.com:443/v1/public/characters?name=Iron%20Man&`,
        `https://gateway.marvel.com:443/v1/public/characters?name=Thor&`,
        `https://gateway.marvel.com:443/v1/public/characters?name=Daredevil&`
      ]
      const ts = new Date().getTime()
      const myPublic = '9345b62919a166acccb31ff15d68d7b8'
      const myPrivate = '8c09e80675b8c330688bc9e9b301c018e12f020d'
      const hash = MD5(ts + myPrivate + myPublic).toString()
      let count = 0
      let allHeroes = []
      for(let basicUrl of heroesURL){
        let url = basicUrl + 'ts=' + ts + '&apikey=9345b62919a166acccb31ff15d68d7b8&hash=' + hash
        let $xhr = $.getJSON(url)
        $xhr.done(function(input){
          console.log('request is done')
          let heroRes = input.data.results[0]
          allHeroes.push(heroRes);

          count++
          console.log('count is: ' + count)
        })
      }
      console.log('ALLHEROES', allHeroes);
      setTimeout(function() {localStorage.setItem('heroes', JSON.stringify(allHeroes))}, 1000)
      setTimeout(function() {renderHeroes(allHeroes)}, 1000)
    }

    // if(localStorage.getItem('heroes')){
    //   renderHeroes(JSON.parse(localStorage.getItem('heroes')))
    // } else {
    //   getHeroesAndRender()
    // }
    getHeroesAndRender()
})

// module.exports = {
//   renderHeroes: renderHeroes
// }
