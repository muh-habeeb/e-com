// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api/": "http://localhost:9999",
//       "/uploads/": "http://localhost:9999",
//     },
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "http://localhost:9999",
      "/uploads/": "http://localhost:9999",
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit (in KB)
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules into separate chunks
          if (id.includes('node_modules')) {
            return 'vendor'; // Group all third-party libraries into a "vendor" chunk
          }
          // Further optimization for large libraries like React
          if (id.includes('react')) {
            return 'react';
          }
          // More manual chunking can be done here depending on your needs
        },
      },
    },
  },
});
