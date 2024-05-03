import {pool} from '../db.mjs'
import { canModify, isMember } from './authController.mjs';
import Lobby from '../Model/lobby.mjs'

export const editMessage = async (req, res) => {
    const{content} = req.body;
    const messageId = req.params.message_id;
    const timestamp = new Date();
    if (!await canModify(req.user.id,messageId)) return res.status(401).send('Unauthorized : member can only delete their own message');
    try{
        pool.query(
            `UPDATE messages
            SET content = $1, timestamp = $2
            WHERE id = $3;`,[content, timestamp, messageId,]
        );
        return res.send("edited");
    }catch(err){
        console.log(err);
        return res.status(500).send({ error: 'Internal server error' });
    }
}
export const deleteMessage = async (req, res) => {
    const messageId = req.params.message_id;
    if (!await canModify(req.user.id,messageId)) return res.status(401).send('Unauthorized : member can only delete their own message');
    try{
        await pool.query(
            `DELETE FROM messages WHERE id = $1`,[messageId]
        );
        return res.send("message deleted");
    }catch(err){
        console.log(err);
        return res.status(500).send({ error: 'Internal server error' });
    }
}
export const getMessage = async (req, res) => {
    const messageId = req.params.message_id;
    if (!await canModify(req.user.id,messageId)) return res.status(401).send('Unauthorized : this user is not a member of this lobby');
    try{
        const query = await pool.query(
            `SELECT users.nickname, users.id, messages.content, messages.timestamp 
            FROM messages 
            JOIN users ON messages.user_id = users.id
            WHERE messages.id = $1`,
            [messageId]
        );
        const message = query.rows[0];
        return res.send(message);

    }catch(err){
        console.log(err)
        return res.status(500).send({ error: 'Internal server error' })
    }
}
export const sendPrivateMessage = async (req, res) => {
    const {content} = req.body;
    const senderId =req.user.id;
    const recieverId = req.params.user_id
    let lobbyId;
    let privateLobby;
    try{
        privateLobby = await Lobby.getPrivateLobby(senderId,recieverId)
        console.log(privateLobby);
    }catch(err){
        console.log(err)
        return res.status(500).send({ error: 'Internal server error' })
    }

    console.log(privateLobby.rows.length)
    if (privateLobby.rows.length === 0){
        try{
            privateLobby = await Lobby.create("personal message",true)
            console.log('private lobby created');
        }catch(err){
            console.log(err)
            return res.status(500).send({ error: 'Internal server error : couldnt create new private lobby' })
        } 
        try{
            Lobby.addUser(senderId,privateLobby.rows[0].id,false);
        }catch(err){
            console.log(err)
            return res.status(500).send({ error: 'Internal server error : couldnt add user sender '+senderId })
        }
        try{
            Lobby.addUser(recieverId,privateLobby.rows[0].id,false);
        }catch(err){
            console.log(err)
            return res.status(500).send({ error: 'Internal server error : couldnt add user reciever '+recieverId })
        }
    }
    try{
        await Lobby.postMessage(senderId,content, privateLobby.rows[0].id)
        return res.send({privateLobby})
    }catch(err){
        console.log(err)
        return res.status(500).send({ error: 'Internal server error : last catch'})
    }
}