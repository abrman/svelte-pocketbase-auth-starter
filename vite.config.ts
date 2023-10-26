import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tsconfigPaths from "vite-tsconfig-paths";
import Unfonts from "unplugin-fonts/vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./pocketbase/pb_public/",
  },
  plugins: [
    tsconfigPaths(),
    svelte(),
    Unfonts({
      google: {
        families: [
          {
            name: "Source Sans Pro",
            styles: "ital,wght@0,400;0,700",
            defer: true,
          },
          {
            name: "Ubuntu Mono",
            styles: "ital,wght@0,400",
            defer: true,
          },
        ],
      },
    }),
  ],
});
