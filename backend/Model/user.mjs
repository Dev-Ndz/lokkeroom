import {pool} from '../db.mjs'

const User = {}

User.lobbies = async (userId) => {
    let query = await pool.query(
        `SELECT lobbies.id, lobbies.name, lobbies.isprivate FROM lobbies 
        JOIN user_lobby ON user_lobby.lobby_id = lobbies.id
        WHERE user_lobby.user_id = $1`,
        [userId]
    )
    return query.rows;
}


export default User