
var previousState = null

function goBack() {
  $('#secondStepWhichHero').css('display','none')
  $('#thirdStepChooseTasks').css('display','none')
  $('#fourthStepDoTasks').css('display','none')
  $('#fifthStepGetReward').css('display','none')
  if (previousState === "first") {
    location.reload()
    previousState = null
  } else if (previousState === "second") {
    $('#secondStepWhichHero').css('display','block')
    previousState = "first"
  }  else if (previousState === "third") {
    $('#thirdStepChooseTasks').css('display','block')
    previousState = 'second'
  }  else  if (previousState === "fourth") {
    $('#fourthStepDoTasks').css('display','block')
    previousState = 'third'
  } else  if (previousState === "fifth") {
    $('#fifthStepGetReward').css('display','block')
    previousState = 'fourth'
  }
}

function backgroundDark(event){
  event.preventDefault()
  $('body').css('background-color','#003459')
  $('.steps').css('color','white')
  $('.firstRow').css('background-color', '#ffffff')
  $('#firstStepMorningNight').css('display','none')
  $('#secondStepWhichHero').css('display','block')
  $('#back').css('display','block')
}

function backgroundLight(event){
  event.preventDefault()
  $('body').css('background-color','#7798AB')
  $('.steps').css('color','#0a0f47')
  $('.firstRow').css('background-color', '#ffffff')
  $('#firstStepMorningNight').css('display','none')
  $('#secondStepWhichHero').css('display','block')
  $('#back').css('display','block')
}

function renderHeroesCards(heroesArr) {
  for(let hero of heroesArr) {
    const $cols10m3 = $('<div>').addClass('col s10 m3')
    const $card = heroCardAttributes(hero)
    $card.on('click', thirdRenderFavoriteHero)
    const $cardImage = $('<div>').addClass('card-image')
    const $img = heroImageString(hero)
    const $span = heroSpanText(hero)
    //const $span = $('<span>').addClass('card-title')
    //$span.text(hero.name)
    $cardImage.append($img, $span)
    $card.append($cardImage)
    $cols10m3.append($card)
    $('#listings').append($cols10m3)
  }
}
function heroSpanText(hero) {
  const span = $('<span>').addClass('card-title')
  span.text(hero.name)
  return span
}

function heroCardAttributes(hero){
  let card = $('<div>').addClass('card')
  card.attr('data-hero-name', hero.name)
  card.attr('data-hero-image-url', hero.imageSrc)
  return card;
}

function heroImageString(hero){
  let img
  return img = '<img src=' + hero.imageSrc + ' alt=' + hero.name +'>'
}

function secondGetHeroesAndRender() {
  console.log("secondGetHeroesAndRender");
  previousState = "first"
  if (localStorage.getItem('heroes')) {
    renderHeroesCards(JSON.parse(localStorage.getItem('heroes')))
  } else {
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
        let heroRes = input.data.results[0]
        let hero = {}
        hero.name = heroRes.name
        hero.imageSrc = heroRes.thumbnail.path + "/portrait_fantastic." + heroRes.thumbnail.extension
        //hero.description = heroRes.description
        allHeroes.push(hero)
        if(allHeroes.length === heroesURL.length){
          localStorage.setItem('heroes', JSON.stringify(allHeroes))
          renderHeroesCards(allHeroes)
        }
      })
    }
  }
}

function thirdRenderFavoriteHero(event) {
  console.log("thirdRenderFavoriteHero:",$(this).attr('data-hero-name'));
  previousState = 'second'
  event.preventDefault()
  const $heroName = $(this).attr('data-hero-name')
  const $heroImageUrl = $(this).attr('data-hero-image-url')
  $('#fifthStepGetReward').css('display','none')
  $('#fourthStepDoTasks').css('display','none')
  $('#secondStepWhichHero').css('display','none')
  $('#thirdStepChooseTasks').css('display','block')
  const $heroImage = $('<img>')
  $heroImage.attr('src', $heroImageUrl)
  $heroImage.attr('id', 'heroImage')
  $('.favHeroImage').empty()
  $('.favHeroImage').append($heroImage)
}

function fourthRenderBigTasks(event) {
  console.log("fourthRenderBigTasks");
  previousState = 'third'
  event.preventDefault()

  $('#thirdStepChooseTasks').css('display','none')
  $('#fourthStepDoTasks').css('display','block')
  const tasksURL = {teeth: 'images/heroTask/teethbatman.jpg',
                 breakfast: 'images/heroTask/breakfastmama.jpg',
                 clothes: 'images/heroTask/tshirt.jpg',
                 book: 'images/heroTask/book2.jpg',
                 shower: 'images/heroTask/shower.jpg',
                 hair: 'images/heroTask/hair.jpg',
                 pajama: 'images/heroTask/pajamas.jpg',
                 exercises: 'images/heroTask/exercises.jpg',
                 backpack: 'images/heroTask/backpack.jpg',
                 laundry: 'images/heroTask/laundry.png',
                 toys: 'images/heroTask/toys.jpg',
                 hands: 'images/heroTask/hands.jpg'
                }
  const choosenTasksArray = $('.heroTaskContainer').children('.btn-large')
  $('.bigTaskImages').empty()
  let count = 0
  for(let choosenTask of choosenTasksArray) {
    const $bigTaskImage = $('<img>')
    if (choosenTask.name in tasksURL) {
      $bigTaskImage.attr('src', tasksURL[choosenTask.name])
      $bigTaskImage.attr('width', '300px')
      $('.bigTaskImages').append($bigTaskImage)
      $bigTaskImage.on('click', function() {
        $(this).effect( "explode", {}, 500 );
        count++;
        if(count === choosenTasksArray.length){
          $('#fourthStepDoTasks').css('display','none')
          $('#fifthStepGetReward').css('display','block')
        }
      })

    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  $('#morning').on('click', backgroundLight)
  $('#evening').on('click', backgroundDark)
  secondGetHeroesAndRender()
  dragula([document.querySelector('.heroTaskContainer'), document.querySelector('#taskContainer')])
  $('#start').on('click', fourthRenderBigTasks)
  $('#back').on('click', goBack)
  $( "#button" ).on( "click", function() {
    $( "#effect" ).effect( "explode", {}, 500 );
      return false;
    });
})
