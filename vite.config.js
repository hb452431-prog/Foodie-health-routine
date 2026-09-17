import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import foodPlanHandler from './api/ai/food-plan.js';
import foodImageHandler from './api/generate-food-image.js';

function devApiPlugin() {
  return {
    name: 'dev-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          try {
            const cleanPath = req.url.split('?')[0].replace(/^\/api\//, '').replace(/\/$/, '');
            let handler = null;
            if (cleanPath === 'ai/food-plan' || cleanPath === 'food-plan') {
              handler = foodPlanHandler;
            } else if (cleanPath === 'generate-food-image' || cleanPath === 'ai/generate-food-image') {
              handler = foodImageHandler;
            }

            if (!handler) {
              res.statusCode = 404;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'API route not found', code: 'NOT_FOUND' }));
              return;
            }

            // Read request body
            let body = '';
            req.on('data', chunk => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                req.body = body ? JSON.parse(body) : {};
              } catch (e) {
                req.body = {};
              }

              // Custom mock response object matching Vercel Serverless Function signature
              const vercelRes = {
                statusCode: 200,
                setHeader: (name, value) => res.setHeader(name, value),
                status: (code) => {
                  res.statusCode = code;
                  return vercelRes;
                },
                json: (data) => {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                  return vercelRes;
                },
                end: (data) => {
                  res.end(data);
                  return vercelRes;
                }
              };

              await handler(req, vercelRes);
            });
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message, code: 'DEV_SERVER_ERROR' }));
          }
          return;
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load local env file if present and set into process.env for server middleware
  const env = loadEnv(mode, process.cwd(), '');
  if (env.GEMINI_API_KEY) process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
  if (env.GOOGLE_API_KEY) process.env.GOOGLE_API_KEY = env.GOOGLE_API_KEY;
  if (env.GOOGLE_GENAI_API_KEY) process.env.GOOGLE_GENAI_API_KEY = env.GOOGLE_GENAI_API_KEY;
  if (env.GEMINI_KEY) process.env.GEMINI_KEY = env.GEMINI_KEY;

  return {
    plugins: [react(), devApiPlugin()],
    build: {
      target: ['es2015', 'chrome64', 'edge79', 'firefox67', 'safari12'],
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/lucide-react/')) {
              return 'vendor-icons';
            }
            if (id.includes('node_modules/canvas-confetti/')) {
              return 'vendor-confetti';
            }
          }
        }
      }
    }
  };
});
