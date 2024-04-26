import User from "../Model/user.mjs"


export const getLobbies = async(req, res) => {
    try{
        const lobbyList = await User.lobbies(req.user.id);
        return lobbyList;
    }catch(err){
        return res.status(500).send(err);
    }
}

export const getUsername = (req, res) => {

}

