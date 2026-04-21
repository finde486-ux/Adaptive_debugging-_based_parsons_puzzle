require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const initSocket = require('./socket');
const authRoutes = require('./routes/auth');
const assessmentRoutes = require('./routes/assessment');
const puzzleRoutes = require('./routes/puzzles');
const analyticsRoutes = require('./routes/analytics');
const adminRoutes = require('./routes/admin');
const { generalLimiter } = require('./middleware/rateLimiter');

const app = express();
const server = http.createServer(app);
initSocket(server);
const PORT = process.env.SERVER_PORT || 3001;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(generalLimiter);

// Connect to MongoDB (optional for just testing routes, but good for completeness)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
}

app.use('/auth', authRoutes);
app.use('/assessment', assessmentRoutes);
app.use('/puzzles', puzzleRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('DebugQuest API v1.0');
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
