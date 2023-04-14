const pokemonContainer = document.getElementById('pokemon-container');
const pokemonId = new URLSearchParams(window.location.search).get('id');



function renderPokemonDetails(pokemon, species) {
  const pokemonHTML = `
    <div class="data-poke-conteiner">
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <p>altura: ${pokemon.height/10} M</p>
      <p>peso: ${pokemon.weight/10} Kg</p>
      <p>numero: #${pokemon.id.toString().padStart(3, '0')}</p>
      <p>tipo: ${pokemon.types.map(t => tipoTraducido(t.type.name)).join(', ')}</p>
      <p>estadisticas:</p>
      ${renderStats(pokemon)}
    </div>
  `;
  
  pokemonContainer.innerHTML = pokemonHTML;
  
  
  if (!species.is_legendary) {
    const evolutionHTML = `
      <h3 id="evoluciones">evoluciones:</h3>
      ${renderEvolutionChain(species)}
    `;
    pokemonContainer.insertAdjacentHTML('beforeend', evolutionHTML);
    document.querySelectorAll('.evolution-chain').forEach(chain => {
      chain.style.display = 'flex';
      chain.style.flexDirection = 'row';
    });
  }
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
  function renderStats(pokemon){
   
    return `
    <div class="estadisticas">
            vida: ${ pokemon.stats[0].base_stat} <progress max="252" value="${ pokemon.stats[0].base_stat}"></progress> <br>
            ataque: ${ pokemon.stats[1].base_stat} <progress max="252" value="${ pokemon.stats[1].base_stat}"></progress> <br>
            defensa: ${pokemon.stats[2].base_stat} <progress max="252" value="${ pokemon.stats[2].base_stat}"></progress> <br>
            ataque especial ${pokemon.stats[3].base_stat} <progress max="252" value="${ pokemon.stats[3].base_stat}"></progress> <br>
            defensa especial ${pokemon.stats[4].base_stat} <progress max="252" value="${ pokemon.stats[4].base_stat}"></progress> <br>
            velocidad ${pokemon.stats[5].base_stat} <progress max="252" value="${ pokemon.stats[5].base_stat}"></progress> <br>
        </div>
    `

  
}

function renderChain(chain) {
  const currentPokemon = chain.species.name ? `<a href="pokemon.html?id=${chain.species.name}"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chain.species.url.split('/')[6]}.png" alt="${chain.species.name}" /></a><br><br><br><br> ${chain.species.name}` : '';
  const evolvesTo = chain.evolves_to.map(e => {
    const evolutionTrigger = e.evolution_details[0].trigger.name;
    const evolutionCondition = e.evolution_details[0].trigger.name === 'level-up' ? `al nivel ${e.evolution_details[0].min_level}` : '';
    return `<div class="evolution-info"><div id=info_evolution>${evolutionTrigger} ${evolutionCondition} → </div><div class="evolves-to">${renderChain(e)}</div></div>`;
  }).join('');
  return `<div class="evolution-chain">${currentPokemon}${evolvesTo}</div>`;
}

function renderEvolutionChain(species) {
  const evolutionChain = species.evolution_chain.url;
  fetch(evolutionChain)
    .then(response => response.json())
    .then(data => {
      const evolutionHTML = renderChain(data.chain);
      pokemonContainer.insertAdjacentHTML('beforeend', evolutionHTML);
      document.querySelectorAll('.evolution-chain').forEach(chain => {
        chain.style.display = 'flex';
        chain.style.flexDirection = 'row';
      });
    })
    .catch(err => console.log(err));
}
function getPokemonIdFromUrl(url) {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 2];
}

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
  .then(data => data.json())
  .then(response => {
    const speciesURL = response.species.url;
    fetch(speciesURL)
      .then(response => response.json())
      .then(data => renderPokemonDetails(response, data))
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));