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
        image: pokemon.sprites.other.dream_world.front_default,
        type: pokemon.types[0].type.name,
        ability: pokemon.abilities[0].ability.name,
    }));
  };

 // MOSTRAR POKEMONS EN PANTALLA

 const pokeListado$$ = document.querySelector("ol");
 
 const drawPokemons = (pokemons) => {
  pokeListado$$.innerHTML = "";
  
    for (const pokemon of pokemons) {
        let pokemonFigure = document.createElement("li");
        pokemonFigure.className = "card";

        let pokemonName = document.createElement("h3");
        pokemonName.textContent = pokemon.name;
        pokemonName.className = "card__tittle";

        // let pokemonImgDiv = document.createElement("div");
        // pokemonImgDiv.className = "card__div__img";

        let pokemonImage = document.createElement("img");
        pokemonImage.setAttribute("src", pokemon.image);
        pokemonImage.setAttribute("alt", pokemon.name);
        pokemonImage.className = "card__img";

        let pokemonInfoDiv = document.createElement("div");
        pokemonInfoDiv.className = "card__div__info";

        let pokemonType = document.createElement("span");
        pokemonType.textContent = pokemon.type;

        pokemon.type === "grass" ? pokemonType.className = "type__grass":
        pokemon.type === "fire" ? pokemonType.className = "type__fire":
        pokemon.type === "water" ? pokemonType.className = "type__water":
        pokemon.type === "bug" ? pokemonType.className = "type__bug":
        pokemon.type === "normal" ? pokemonType.className = "type__normal":
        pokemon.type === "poison" ? pokemonType.className = "type__poison":
        pokemon.type === "electric" ? pokemonType.className = "type__electric":
        pokemon.type === "ground" ? pokemonType.className = "type__ground":
        pokemon.type === "fairy" ? pokemonType.className = "type__fairy":
        pokemon.type === "fighting" ? pokemonType.className = "type__fighting":
        pokemon.type === "psychic" ? pokemonType.className = "type__psychic":
        pokemon.type === "rock" ? pokemonType.className = "type__rock":
        pokemon.type === "ghost" ? pokemonType.className = "type__ghost":
        pokemon.type === "ice" ? pokemonType.className = "type__ice":
        pokemon.type === "dragon" ? pokemonType.className = "type__dragon":
        pokemonType.className = "type__none";

        let pokemonAbility = document.createElement("span");
        pokemonAbility.textContent = pokemon.ability;
        pokemonAbility.className = "card__ability";  
      
      pokemonFigure.appendChild(pokemonImage);
      pokemonFigure.appendChild(pokemonName);
      pokemonFigure.appendChild(pokemonInfoDiv);
      pokemonInfoDiv.appendChild(pokemonType);
      pokemonInfoDiv.appendChild(pokemonAbility);

      pokeListado$$.appendChild(pokemonFigure)

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


