import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/",
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(assetInfo.name)) {
            return "assets/images/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
