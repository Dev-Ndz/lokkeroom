import User from "../Model/user.mjs"
import { isMember} from "./authController.mjs";

export const getLobbies = async(req, res) => {
    try{
        const lobbyList = await User.lobbies(req.user.id);
        return res.send(lobbyList);
    }catch(err){
        return res.status(500).send(err);
    }
}



