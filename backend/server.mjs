import express from 'express'
import { connexionRoute } from './routes/connexion.mjs'
import {bouncer} from './controller/authController.mjs'
import { LobbyRoute } from './routes/lobby.mjs'
import { messagesRoute } from './routes/messages.mjs'


//this should be delete after test
import { pool } from './db.mjs'

const server = express()

server.use(express.json())

server.get('/hello', async (req, res) => {
    res.send("hello from online")
  })
  
  
server.get('/test', async (req, res) => {
    const q = await pool.query(
        'SELECT * from users'
      )
    res.send(q.rows)
  })

server.use('/api',connexionRoute)

server.use(bouncer)

server.use('/api/lobby', LobbyRoute)
server.use('/api/messages', messagesRoute)
// server.use('/api/user', userRoute)

server.listen(3000, () => console.log('http://localhost:3000'))