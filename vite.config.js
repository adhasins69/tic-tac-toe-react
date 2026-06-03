import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config with the React plugin enabled.
export default defineConfig({
  plugins: [react()],
});
