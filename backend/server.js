const express = require('express')
const app = express();
const cors=require("cors")
app.use(cors());
app.use(express.json());
require('dotenv').config();
require('./connection/Conn')
const userApi = require('./routes/Route')
const taskApi=require('./routes/Route')


app.use('/api', userApi)
app.use('/api', taskApi)
app.use(cors({
  origin: "https://task-management-frontend-u3mr.onrender.com", 
  credentials: true
}));

app.listen(`${process.env.PORT}`, () => {
    console.log(`Server is started PORT=${process.env.PORT}`);
})