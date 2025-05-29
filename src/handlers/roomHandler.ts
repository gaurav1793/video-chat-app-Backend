import { Socket } from "socket.io";
import {v4 as UUIDv4} from 'uuid'

const rooms : Record<string , string[]>={};

const roomHandler=(socket:Socket)=>{

    const createRoom = ()=>{
        const roomId = UUIDv4();
        socket.join(roomId);
        console.log("new room is created",roomId);
        socket.emit("room-created",{roomId});
        rooms[roomId]=[];
    }

    const joinedRoom = ({roomId , peerId}:{roomId:string ,peerId:string})=>{
       if(rooms[roomId]){
        console.log("hello",peerId);
         console.log("New user joined a room",roomId ,"with peerId",peerId);
         rooms[roomId].push(peerId);
         socket.join(roomId);

        socket.emit("get-users",{
            roomId,
            participants:rooms[roomId]
        })

        socket.on("ready",()=>{
            console.log("emired ready");
            socket.to(roomId).emit("user-joined",{peerId});
        })
       }
    }

    socket.on("user-leave",({peerId ,roomId})=>{
        console.log("call end",peerId)
        socket.to(roomId).emit("call-end",{
            peerId
        })
        console.log("disconneting guys");
        socket.emit("clear-my-peers")
    })

    socket.on("create-room",createRoom);
    socket.on("joined-room",joinedRoom);


}


export default roomHandler