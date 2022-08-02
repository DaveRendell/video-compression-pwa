import { defineConfig } from 'vite';

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
  },
  server: {
    cors: {
      allowedHeaders: [
        "Cross-Origin-Embedder-Policy",
        "Cross-Origin-Opener-Policy",
      ]
    },
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    }
  }
})
