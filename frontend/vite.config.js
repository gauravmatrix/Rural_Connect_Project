import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const primaryProxyTarget = env.VITE_PROXY_TARGET || "http://localhost:8080";
  const fallbackProxyTarget = env.VITE_PROXY_FALLBACK_TARGET || "http://localhost:8081";
  let activeProxyTarget = primaryProxyTarget;

  return {
    plugins: [],
    server: {
      host: true,
      port: 5173,
      proxy: {
        "/api": {
          target: activeProxyTarget,
          changeOrigin: true,
          router: () => activeProxyTarget,
          configure: (proxy, options) => {
            proxy.on("error", (error, _req, res) => {
              if (activeProxyTarget !== fallbackProxyTarget) {
                activeProxyTarget = fallbackProxyTarget;
                options.target = fallbackProxyTarget;
                console.warn(
                  `[vite-proxy] Primary target ${primaryProxyTarget} is unreachable. Switched to fallback ${fallbackProxyTarget}.`
                );
              }

              if (res && !res.headersSent) {
                res.writeHead(502, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Backend unavailable" }));
              }

              console.error(`[vite-proxy] ${error.message}`);
            });
          },
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) {
              return undefined;
            }
            return "vendor";
          },
        },
      },
    },
  };
});
