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
  
