// import { vitePlugin as remix } from "@remix-run/dev";
// import { installGlobals } from "@remix-run/node";
// import { defineConfig } from "vite";
// import tsconfigPaths from "vite-tsconfig-paths";
// import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

// installGlobals({ nativeFetch: true });

// // Fix HOST env var for Remix Shopify
// if (
//   process.env.HOST &&
//   (!process.env.SHOPIFY_APP_URL || process.env.SHOPIFY_APP_URL === process.env.HOST)
// ) {
//   process.env.SHOPIFY_APP_URL = process.env.HOST;
//   delete process.env.HOST;
// }

// const host = new URL(process.env.SHOPIFY_APP_URL || "http://localhost").hostname;
// let hmrConfig;

// if (host === "localhost") {
//   hmrConfig = {
//     protocol: "ws",
//     host: "localhost",
//     port: 64999,
//     clientPort: 64999,
//   };
// } else {
//   hmrConfig = {
//     protocol: "wss",
//     host: host,
//     port: parseInt(process.env.FRONTEND_PORT) || 8002,
//     clientPort: 443,
//   };
// }

// export default defineConfig({
//   server: {
//     allowedHosts: [host],
//     cors: {
//       preflightContinue: true,
//     },
//     port: Number(process.env.PORT || 3000),
//     hmr: hmrConfig,
//     fs: {
//       allow: ["app", "node_modules"],
//     },
//   },
//   plugins: [
//     remix({
//       ignoredRouteFiles: ["**/.*"],
//       future: {
//         v3_fetcherPersist: true,
//         v3_relativeSplatPath: true,
//         v3_throwAbortReason: true,
//         v3_lazyRouteDiscovery: true,
//         v3_singleFetch: false,
//         v3_routeConfig: true,
//       },
//     }),
//     tsconfigPaths(),
//     NodeGlobalsPolyfillPlugin({
//       process: true,
//       buffer: true,
//     }),
//   ],
//   resolve: {
//     alias: {
//       crypto: "crypto-browserify",
//     },
//   },
//   build: {
//     assetsInlineLimit: 0,
//   },
//   optimizeDeps: {
//     include: ["@shopify/app-bridge-react", "@shopify/polaris"],
//   },
// });


// import { vitePlugin as remix } from "@remix-run/dev";
// import { installGlobals } from "@remix-run/node";
// import { defineConfig } from "vite";
// import tsconfigPaths from "vite-tsconfig-paths";
// import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

// installGlobals({ nativeFetch: true });

// // Fix HOST env var for Remix Shopify
// if (
//   process.env.HOST &&
//   (!process.env.SHOPIFY_APP_URL || process.env.SHOPIFY_APP_URL === process.env.HOST)
// ) {
//   process.env.SHOPIFY_APP_URL = process.env.HOST;
//   delete process.env.HOST;
// }

// const host = new URL(process.env.SHOPIFY_APP_URL || "http://localhost").hostname;
// let hmrConfig;

// if (host === "localhost") {
//   hmrConfig = {
//     protocol: "ws",
//     host: "localhost",
//     port: 64999,
//     clientPort: 64999,
//   };
// } else {
//   hmrConfig = {
//     protocol: "wss",
//     host: host,
//     port: parseInt(process.env.FRONTEND_PORT) || 8002,
//     clientPort: 443,
//   };
// }

// export default defineConfig({
//   server: {
//     allowedHosts: [host],
//     cors: {
//       preflightContinue: true,
//     },
//     port: Number(process.env.PORT || 3000),
//     hmr: hmrConfig,
//     fs: {
//       allow: ["app", "node_modules"],
//     },
//   },
//   plugins: [
//     remix({
//       ignoredRouteFiles: ["**/.*"],
//       future: {
//         v3_fetcherPersist: true,
//         v3_relativeSplatPath: true,
//         v3_throwAbortReason: true,
//         v3_lazyRouteDiscovery: true,
//         v3_singleFetch: false,
//         v3_routeConfig: true,
//       },
//     }),
//     tsconfigPaths(),
//     NodeGlobalsPolyfillPlugin({
//       process: true,
//       buffer: true,
//     }),
//   ],
//   resolve: {
//     alias: {
//       crypto: "crypto-browserify",
//     },
//   },
//   build: {
//     assetsInlineLimit: 0,
//   },
//   optimizeDeps: {
//     include: ["@shopify/app-bridge-react", "@shopify/polaris"],
//   },
// });


import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

installGlobals({ nativeFetch: true });

// Fix HOST env var for Remix Shopify
if (
  process.env.HOST &&
  (!process.env.SHOPIFY_APP_URL || process.env.SHOPIFY_APP_URL === process.env.HOST)
) {
  process.env.SHOPIFY_APP_URL = process.env.HOST;
  delete process.env.HOST;
}

const host = new URL(process.env.SHOPIFY_APP_URL || "http://localhost").hostname;
let hmrConfig;

if (host === "localhost") {
  hmrConfig = {
    protocol: "ws",
    host: "localhost",
    port: 64999,
    clientPort: 64999,
  };
} else {
  hmrConfig = {
    protocol: "wss",
    host: host,
    port: parseInt(process.env.FRONTEND_PORT) || 8002,
    clientPort: 443,
  };
}

export default defineConfig({
  server: {
    allowedHosts: [
      host,
      "shipped-against-hits-rain.trycloudflare.com" // 👈 Add your current ngrok URL here
    ],
    cors: {
      preflightContinue: true,
    },
    port: Number(process.env.PORT || 3000),
    hmr: hmrConfig,
    fs: {
      allow: ["app", "node_modules"],
    },
  },
  plugins: [
    remix({
      ignoredRouteFiles: ["**/.*"],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
        v3_singleFetch: false,
        v3_routeConfig: true,
      },
    }),
    tsconfigPaths(),
    NodeGlobalsPolyfillPlugin({
      process: true,
      buffer: true,
    }),
  ],
  resolve: {
    alias: {
      crypto: "crypto-browserify",
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
  optimizeDeps: {
    include: ["@shopify/app-bridge-react", "@shopify/polaris"],
  },
});
