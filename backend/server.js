const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./connection/Conn');

// ✅ Use correct CORS settings FIRST
app.use(cors({
  origin: "https://task-management-frontend-u3mr.onrender.com", // your frontend domain
  credentials: true
}));

// ✅ Parse JSON before routes
app.use(express.json());

// ✅ Routes
const userApi = require('./routes/Route');
const taskApi = require('./routes/Route');

app.use('/api', userApi);
app.use('/api', taskApi);

// ✅ Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is started PORT=${PORT}`);
});
