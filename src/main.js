
function backgroundDark(event){
  event.preventDefault()
  console.log('Night clicked')
  $('body').css('background-color','#01579b')
  $('#firstStepMorningNight').css('display','none')
  $('#secondStepWhichHero').css('display','block')
}
function backgroundLight(event){
  event.preventDefault()
  console.log('Day clicked')
  $('body').css('background-color','#ffd54f')
  $('#firstStepMorningNight').css('display','none')
  $('#secondStepWhichHero').css('display','block')
}
function renderHeroesCards(heroesArr) {
  for(let hero of heroesArr) {
    const $cols10m3 = $('<div>').addClass('col s10 m3')
    const $card = $('<div>').addClass('card')
    $card.on('click', heroSelectClick)
    $card.attr('data-hero-name', hero.name)
    $card.attr('data-hero-image-url', hero.imageSrc)
    $card.attr('data-hero-description', hero.description)
    const $cardImage = $('<div>').addClass('card-image')
    const $img = $('<img>')
    $img.attr({
      src: hero.imageSrc
    })
    const $span = $('<span>').addClass('card-title')
    $span.text(hero.name)
    $cardImage.append($img, $span)
    $card.append($cardImage)
    $cols10m3.append($card)
    $('#listings').append($cols10m3)
  }
}
function getHeroesAndRender() {
  if (localStorage.getItem('heroes')) {
    renderHeroesCards(JSON.parse(localStorage.getItem('heroes')))
  } else {
    console.log('>>> Going into the API')
    const heroesURL = [
      `https://gateway.marvel.com:443/v1/public/characters?name=Spider-Man&`,
      //`https://gateway.marvel.com:443/v1/public/characters?name=Wolverine&`,
      `https://gateway.marvel.com:443/v1/public/characters?name=Hulk&`,
      //`https://gateway.marvel.com:443/v1/public/characters?name=Captain%20America&`,
      `https://gateway.marvel.com:443/v1/public/characters?name=Iron%20Man&`,
      `https://gateway.marvel.com:443/v1/public/characters?name=Thor&`
      //`https://gateway.marvel.com:443/v1/public/characters?name=Daredevil&`
    ]
    const ts = new Date().getTime()
    const myPublic = '9345b62919a166acccb31ff15d68d7b8'
    const myPrivate = '8c09e80675b8c330688bc9e9b301c018e12f020d'
    const hash = MD5(ts + myPrivate + myPublic).toString()
    let count = 0
    let allHeroes = []
    for (let basicUrl of heroesURL) {
      let url = basicUrl + 'ts=' + ts + '&apikey=9345b62919a166acccb31ff15d68d7b8&hash=' + hash
      let $xhr = $.getJSON(url)
      $xhr.done(function(input){
        console.log('callback');

        let heroRes = input.data.results[0]
        let hero = {}

        hero.name = heroRes.name
        hero.imageSrc = heroRes.thumbnail.path + "/portrait_fantastic." + heroRes.thumbnail.extension
        hero.description = heroRes.description
        allHeroes.push(hero)
        if(allHeroes.length === heroesURL.length){
          localStorage.setItem('heroes', JSON.stringify(allHeroes))
          renderHeroesCards(allHeroes)
        }
      })
    }
  }
}

function heroSelectClick(event) {
  event.preventDefault()
  const $heroName = $(this).attr('data-hero-name')
  const $heroImageUrl = $(this).attr('data-hero-image-url')
  $('#secondStepWhichHero').css('display','none')
  $('#thirdStepChooseTasks').css('display','block')
  const $heroImage = $('<img>')
  $heroImage.attr({
    src: $heroImageUrl
  })
  $('#favHeroImage').append($heroImage)
}

document.addEventListener('DOMContentLoaded', function () {
  const $morning = $('#morning')
  const $evening = $('#evening')
  $morning.on('click', backgroundLight)
  $evening.on('click', backgroundDark)
  getHeroesAndRender()
  dragula([document.querySelector('#heroTaskContainer'), document.querySelector('#taskContainer')]);
})

//renderFavHero(favHeroInfo)
// module.exports = {
//   renderHeroes: renderHeroes
// }
