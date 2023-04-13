const pokemonContainer = document.getElementById('pokemon-container');
const pokemonId = new URLSearchParams(window.location.search).get('id');

function renderPokemonDetails(pokemon, species) {
  const pokemonHTML = `
  <div class="data-poke-conteiner"><h2>${pokemon.name}</h2>
  <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
  <p>altura: ${pokemon.height/10} M</p>
  <p>peso: ${pokemon.weight/10} Kg</p>
  <p>numero: #${pokemon.id.toString().padStart(3, '0')}</p>
  <p>tipos: ${pokemon.types.map(t => tipoTraducido(t.type.name)).join(', ')}</p>
  <p>stadisticas:</p>
  ${pokemon.stats.map(s => `
    <div>
      <span>${s.stat.name}: </span>
      <span>${s.base_stat}</span>
      <div class="stat-bar" style="width: ${s.base_stat / 2}%"></div>
    </div>
  `).join('')}
    <h3>evoluciones:</h3>
    ${renderEvolutionChain(species)}
  `;
  pokemonContainer.innerHTML = pokemonHTML;
}

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

function renderEvolutionChain(species) {
  const evolutionChain = species.evolution_chain.url;
  fetch(evolutionChain)
    .then(response => response.json())
    .then(data => {
      const evolutionHTML = renderChain(data.chain);
      pokemonContainer.insertAdjacentHTML('beforeend', evolutionHTML);
    })
    .catch(err => console.log(err));
}

function renderChain(chain) {
    const currentPokemon = chain.species.name ? `<a href="pokemon.html?id=${chain.species.name}">${chain.species.name}</a>` : '';
    const evolvesTo = chain.evolves_to.map(e => renderChain(e)).join('');
    return `<div>${currentPokemon}${evolvesTo}</div>`;
  }

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}?language=es`)
  .then(data => data.json())
  .then(response => {
    const speciesURL = response.species.url;
    fetch(speciesURL)
      .then(response => response.json())
      .then(data => renderPokemonDetails(response, data))
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));