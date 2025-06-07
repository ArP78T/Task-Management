
const { registerUser, LoginUser ,userDetail} = require('../controller/userController')
const { addTask, editTask, deleteTask, singleTask } = require("../controller/Tasks")
const {Protected}=require('../middleware/Auth')
const router = require('express').Router()


//User
router.post('/register', registerUser)
router.post('/login', LoginUser)
router.get('/userDetail',Protected,userDetail)

//Task
router.post('/addTask', Protected, addTask)
router.delete('/deleteTask/:id', Protected, deleteTask)
router.get('/addTask/:id',Protected,singleTask)

module.exports=router