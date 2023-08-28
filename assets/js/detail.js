const card = document.getElementById('card')
const backButton = document.getElementById('back')
backButton.addEventListener('click', () => {
    history.back();
});

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

function convertToHtml(pokemon) {
    console.log(pokemon.types[0])
    card.classList.add(pokemon.types[0])
    return `
    <div class="header">
        <span class="name">${pokemon.name}</span>
        <span class="id">${pokemon.number}</span>
    </div>

    <img class="photo" src="${pokemon.photo}" alt="">
        <div class="abilities">
            ${pokemon.abilities.map((abilities) => `<h2 class="ability">${abilities.name}</h2><p class="desc">${abilities.description}</p>`).join('')}
        </div>
        <div class="about">
            <div class="title">
                <span>Species</span>
                <span>Weight</span>
                <span>Height</span>
            </div>
            <div class="info">
            <span>${pokemon.species}</span>
            <span>${pokemon.height}</span>
            <span>${pokemon.weight}</span>
            </div>
        </div>
    `
}

pokeApi.getPokemon = () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    
    return fetch(url) 
    .then((response) => response.json())
    .then((pokemonDetails) => {
        return convertPokeApiDetailToPokemon(pokemonDetails)
    })
    .then((pokemon) => {
        const newHtml = convertToHtml(pokemon);
        card.innerHTML = newHtml;
    })
    .catch((error) => console.error(error))
    
    
}

pokeApi.getPokemon()