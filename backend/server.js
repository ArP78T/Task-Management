const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose=require('mongoose')
require('./connection/Conn')
const userApi = require('./routes/Route')
const taskApi=require('./routes/Route')
const PORT = process.env.PORT || 1000;

app.use(express.json());

mongoose.connect("mongodb+srv://arpit:dixit@cluster0.okboxsq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then
(()=>console.log("Connect"))


app.use('/api', userApi)
app.use('/api', taskApi)
require('./connection/Conn');


app.use(cors({
  origin: "https://task-management-frontend-u3mr.onrender.com", // your frontend domain
  credentials: true
}));


app.listen(PORT, () => {
    console.log(`Server is started PORT=${process.env.PORT}`);
})

