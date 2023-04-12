$(document).ready(function() {
    var pokemonNumbers = Array.from({length: 151}, (_, i) => i + 1);

    function getPokemonDetails(pokemonNumber) {
        return $.getJSON(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
    }
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }
    function addPokemonCard(pokemon) {
        var $pokemonCard = $('<div>').addClass('pokemon-card');
        var $pokemonImage = $('<img>').attr('src', pokemon.sprites.front_default);
        var $pokemonName = $('<h2>').text(toTitleCase(pokemon.name));
        const $pokemonId = `
        <span class="number">#${pokemon.id
            .toString()
            .padStart(3, '0')}</span>
        `
        var $pokemonTypeList = $('<ul>').addClass('pokemon-types');
        pokemon.types.forEach(function(type) {
            var $pokemonType = $('<li>').addClass(`type ${type.type.name}`).text(type.type.name);
            $pokemonTypeList.append($pokemonType);
        });
        var $pokemonStatsList = $('<ul>').addClass('pokemon-stats');
        pokemon.stats.forEach(function(stat) {
            var $pokemonStat = $('<li>').text(`${stat.stat.name}: ${stat.base_stat}`);
            $pokemonStatsList.append($pokemonStat);
        });
        $pokemonCard.append($pokemonImage, $pokemonName, $pokemonId, $pokemonTypeList, $pokemonStatsList);
        $('#pokedex').append($pokemonCard);

       
    }
    const pokemonCards = document.querySelectorAll('.pokemon-card');

pokemonCards.forEach(card => {
  card.addEventListener('click', () => {
    const pokemonId = card.getAttribute('data-id');
    const pokemonName = card.querySelector('.pokemon-name').textContent;
    
    // Aquí es donde vamos a agregar la lógica para mostrar la información del Pokémon
  });
});


    pokemonNumbers.forEach(function(pokemonNumber) {
        getPokemonDetails(pokemonNumber).done(function(pokemon) {
            addPokemonCard(pokemon);
        });
    });

    $('#search').on('input', function() {
        var searchTerm = $(this).val().toLowerCase();
        $('#pokedex .pokemon-card').each(function() {
            var $pokemonCard = $(this);
            var pokemonName = $pokemonCard.find('h2').text().toLowerCase();
            if (pokemonName.indexOf(searchTerm) > -1) {
                $pokemonCard.show();
            } else {
                $pokemonCard.hide();
            }
        });
    });
    
});

