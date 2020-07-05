console.log("Connecting to API");

document.addEventListener("DOMContentLoaded", () => {

    let generateBtn = document.querySelector('#gen-btn');
    generateBtn.addEventListener('click', renderEverything);

})


renderEverything = () => {

    let allPokemonContainer = document.getElementById('poke-container');

    allPokemonContainer.innerText = "";

    let pokeContainer = document.createElement('div');
    pokeContainer.classList.add('row', 'mx-auto');
    allPokemonContainer.appendChild(pokeContainer);

    fetchAllPokemon(pokeContainer);
}

const fetchAllPokemon = async pokeContainer => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const all = await response.json();
    all.results.forEach(res => fetchEachPokemon(res, pokeContainer));
}

const fetchEachPokemon = async (pokemon, pokeContainer) => {
    console.log(pokemon);
    let url = pokemon.url;
    const response = await fetch(url);
    const pokemonData = await response.json();

    renderPokemon(pokemonData, pokeContainer);
}

renderPokemon = (pokemon, pokeContainer) => {

    pokemonName = pokemon.name

    let imgContainer = document.createElement('div');
    imgContainer.classList.add('col-xs-6', 'col-sm-4', 'col-md-3', 'col-lg-2');

    let cardContainer = document.createElement('div');
    cardContainer.classList.add('card', 'mb-4');

    let imageInfo = document.createElement('img');
    imageInfo.classList.add('card-img-top', 'bg-light', 'img-fluid');
    imageInfo.src = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`;
    imageInfo.alt = 'Image';

    let card = document.createElement('div');
    card.classList.add('card-block');

    let h4 = document.createElement('h4');
    h4.classList.add('card-title');
    h4.innerText = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

    let text = document.createElement('p');
    text.classList.add('card-text');
    text.innerText = `#${pokemon.id}`;

    cardContainer.append(imageInfo, card, h4, text);
    imgContainer.appendChild(cardContainer);
    pokeContainer.appendChild(imgContainer);

}

