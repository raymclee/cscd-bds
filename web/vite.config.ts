import MillionLint from "@million/lint";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteTsconfigPaths from "vite-tsconfig-paths";
import relay from "vite-plugin-relay";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    // MillionLint.vite({
    //   enabled: true,
    // }),
    relay,
    TanStackRouterVite({}),
    react(),
    viteTsconfigPaths(),
  ],
  server: {
    proxy: getProxy(mode),
  },
  build: {
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
  },
}));

function getProxy(mode: string) {
  const target = "http://localhost:4000";
  return {
    ...(mode === "development"
      ? {
          "/graphql": {
            target,
            changeOrigin: true,
          },
          "/static": {
            target,
            changeOrigin: true,
          },
          "/3dm": {
            target,
            changeOrigin: true,
          },
          "/api/v1": {
            target,
            changeOrigin: true,
          },
          "/webroot/decision": {
            target,
            changeOrigin: true,
          },
        }
      : {}),
  };
}
