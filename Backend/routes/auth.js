const express = require('express')
const authRouter = express.Router()

const AuthController= require('../controller/AuthController')

authRouter.post('/register',AuthController.register)
//authRouter.post('/register',(req, res)=> AuthController.register(req,res));

//authRouter.post('/login', (req,res)=> AuthController.login(req,res))
authRouter.post('/login', AuthController.login)
authRouter.post('/verify', AuthController.verifyVoter)

module.exports = authRouter


