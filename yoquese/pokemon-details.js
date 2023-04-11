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
  let pokemonImage = document.createElement("img");
  pokemonImage.src = data.sprites.front_default;
  
  let pokemonName = document.createElement("h2");
  pokemonName.textContent = data.name;
  
  let pokemonNumber = document.createElement("p");
  pokemonNumber.textContent = `Número en la Pokédex: ${data.id}`;
  
  let pokemonTypes = document.createElement("p");
  pokemonTypes.textContent = "Tipo o tipos: ";
  data.types.forEach(type => {
    let typeSpan = document.createElement("span");
    typeSpan.textContent = type.type.name;
    typeSpan.classList.add(type.type.name);
    pokemonTypes.appendChild(typeSpan);
  });
  
  let pokemonWeight = document.createElement("p");
  pokemonWeight.textContent = `Peso en kilogramos: ${data.weight / 10}`;
  
  let pokemonHeight = document.createElement("p");
  pokemonHeight.textContent = `Altura en metros: ${data.height / 10}`;
  
  let stats = data.stats.map(stat => {
    return {
      name: stat.stat.name,
      value: stat.base_stat
    }
  });
  
  let pokemonStats = document.createElement("div");
  pokemonStats.classList.add("pokemon-stats");
  stats.forEach(stat => {
    let statContainer = document.createElement("div");
    statContainer.classList.add("stat-container");
  
    let statName = document.createElement("span");
    statName.textContent = stat.name;
    statContainer.appendChild(statName);
  
    let statValue = document.createElement("span");
    statValue.textContent = stat.value;
    statContainer.appendChild(statValue);
  
    let statBar = document.createElement("span");
    statBar.classList.add("stat-bar");
    statBar.style.width = `${stat.value / 2}%`;
    statContainer.appendChild(statBar);
  
    pokemonStats.appendChild(statContainer);
  });
  
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
  .then(response => response.json())
  .then(data => {
    let evolutionChainUrl = data.evolution_chain.url;
    fetch(evolutionChainUrl)
      .then(response => response.json())
      .then(data => {
        let chain = data.chain;
        let evolutionChain = document.createElement("div");
        evolutionChain.classList.add("evolution-chain");
        createEvolutionChain(chain, evolutionChain);
        // Aquí se muestra la cadena evolutiva del pokémon
      });
  });

// Obtener el ID del Pokémon deseado
const pokemonId = 25; // Pikachu

// Hacer una solicitud a la API de PokéAPI para obtener la información del Pokémon
fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
  .then(response => response.json())
  .then(data => {
    const evolutionChainUrl = data.species.url; // Obtener la URL de la cadena evolutiva
    
    // Hacer una solicitud a la API de PokéAPI para obtener la cadena evolutiva
    fetch(evolutionChainUrl)
      .then(response => response.json())
      .then(data => {
        const chain = data.chain; // Obtener la cadena evolutiva
        
        // Mostrar la cadena evolutiva en la página web
        const evolutionChainElement = document.getElementById('evolution-chain');
        evolutionChainElement.innerHTML = '';

        let currentPokemon = chain.species;
        while (currentPokemon) {
          const name = currentPokemon.name;
          const url = currentPokemon.url;
          const trigger = currentPokemon.evolution_trigger || 'Nivel'; // Obtener el trigger de evolución o establecer el valor por defecto "Nivel"
          
          // Crear un elemento <a> para cada Pokémon en la cadena evolutiva
          const pokemonElement = document.createElement('a');
          pokemonElement.href = url;
          pokemonElement.textContent = name;
          
          // Añadir un evento de clic para mostrar la información detallada del Pokémon
          pokemonElement.addEventListener('click', (event) => {
            event.preventDefault();
            // Obtener la información detallada del Pokémon y mostrarla en la página web
            // ...
          });
          
          // Añadir el elemento <a> al contenedor de la cadena evolutiva
          evolutionChainElement.appendChild(pokemonElement);
          
          // Obtener el siguiente Pokémon en la cadena evolutiva
          currentPokemon = currentPokemon.evolves_to[0];
        }
      });
  });