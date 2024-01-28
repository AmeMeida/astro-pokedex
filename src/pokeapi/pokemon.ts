export const colorMap = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
} as const;

export type PokemonTypes = keyof typeof colorMap;

export type Species = {
  name: string;
  id: number;
  pokemon_v2_pokemons: Pokemon[];
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemon_v2_pokemontypes: Type[];
  pokemon_v2_pokemonabilities: Ability[];
  pokemon_v2_pokemonsprites: [
    {
      sprites: string;
    }
  ];
};

export type Type = {
  pokemon_v2_type: {
    name: PokemonTypes;
  };
};

export type Ability = {
  pokemon_v2_ability: {
    name: string;
  };
  is_hidden: boolean;
};

type QueryResult = {
  pokemon_v2_pokemonspecies: Species[];
};

const query = `
  query getPokemon {
    pokemon_v2_pokemonspecies(order_by: {id: asc}) {
      name
      id
      pokemon_v2_pokemons {
        id
        name
        height
        weight
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
        pokemon_v2_pokemonabilities {
          pokemon_v2_ability {
            name
          }
          is_hidden
        }
        pokemon_v2_pokemonsprites {
          sprites(path: "front_default")
        }
      }
    }
  }
`;

console.log("Fetching...");

console.time("fetch-poke");

export const {
  data: { pokemon_v2_pokemonspecies: pokemons },
} = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Method-Used": "graphql",
  },
  body: JSON.stringify({ query }),
}).then((pokemon) => pokemon.json() as Promise<{ data: QueryResult }>);

export const pokemonNameToSprite = new Map<string, string>(pokemons.flatMap((species) => species.pokemon_v2_pokemons.map((pokemon) => {
  return [pokemon.name, pokemon.pokemon_v2_pokemonsprites[0].sprites] as const;
})));

console.timeEnd("fetch-poke");