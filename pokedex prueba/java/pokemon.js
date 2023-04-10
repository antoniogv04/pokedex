function mostrarDetalle() {
    // Obtener el ID de la tarjeta de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get("id");
  
    // Obtener el elemento donde se mostrará la información detallada
    const seccionDetalle = document.getElementById("detalle");
  
    // Mostrar la información detallada de la tarjeta
    seccionDetalle.innerHTML = "<h2>Detalle de la tarjeta " + pokemonId + "</h2><p>Información detallada de la tarjeta " + pokemonId + "</p>";
  }