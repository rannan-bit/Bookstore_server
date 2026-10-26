// import dns from "node:dns";

// dns.setServers(["8.8.8.8", "8.8.4.4"]);

//import all packages
//loads .env file contents into process.env by default
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./routes/router')
require('./config/db')

//create server using express package
const server=express()
//enable cors in server
server.use(cors())
//parse json to json content
server.use(express.json())
//use routes in server
server.use(router)

server.use('/uploads',express.static('./uploads'))

//set up port number to run server in internet
const PORT=process.env.PORT

//start server to listen client request to that port
server.listen(PORT,()=>{
    console.log("server running and waitng for client request");
    
})

//handle global errors in server using application middleware
server.use((err,req,res,next)=>{
    res.status(500).json(err.message)
})
//resolve api(get request to http://localhost:3000/) usingexpress
server.get('/',(req,res)=>{
    res.status(200).send(`<h1>server running</h1>`)
})

server.post('/',(req,res)=>{
    res.status(200).send("POST REQUEST")
})