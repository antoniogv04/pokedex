const poke_container = document.getElementById('poke_container');
const pokeImg = document.querySelector('[data-poke-img]');
let pokemons = [];
const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}?language=es`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', searchPokemonByName);

const pokemons_number = 151;
const colors = {
	fire: '#F08030',
	grass: '#78c850',
	electric: '#F8D030',
	water: '#6890F0',
	ground: '#E0C068',
	rock: '#B8A038',
	fairy: '#EE99AC',
	poison: '#A040A0',
	bug: '#A8B820',
	dragon: '#97b3e6',
	psychic: '#F85888',
	flying: '#A890F0',
	fighting: '#C03028',
	normal: '#A8A878',
	steel: '#B8B8D0',
	ice: '#98D8D8',
	ghost: '#705898'

};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}?language=es`;
	const res = await fetch(url);
	const pokemon = await res.json();
	pokemons.push(pokemon);
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	pokemonEl.addEventListener('click', () => {
		window.location.href = `pokemon.html?id=${pokemon.id}`;
	});
	

	const poke_types = pokemon.types.map(type => type.type.name);
	const types = poke_types.map(type => {
		
	});
	const type = main_types.find(type => types.indexOf(type) > -1);
	const typeHTML = poke_types.map(
		type => `<small class="type rounded" style="background-color: ${colors[type]}"><span>${type}</span></small>`
	).join('');

	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

	const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            ${typeHTML}
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;
	

	poke_container.appendChild(pokemonEl);
	
}
function searchPokemonByName() {
    const searchText = searchInput.value.toLowerCase();
    const filteredPokemons = pokemons.filter(pokemon => pokemon.name.includes(searchText));
    poke_container.innerHTML = '';
    if (searchText === '') {
        pokemons.forEach(pokemon => {
            createPokemonCard(pokemon);
        });
    } else {
        filteredPokemons.forEach(pokemon => {
            createPokemonCard(pokemon);
        });
    }
}


fetchPokemons();
