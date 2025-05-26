import express from 'express';
import http from 'http'
import { PORT } from './config/serverConfig';
import cors from 'cors'
import {Server} from 'socket.io'

const app =express();
const server = http.createServer(app);


app.use(cors());

const io = new Server(server , {
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});

io.on("connection",(socket)=>{
    console.log("new user is connected");


    socket.on("disconnet",()=>{
        console.log("user disconnected");
    })
})
server.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})
