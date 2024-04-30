import express from 'express'
import http from 'http'
import { connexionRoute } from './routes/connexion.mjs'
import {bouncer} from './controller/authController.mjs'
import { LobbyRoute } from './routes/lobby.mjs'
import { messagesRoute } from './routes/messages.mjs'
import { userRoute } from './routes/user.mjs'
import cors from 'cors'
import {pool} from "./db.mjs"
import {Server} from 'socket.io'

const app = express()
app.use(cors());
app.use(express.json())

const server = http.createServer(app)
const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"]
  }
})



app.get('/hello', async (req, res) => {
    res.send("hello from online")
  })

app.get('/test', async (req, res) => {
    const q = await pool.query(
        'SELECT * from users'
      )
    res.send(q.rows)
  })


app.use('/api',connexionRoute)

app.use(bouncer)

app.use('/api/lobby', LobbyRoute)
app.use('/api/messages', messagesRoute)
app.use('/api/user', userRoute)

io.on('connection', (socket) => {
  console.log(`user connected: ${socket.id}`);


socket.on('send_message', (data) => {
    console.log("message recieved", data.message);
    socket.broadcast.emit("receive_message", data)

  });

  socket.on('create_lobby', (data) => {
  console.log("lobby created", data.name);
  socket.broadcast.emit("new_lobby_created", data)
  });
});

server.listen(process.env.PORT || 5000, () => console.log('ready to serve...'))
