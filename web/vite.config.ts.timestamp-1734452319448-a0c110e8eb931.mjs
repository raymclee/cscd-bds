// vite.config.ts
import { defineConfig } from "file:///C:/Users/ray.mclee/Development/cscd-bds/web/node_modules/.pnpm/vite@5.4.10_@types+node@22.9.0_terser@5.36.0/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/ray.mclee/Development/cscd-bds/web/node_modules/.pnpm/@vitejs+plugin-react@4.3.3_vite@5.4.10_@types+node@22.9.0_terser@5.36.0_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { TanStackRouterVite } from "file:///C:/Users/ray.mclee/Development/cscd-bds/web/node_modules/.pnpm/@tanstack+router-plugin@1.79.0_vite@5.4.10_@types+node@22.9.0_terser@5.36.0__webpack-sources@3.2.3_webpack@5.96.1/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import viteTsconfigPaths from "file:///C:/Users/ray.mclee/Development/cscd-bds/web/node_modules/.pnpm/vite-tsconfig-paths@5.1.2_typescript@5.6.3_vite@5.4.10_@types+node@22.9.0_terser@5.36.0_/node_modules/vite-tsconfig-paths/dist/index.js";
import relay from "file:///C:/Users/ray.mclee/Development/cscd-bds/web/node_modules/.pnpm/vite-plugin-relay@2.1.0_babel-plugin-relay@18.1.0_vite@5.4.10_@types+node@22.9.0_terser@5.36.0_/node_modules/vite-plugin-relay/dist/plugin.js";
var vite_config_default = defineConfig(({ mode }) => ({
  plugins: [relay, TanStackRouterVite({}), react(), viteTsconfigPaths()],
  server: mode === "development" ? {
    proxy: {
      "/graphql": {
        target: "http://localhost:3000",
        changeOrigin: true
      },
      "/static": {
        target: "http://localhost:3000",
        changeOrigin: true
      },
      "/api/v1": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  } : {},
  build: {
    assetsInlineLimit: Number.MAX_SAFE_INTEGER
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxyYXkubWNsZWVcXFxcRGV2ZWxvcG1lbnRcXFxcY3NjZC1iZHNcXFxcd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxyYXkubWNsZWVcXFxcRGV2ZWxvcG1lbnRcXFxcY3NjZC1iZHNcXFxcd2ViXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9yYXkubWNsZWUvRGV2ZWxvcG1lbnQvY3NjZC1iZHMvd2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyBUYW5TdGFja1JvdXRlclZpdGUgfSBmcm9tIFwiQHRhbnN0YWNrL3JvdXRlci1wbHVnaW4vdml0ZVwiO1xyXG5pbXBvcnQgdml0ZVRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcclxuaW1wb3J0IHJlbGF5IGZyb20gXCJ2aXRlLXBsdWdpbi1yZWxheVwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcclxuICBwbHVnaW5zOiBbcmVsYXksIFRhblN0YWNrUm91dGVyVml0ZSh7fSksIHJlYWN0KCksIHZpdGVUc2NvbmZpZ1BhdGhzKCldLFxyXG4gIHNlcnZlcjpcclxuICAgIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIlxyXG4gICAgICA/IHtcclxuICAgICAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgICAgIFwiL2dyYXBocWxcIjoge1xyXG4gICAgICAgICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIixcclxuICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiL3N0YXRpY1wiOiB7XHJcbiAgICAgICAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiLFxyXG4gICAgICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCIvYXBpL3YxXCI6IHtcclxuICAgICAgICAgICAgICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCIsXHJcbiAgICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICAgIDoge30sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGFzc2V0c0lubGluZUxpbWl0OiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUixcclxuICB9LFxyXG59KSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1QsU0FBUyxvQkFBb0I7QUFDNVYsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsMEJBQTBCO0FBQ25DLE9BQU8sdUJBQXVCO0FBQzlCLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFNBQVMsQ0FBQyxPQUFPLG1CQUFtQixDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsa0JBQWtCLENBQUM7QUFBQSxFQUNyRSxRQUNFLFNBQVMsZ0JBQ0w7QUFBQSxJQUNFLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxRQUNWLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxNQUNoQjtBQUFBLE1BQ0EsV0FBVztBQUFBLFFBQ1QsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2hCO0FBQUEsTUFDQSxXQUFXO0FBQUEsUUFDVCxRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsRUFDRixJQUNBLENBQUM7QUFBQSxFQUNQLE9BQU87QUFBQSxJQUNMLG1CQUFtQixPQUFPO0FBQUEsRUFDNUI7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
