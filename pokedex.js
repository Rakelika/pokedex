const pokeContainer$$ = document.querySelector(".container");
console.log(pokeContainer$$ )


// RECOGER DATOS API

const getPokemons = async () => { 
    const finalPokemons = [];
    for (let i = 1; i < 151; i++) {
    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${i}`);
    const res = await response.json();
    finalPokemons.push(res);
    }

    return finalPokemons
}

//RECOGER DATOS DE CADA POKEMON

const mapPokemons = (pokemons) => {
    return pokemons.map((pokemon) => ({
        name : pokemon.name,
        image: pokemon.sprites['front_default'],
        type: pokemon.types[0].type.name,
        ability: pokemon.abilities[0].ability.name,
    }));
  };

 // MOSTRAR POKEMONS EN PANTALLA
 
 const drawPokemons = (pokemons) => {
    pokeContainer$$.innerHTML = "";
  
    for (const pokemon of pokemons) {
      let pokemonFigure = document.createElement("figure");
      pokemonFigure.className = "figure_pokemon";

      let pokemonImage = document.createElement("img");
      pokemonImage.setAttribute("src", pokemon.image);
      pokemonImage.setAttribute("alt", pokemon.name);
  
      let pokemonName = document.createElement("h3");
      pokemonName.textContent = pokemon.name;
  
      let pokemonType = document.createElement("h5");
      pokemonType.textContent = pokemon.type;

      let pokemonAbility = document.createElement("h5");
      pokemonAbility.textContent = pokemon.ability;
  
      pokemonFigure.appendChild(pokemonImage);
      pokemonFigure.appendChild(pokemonName);
      pokemonFigure.appendChild(pokemonType);
      pokemonFigure.appendChild(pokemonAbility);
  
      pokeContainer$$.appendChild(pokemonFigure);
    }
  }
  
  // BUSCADOR POKEMONS

const drawInput = (pokemons) => {
    const input$$ = document.querySelector("input");
    input$$.addEventListener("input", ()=>
      searchPokemons(input$$.value, pokemons)
    );
  };
  
  searchPokemons = (filtro, array) => {
    let filteredPokemons = array.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(filtro.toLowerCase())
    );
    drawPokemons(filteredPokemons);
  };
  

  // LLAMAR A LAS FUNCIONES EN ORDEN

const init = async () => {
    const pokemons = await getPokemons();
    const mappedPokemons = mapPokemons(pokemons);
    drawPokemons (mappedPokemons);
    drawInput(mappedPokemons);
}

init()


