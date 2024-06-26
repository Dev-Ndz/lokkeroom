import {isAdmin, isMember } from './authController.mjs';
import Lobby from '../Model/lobby.mjs'

const isNumber = (value) => typeof value === 'number' && !Number.isNaN(value)

export const getMessages = async (req, res) => {

    const lobbyId = req.params.lobby_id;
    if (!await isMember(req.user.id, lobbyId)) return res.status(401).send('Unauthorized : this user is not a member of this lobby');
    if(isNumber(parseInt(req.query.offset)) && isNumber(parseInt(req.query.limit))){
        try{
            const messages = await Lobby.getPaginatedMessages(lobbyId,req.query.offset, req.query.limit);
            return res.send(messages);
        }catch(err){
            return res.status(500).send({ error: 'Internal server error : could not get messages', message:err })
        }
    }else{
        try{

            const messages = await Lobby.getAllMessages(lobbyId);
            return res.send(messages);
        }catch(err){
            return res.status(500).send({ error: 'Internal server error : could not get all messages', message:err })
        }
    }
}

export const getLobbies = async (req, res) => {
    const userId = req.user.id
    const lobbiesList = await Lobby.getLobbies()
}


export const addUser = async (req, res) => {
    const lobbyId = req.params.lobby_id;
    const{addedUserId} =req.body;
    if (!await isAdmin(req.user.id, lobbyId)) return res.status(401).send('Unauthorized : this user is not an admin of this lobby');
    if (await isMember(addedUserId,lobbyId)) return res.status(400).send('User already added');
    try{
        console.log("lobby: ",lobbyId," addedUser: ",addedUserId);
        Lobby.addUser(addedUserId,lobbyId,false)
        return res.send("user added to lobby")
    }catch(err){
        console.log(err)
        return res.status(500).send({ error: 'Internal server error' })
    }
}
export const removeUser = async (req, res) => {
    const lobbyId = req.params.lobby_id;
    const{removedUserId} =req.body;
    if (!await isAdmin(req.user.id, lobbyId)) return res.status(401).send('Unauthorized : Only an admin can remove the user of this lobby');
    if (!await isMember(removedUserId,lobbyId)) return res.status(400).send('User is not a member of this lobby');
    try{
        Lobby.removeUser(lobbyId,removedUserId)
        return res.send("user removed from lobby")
    }catch(err){
        console.log(err)
        return res.status(500).send({ error: 'Internal server error' })
    }
}
export const postMessage = async (req, res) => {
    const {content} = req.body;
    const timestamp = new Date();
    const lobbyId = req.params.lobby_id;
    const userId = req.user.id;
    if(!await isMember(userId, lobbyId)) return res.status(401).send('Unauthorized : user is not a member of that lobby')
    try{
        Lobby.postMessage(userId,content,lobbyId);
        res.send("messsage send :"+content +"\n"+ timestamp +"\n"+lobbyId);
    }catch(err){
        console.log(err)
        return res.status(500).send({error : err});
    } 
}
export const createLobby = async (req,res) => {
    const {name} = req.body
    let newLobby 
    try{
        newLobby = await Lobby.create(name,false);
        console.log("lobby created : " + name)
        console.log(newLobby);
    }catch(err){
        return res.status(500).send({ error: 'Internal server error : could not create lobby', "err":err })
    }
    try{
        Lobby.addUser(req.user.id, newLobby.rows[0].id, true);
        console.log("Admin right granted to : "+req.user.nickname);
        res.send("Admin right granted to : "+req.user.nickname)

    }catch(err){
        console.log(err)
        return res.status(500).send({ error: 'Internal server error : could not grant admin right' , "err":err})
    }
}

export const getUserList = async(req, res) => {
    try{
        const lobbyId =req.params.lobby_id;
        const userId = req.user.id;
        console.log(userId, lobbyId)
        if(!await isMember(userId, lobbyId)) return res.status(401).send({message:'Unauthorized : you are not a member of this lobby'})
        const userList = await Lobby.getUserList(lobbyId);
        res.send(userList)
    }catch(err){
        return res.status(500).send( {error: "could not retrieve user list"})
    }
}