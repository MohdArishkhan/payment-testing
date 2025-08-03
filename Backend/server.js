// server.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import paymentRoutes from './Routes/Routes.js'; // <-- this is your payment route
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Fix __dirname in ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static HTML (if needed)
app.use('/pay', express.static(path.join(__dirname, 'views')));

// Test route
app.get('/', (req, res) => {
  res.send('Yo! Server is working fine.');
});

// API routes
app.use('/api/payment', paymentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
