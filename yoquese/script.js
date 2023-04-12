function getPokemonData(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => {
            const pokemon = {
                id: data.id,
                name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                image: data.sprites.front_default
            };
            displayPokemon(pokemon);
        })
        .catch(error => console.log(error));
}
function displayPokemon(pokemon) {
    const container = document.querySelector('.container');
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    pokemonCard.setAttribute('data-name', pokemon.name.toLowerCase());
    pokemonCard.innerHTML = `
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
        <p>#${pokemon.id.toString().padStart(3, '0')}</p>
    `;
    container.appendChild(pokemonCard);
    

    pokemonCard.addEventListener('click', () => {
        window.location.href = `pokemon-details.html?id=${pokemon.id}`;
    });
}

for (let i = 1; i <= 151; i++) {
    getPokemonData(i);
}

function handleSearch() {
    const searchInput = document.querySelector('#search-input');
    const searchTerm = searchInput.value.toLowerCase();
    const pokemonCards = document.querySelectorAll('.pokemon-card');

    pokemonCards.forEach(card => {
        const pokemonName = card.getAttribute('data-name');
        if (pokemonName.includes(searchTerm)) {
            card.style.display = 'inline-block';
        } else {
            card.style.display = 'none';
        }
    });
}

const searchInput = document.querySelector('#search-input');
searchInput.addEventListener('input', handleSearch);