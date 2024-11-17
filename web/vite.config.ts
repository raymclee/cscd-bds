import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteTsconfigPaths from "vite-tsconfig-paths";
import relay from "vite-plugin-relay";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [relay, TanStackRouterVite({}), react(), viteTsconfigPaths()],
  server:
    mode === "development"
      ? {
          proxy: {
            "/graphql": {
              target: "http://localhost:3000",
              changeOrigin: true,
            },
          },
        }
      : {},
}));
