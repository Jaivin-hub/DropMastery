// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // <-- ADD THIS IMPORT
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(), // <-- ADD THIS PLUGIN
    tailwindcss(),
  ],
  server: {
    proxy: {
      // This rule tells Vite to forward any request starting with '/api'
      // to your backend server running on http://localhost:5000
      '/api': {
        target: 'http://localhost:5000', // ✅ Make sure this matches your backend's port!
        changeOrigin: true, // Needed for virtual hosted sites
        // rewrite: (path) => path.replace(/^\/api/, ''),
        // ⚠️ You typically DON'T need the 'rewrite' rule if your backend routes
        // are already prefixed with '/api' (e.g., your route is '/api/users/role/mentor').
        // If you were to uncomment 'rewrite', it would remove '/api' from the request
        // before sending it to your backend, making the backend see '/users/role/mentor'
        // instead of '/api/users/role/mentor'.
        // So, for your current setup, keep 'rewrite' commented out or remove it.
      },
    },
  },
});