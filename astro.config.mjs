import { defineConfig } from 'astro/config';
import { speciesNames } from "./src/pokeapi/pokemon"
import node from "@astrojs/node";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  output: "static",
  image: {
    domains: ["raw.githubusercontent.com"]
  },
  redirects: Object.fromEntries(speciesNames.map((name, index) => [`/pokemon/${index + 1}`, `/pokemon/${name}`])),
  integrations: [icon()]
});
