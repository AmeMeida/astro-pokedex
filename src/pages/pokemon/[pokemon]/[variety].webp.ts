import type { APIRoute, GetStaticPaths } from "astro";
import { pokemonNameToSprite, pokemons } from "../../../pokeapi/pokemon";
import sharp from "sharp";

export const getStaticPaths: GetStaticPaths = () => {
  return pokemons.flatMap((pokemon) =>
    pokemon.pokemon_v2_pokemons.flatMap((variety) => variety.pokemon_v2_pokemonsprites[0].sprites ? ({
      params: {
        pokemon: pokemon.name,
        variety: variety.name,
      },
    }) : [])
  );
};

export const GET: APIRoute = async ({ params }) => {
  const { variety } = params;
  const imageUrl = pokemonNameToSprite.get(variety!)!;

  console.log(imageUrl);

  const rawImage = await fetch(imageUrl).then((image) => image.arrayBuffer());

  const image = await sharp(rawImage)
    .resize(96, 96)
    .webp({
      quality: 10,
      effort: 6
    })
    .toBuffer();

  return new Response(image);
};
