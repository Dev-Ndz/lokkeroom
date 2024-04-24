import express from 'express'
import {getMessages, postMessage, createLobby, addUser, removeUser}from '../controller/lobbyController.mjs'

const router = express.Router();


router.get('/:lobby_id',getMessages);

router.post('/:lobby_id/add-user', addUser);
router.post('/:lobby_id/remove-user', removeUser);
router.post('/:lobby_id',postMessage);
router.post('/',createLobby);

export const LobbyRoute = router;
