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
import process from "process";
// https://vite.dev/config/
export default defineConfig(() => {
  // Resolve port from (1) process.env, (2) Vite env var, (3) import.meta.env, otherwise default 9999
  let port =
    (import.meta && import.meta.env && import.meta.env.VITE_API_PORT) ||
    process.env.VITE_API_PORT;
  if (!port) {
    console.log(
      "!!!!!!!!   no port defined in frontend env file !!!!!!!!!!!!!!!!!!!!!!"
    );
  }
// the port of the server and upload folder url
  const target = `http://localhost:${port}`;

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api/": target,
        "/uploads/": target,
      },
    },
    build: {
      chunkSizeWarningLimit: 2000, // Increase chunk size warning limit (in KB)
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Split node_modules into separate chunks
            if (id.includes("node_modules")) {
              return "vendor"; // Group all third-party libraries into a "vendor" chunk
            }
            // Further optimization for large libraries like React
            if (id.includes("react")) {
              return "react";
            }
            // More manual chunking can be done here depending on your needs
          },
        },
      },
    },
  };
});
