// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const bodyParser = require('body-parser');

const containersRouter = require('./routes/containers');
const imagesRouter = require('./routes/images');
const { requireAuth } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
});
app.use(limiter);

// Serve frontend static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/containers', requireAuth, containersRouter);
app.use('/api/images', requireAuth, imagesRouter);

// health
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// SPA fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`CloudDock backend running on port ${PORT}`);
});
