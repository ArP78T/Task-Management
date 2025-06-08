const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./connection/Conn')
const userApi = require('./routes/Route')
const taskApi=require('./routes/Route')
const PORT = process.env.PORT || 1000;

app.use(express.json());



app.use(cors({
  origin: "https://task-management-frontend-u3mr.onrender.com", // your frontend domain
  credentials: true
}));


app.use('/api', userApi)
app.use('/api', taskApi)
require('./connection/Conn');




app.listen(PORT, () => {
    console.log(`Server is started PORT=${process.env.PORT}`);
})

