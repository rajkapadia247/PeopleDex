import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  define: {
    "import.meta.env.VITE_GIT_SHA": JSON.stringify(
      process.env.VITE_GIT_SHA || "dev"
    ),
    "import.meta.env.VITE_GIT_BRANCH": JSON.stringify(
      process.env.VITE_GIT_BRANCH || "local"
    ),
  },
});
