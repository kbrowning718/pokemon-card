var pokeContainer = document.getElementById('container');
var heightContainer = document.getElementById('height');
var baseExpContainer = document.getElementById('base-exp');
var pokemon = {
  height : null,
  base_experience : null,
  abilities : null,
  id : null,
};
var pokemonNames = {results : null};
var pokemonList = document.getElementById('pokemon-list');
var idContainer = document.getElementById('id-number');
var abilitiesContainer = document.getElementById('abilities');
var menu = document.getElementById('pokemon-list');
var weightContainer = document.getElementById('weight');
var nameImgContainer = document.getElementById('name-img');
var movesContainer = document.getElementById('moves');

document.addEventListener("DOMContentLoaded", function (e) {
  fetch('https://pokeapi.co/api/v2/pokemon/').then(function(resp) {
    return resp.json();
  }).then(function (data) {
    console.log("success - name data", data);
    pokemonNames.results = data.results;
    for (i = 0; i < data.results.length; i++) {
      var listItem = document.createElement('option');
    listItem.value = `${pokemonNames.results[i].name}`;
      listItem.innerHTML = `${pokemonNames.results[i].name}`;
      pokemonList.appendChild(listItem);
    }
  }).catch(function(err) {
    console.log("Sorry, we couldn't load the Pokemon names", err);
  })
});

menu.addEventListener('change', function (e) { fetch(`https://pokeapi.co/api/v2/pokemon/${e.target.value}`).then(function(resp) {
    return resp.json();
  }).then(function (data) {
    console.log("success", data);
 pokemon.height = data.height;
  pokemon.base_experience = data.base_experience;
  pokemon.id = data.id;
  pokemon.abilities = data.abilities;
  pokemon.weight = data.weight;
  pokemon.sprites = data.sprites;
  pokemon.moves = data.moves;
  pokemon.types = data.types;

abilitiesContainer.innerHTML = '';
  nameImgContainer.innerHTML = '';
  movesContainer.innerHTML = '';

  pokemon.abilities.map(function (a) {
    var pAbility = document.createElement('p');
    pAbility.innerHTML = a.ability.name;
          abilitiesContainer.appendChild(pAbility);

    return a.ability;

  });

    var pMoves = document.createElement('p');
    pMoves.innerHTML = `This Pokemon can learn ${pokemon.moves.length} moves.`;
    movesContainer.appendChild(pMoves);


   var pImg = document.createElement('img');
    pImg.src = pokemon.sprites.front_default;
    console.log(pImg);
    nameImgContainer.appendChild(pImg);


 heightContainer.innerText = `Height: ${pokemon.height} in.`;
  baseExpContainer.innerText = `Base Experience: ${pokemon.base_experience}`;
idContainer.innerText = `ID: #${pokemon.id}`;
 weightContainer.innerText = `Weight: ${pokemon.weight} lbs.`;
}).catch(function(err) {
    console.log("Sorry, we couldn't find this Pokemon. Please try again.", err);
  })
});
