import app from './app';
import * as http from 'http';
import { Socket } from 'socket.io';
const PORT = process.env.PORT||3000;
const server = http.createServer(app);
const socket = require("socket.io")

server.listen(PORT,()=>{
    const timeZone = +5, 
    serverRunTime =new Date( new Date().getTime() + timeZone * 3600 * 1000).toUTCString().replace( / GMT$/, "" );

    console.log("Happy Server is running on port: "+PORT + " ---> "+ serverRunTime);
})

const io = socket ( server, {
    cors: {
        origin: process.env.CLIENT_SIDE_BASE_URL,
        credentials: true
    }
})

// Store online users
let onlineUsers = (globalThis as any).onlineUsers = new Map();

io.on("connection",(socket: Socket)=>{
    //console.log("User connected", socket.id)

    socket.on("user-loggedin", (userId)=>{
        onlineUsers.set(userId, socket.id);
        //console.log("User logged in", userId)
    })

    socket.on('send-message', (data)=>{
        //console.log("Message received", data)
        if(onlineUsers.get(data.receiverId)){
            io.to(onlineUsers.get(data.receiverId)).emit('receive-message', data.message, data.timestamp);
        }
    })
})