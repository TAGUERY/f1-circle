import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/", // Spécifiez le chemin de base approprié
  plugins: [vue()],
});
