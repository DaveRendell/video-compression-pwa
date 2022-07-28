import { defineConfig } from 'vite';

export default defineConfig({
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
