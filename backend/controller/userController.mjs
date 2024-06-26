import User from "../Model/user.mjs"
import { isAdmin} from "./authController.mjs";

export const getLobbies = async(req, res) => {
    try{
        const lobbyList = await User.lobbies(req.user.id);
        return res.send(lobbyList);
    }catch(err){
        return res.status(500).send(err);
    }
}


export const CheckIfAdmin = async(req, res) => {
    try{
        const bool = await isAdmin(req.user.id, req.params.lobby_id)
        return res.send(bool);
    }catch(err){
        return res.status(500).send(err);
    }
}
