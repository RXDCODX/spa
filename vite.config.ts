import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteSingleFile } from "vite-plugin-singlefile";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  server: { https: true },
  plugins: [
    react(),
    viteSingleFile({ useRecommendedBuildConfig: true }),
    mkcert(),
  ],
});
