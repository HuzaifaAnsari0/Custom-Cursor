const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/db');
// const errorHandler = require('./middleware/errorHandler');
// const cursorsRoutes = require('./routes/cursors');

dotenv.config();

// const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// app.use('/uploads', express.static(join(__dirname, 'uploads')));


// Routes
// app.use('/api/cursors', cursorsRoutes);

// Error Handler
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});