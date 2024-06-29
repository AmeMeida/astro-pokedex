import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";

type Response = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

const resultPokemons: Response = await fetch(
  "https://pokeapi.co/api/v2/pokemon-species?limit=10000"
).then((response) => response.json());

const speciesNames = resultPokemons.results
  .map((species) => species.name)
  .filter(Boolean);

// https://astro.build/config
export default defineConfig({
  output: "static",
  prefetch: true,
  site: "https://amemeida.github.io",
  base: "astro-pokedex",
  redirects: {
    ...Object.fromEntries(
      speciesNames.map((name, index) => [`/astro-pokedex/${index + 1}`, `/astro-pokedex/${name}/`])
    ),
  },
  image: {
    domains: ["raw.githubusercontent.com"],
  },
  integrations: [
    icon(),
    tailwind({
      configFile: "tailwind.config.ts",
    }),
  ],
});
