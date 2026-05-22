import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  // Served from https://studiohatchtv.github.io/studio-hatch-web/ on Pages.
  base: command === "build" ? "/studio-hatch-web/" : "/",
  plugins: [react()],
  server: { port: 5180 },
}));
