require('dotenv').config()

// server creation
// express

// step 1 - import express

const express = require('express')
const router = require('./routes/router')
const cors=require('cors')

// step 2 create server using express 

const server = express()

// integrate front-end
server.use(cors())


// to convert all incoming json data -> javascript data

server.use(express.json())

// router set
server.use(router)

// import connection.js file
require('./database/connection')

// step 3 - server run

// port 

const port = 5000 || process.env.port



server.listen(port,()=>{
    console.log(`__________ server started at port number ${port}______`);
})

// install nodemon

// // api calls resolve - post

// server.post('/register',(req,res)=>{
//     res.send("post method working..")
// })

// server.post('/login',(req,res)=>{
//     console.log(req.body.acno);
//     console.log(req.body.psw);
//     res.send("login successful")
// })

// server.get('/getexc',(req,res)=>{
//     res.send("get worked")
// }) 