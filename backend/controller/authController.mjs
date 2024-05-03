import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import { promisify } from 'util'
import {pool} from '../db.mjs'
const sign = promisify(JWT.sign)
const verify = promisify(JWT.verify)


export const register = async (req, res) => {
    const { email, nickname, password } = req.body

    if (!email || !password || !nickname)
        return res.status(400).send({ error: 'Invalid request' })

    try {
        const encryptedPassword = await bcrypt.hash(password, 10)

        await pool.query(
        'INSERT INTO users (email, password, nickname) VALUES ($1, $2, $3)',
        [email, encryptedPassword, nickname]
        )

        return res.send({ info: 'User succesfully created' })
    } catch (err) {
        console.log(err)

        return res.status(500).send({ error: 'Internal server error' })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password)
        return res.status(400).send({ error: 'Invalid request' })

    const q = await pool.query(
        'SELECT password, id, nickname from users WHERE email=$1',
        [email]
    )

    if (q.rowCount === 0) {
        return res.status(404).send({ error: 'This user does not exist' })
    }

    const result = q.rows[0]
    const match = await bcrypt.compare(password, result.password)

    if (!match) {
        return res.status(403).send({ error: 'Wrong password' })
    }

    try {
        const token = await sign(
        { id: result.id, nickname: result.nickname, email },
        process.env.JWT_SECRET,
        {
            algorithm: 'HS512',
            expiresIn: '1h',
        })
        return res.send({ token, id: result.id, nickname: result.nickname })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ error: 'Cannot generate token' })
    }
}

export const bouncer = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).send('Unauthorized')
  
    try {     
      const decoded = await verify(
        req.headers.authorization.split(' ')[1],
        process.env.JWT_SECRET
      )
  
      if (decoded !== undefined) {
        req.user = decoded
        return next()
      }
    } catch (err) {
      console.log(err)
    }
  
    return res.status(403).send('Invalid token')
}

export const isAdmin = async (userId,lobbyId) =>{
    try{
        const query = await pool.query(
            `SELECT isAdmin FROM user_lobby 
            WHERE lobby_id = $1 AND user_id = $2`,
            [lobbyId, userId]
        );
        console.log(query.rows[0].isadmin==true)
        return query.rowCount > 0 && query.rows[0].isadmin==true
    }catch(err){
        console.log(err);
    }
}

export const isMember = async (userId,lobbyId) =>{
    console.log("checking if member :",userId,lobbyId)
    const query = await pool.query(
        `SELECT * FROM user_lobby 
        WHERE lobby_id = $1 AND user_id = $2`,
        [lobbyId, userId]
    );
    return query.rowCount > 0
    
        
}

export const isAuthor = async (userId, messageId) => {
    try{
        const query = await pool.query(
            `SELECT * FROM messages WHERE id =$1 AND user_id = $2`,
            [userId, messageId]
        );
        return query.rowCount > 0;
    }catch(err){
        console.log(err);
    }

}

export const canModify = async (userId, messageId) => {
    let lobbyId;
    try{
        const query = await pool.query(
            `SELECT lobby_id FROM messages WHERE id =$1`,
            [messageId]
        );
        lobbyId = query.rows[0].lobby_id;
    }catch(err){
        console.log(err)
    }
    return (await isAuthor(userId,messageId) || await isAdmin(userId,lobbyId))
}