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
	fuego: '#F08030',
	planta: '#78c850',
	eléctrico: '#F8D030',
	agua: '#6890F0',
	tierra: '#E0C068',
	roca: '#B8A038',
	hada: '#EE99AC',
	veneno: '#A040A0',
	bicho: '#A8B820',
	dragón: '#97b3e6',
	psíquico: '#F85888',
	volador: '#A890F0',
	lucha: '#C03028',
	normal: '#A8A878',
	acero: '#B8B8D0',
	hielo: '#98D8D8',
	fantasma: '#705898'

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
	
	
	function tipoTraducido(type){
		if(type == "fire"){
			return "fuego";
		}
		else if(type == "grass"){
			return "planta";
		}
		else if(type == "electric"){
			return "eléctrico";
		}
		else if(type == "water"){
			return "agua";
		}
		else if(type == "ground"){
			return "tierra";
		}
		else if(type == "rock"){
			return "roca";
		}
		else if(type == "fairy"){
			return "hada";
		}
		else if(type == "poison"){
			return "veneno";
		}
		else if(type == "bug"){
			return "bicho";
		}
		else if(type == "dragon"){
			return "dragón";
		}
		else if(type == "psychic"){
			return "psíquico";
		}
		else if(type == "flying"){
			return "volador";
		}
		else if(type == "fighting"){
			return "lucha";
		}
		else if(type == "normal"){
			return "normal";
		}
		else if(type == "steel"){
			return "acero";
		}
		else if(type == "ice"){
			return "hielo";
		}
		else if(type == "ghost"){
			return "fantasma";
		}
	}

	const poke_types = pokemon.types.map(type => type.type.name);
	const types = poke_types.map(type => {
		
	});
	
	const type = main_types.find(type => types.indexOf(type) > -1);
	const typeHTML = poke_types.map(
		type => `<small class="type rounded" style="background-color: ${colors[tipoTraducido(type)]}"><span>${tipoTraducido(type)}</span></small>`
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
