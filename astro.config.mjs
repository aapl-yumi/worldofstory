import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import partytown from "@astrojs/partytown";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import preact from "@astrojs/preact";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://worldofstory.worldroad.org/",
  integrations: [tailwind(), partytown(), sitemap(), preact(), react()],
});
