import User from "../Model/user.mjs"

export const getLobbies = async(req, res) => {
    console.log("coucou")

    try{
        console.log("WE ARE IN !!!")
        const lobbyList = await User.lobbies(req.user.id);
        return res.send(lobbyList);
    }catch(err){
        return res.status(500).send(err);
    }
}

export const getUsername = (req, res) => {

}

