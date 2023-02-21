var express = require('express')
const cors = require('cors')
http = require('http')
const {Server } =require('socket.io')

const app = express()
app.use(cors())

const server = http.createServer(app)
const BOT = 'BOT'
let chatRoom = ''
let allUsers = []

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
})


io.on('connection',  (socket)=>{
    //console.log(socket.id)
    socket.on('join_room',  (data) => {
        const {username, room} = data
        console.log('room_join : ',data)
        socket.join(room)
        
        let _createdtime_ = Date.now()
        chatRoom = room
        allUsers.push({id: socket.id, username, room});
        chatRoomUsers = allUsers.filter(users => {username.room === room})
        socket.to(room).emit('chatroom_users',chatRoomUsers)
        socket.emit('chatroom_users', chatRoomUsers)

        socket.to(room).emit('recieve_message', {
            message : `${username} has joined the room`,
            username: BOT,
            _createdtime_
        })

        socket.emit('recieve_message',{
            message: `Welcome ${username}`,
            username:BOT,
            _createdtime_
        })
        
    })
})

const PORT = 4000
server.listen(PORT, ()=>{
    console.log('server running at port', `${PORT}`)
})