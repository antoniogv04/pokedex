const pokemonContainer = document.getElementById('pokemon-container');
const pokemonId = new URLSearchParams(window.location.search).get('id');

function renderPokemonDetails(pokemon, species) {
  const pokemonHTML = `
  <h2>${pokemon.name}</h2>
  <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
  <p>Height: ${pokemon.height}</p>
  <p>Weight: ${pokemon.weight}</p>
  <p>Number: ${pokemon.id.toString().padStart(3, '0')}</p>
  <p>Types: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
  <p>Stats:</p>
  ${pokemon.stats.map(s => `
    <div>
      <span>${s.stat.name}: </span>
      <span>${s.base_stat}</span>
      <div class="stat-bar" style="width: ${s.base_stat / 2}%"></div>
    </div>
  `).join('')}
    <h3>Evolutions:</h3>
    ${renderEvolutionChain(species)}
  `;
  pokemonContainer.innerHTML = pokemonHTML;
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