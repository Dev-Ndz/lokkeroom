import {pool} from '../db.mjs'

const Lobby = {};

// CREATE LOBBY
Lobby.create = async (name, isPrivate) => {
    let query = await pool.query(
        `INSERT INTO lobbies (name,isPrivate) VALUES ($1, $2) RETURNING *`,[name,isPrivate]
    )
    return query
}
Lobby.getPrivateLobby = async (senderId,recieverId) => {
    const query = await pool.query(
    `SELECT lobbies.id
    FROM user_lobby 
    JOIN lobbies
    ON lobbies.id = user_lobby.lobby_id
    WHERE user_lobby.user_id = $1
    AND lobbies.isPrivate = 'TRUE'
    AND user_lobby.lobby_id IN (
        SELECT user_lobby.lobby_id FROM user_lobby
        WHERE user_lobby.user_id = $2)`,
        [senderId,recieverId]
    );
    return query

}


Lobby.createPrivate = async (senderId,recieverId) => {

}

Lobby.addUser = async (userId, lobbyId, isAdmin) => {
    let query = await pool.query(
        'INSERT INTO user_lobby (user_id,lobby_id,isadmin) VALUES($1,$2,$3)',
        [userId, lobbyId, isAdmin]
        )
    return query;
}

Lobby.removeUser = async (lobbyId, removedUserId) => {
    let query = await pool.query(
        `DELETE FROM user_lobby WHERE lobby_id =$1 AND user_id = $2`,
        [lobbyId,removedUserId]
    )
    return query;
}

Lobby.getAllMessages = async (lobbyId) => {
    const query = await pool.query(
        `SELECT users.nickname, messages.content, messages.timestamp, messages.id 
        FROM messages
        JOIN users ON messages.user_id = users.id
        WHERE messages.lobby_id = $1`,
        [lobbyId]
        );
    return query.rows;
}



Lobby.postMessage = async (userId,content,lobbyId) => {
    let timestamp = new Date();
    await pool.query('INSERT INTO messages (user_id, content, timestamp, lobby_id) VALUES ($1,$2,$3,$4)',
    [userId,content,timestamp,lobbyId]);
}

Lobby.getPaginatedMessages = async (lobbyId,offset, limit) => {
    const query = await pool.query(
        `SELECT users.nickname, messages.content, messages.timestamp 
        FROM messages
        JOIN users ON messages.user_id = users.id
        WHERE messages.lobby_id = $1
        ORDER BY messages.timestamp DESC
        LIMIT $2 OFFSET $3;`,
        [lobbyId, limit, offset]
        );
    return query.rows;
}

Lobby.getUserList = async(lobbyId) => {
    const query = await pool.query(
        `SELECT users.nickname, users.id
        FROM users
        JOIN user_lobby ON users.id = user_lobby.user_id
        WHERE user_lobby.lobby_id = $1`,
        [lobbyId]
    );
    return query.rows
}

export default Lobby