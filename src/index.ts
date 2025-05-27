import express from 'express';
import http from 'http'
import { PORT } from './config/serverConfig';
import cors from 'cors'
import {Server} from 'socket.io'
import roomHandler from './handlers/roomHandler';

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

    roomHandler(socket);

    socket.on("disconnect",()=>{
        console.log("user disconnected");
    })
})
server.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})
