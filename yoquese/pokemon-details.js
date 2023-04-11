function fetchPokemonDetails(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  
    fetch(url)
      .then(response => response.json())
      .then(pokemonData => {
        // Aquí podrías almacenar los detalles del pokemonData en un objeto pokemon y luego llamar a la función displayPokemonDetails.
        console.log(pokemonData);
      })
      .catch(error => {
        console.log(`Error fetching Pokémon details: ${error}`);
      });
  }
function displayPokemonDetails(pokemon) {
    const nameElement = document.getElementById('pokemon-name');
    nameElement.textContent = pokemon.name;

    const imageElement = document.getElementById('pokemon-image');
    imageElement.src = pokemon.image;
    imageElement.alt = pokemon.name;

    const idElement = document.getElementById('pokemon-id');
    idElement.textContent = pokemon.id.toString().padStart(3, '0');

    const typesElement = document.getElementById('pokemon-types');
    typesElement.textContent = pokemon.types.join(', ');

    const heightElement = document.getElementById('pokemon-height');
    heightElement.textContent = pokemon.height / 10;

    const weightElement = document.getElementById('pokemon-weight');
    weightElement.textContent = pokemon.weight / 10;

    const abilitiesElement = document.getElementById('pokemon-abilities');
    abilitiesElement.innerHTML = '';
    pokemon.abilities.forEach(ability => {
        const li = document.createElement('li');
        li.textContent = ability;
        abilitiesElement.appendChild(li);
    });
}
