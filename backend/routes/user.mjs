import express from 'express'
import {getLobbies, }from '../controller/userController.mjs'

const router = express.Router();

router.get('/lobbies',getLobbies);
//router.get('/lobbies',async (req, res) => { res.send("hello from user/lobbies")});



export const userRoute = router;
