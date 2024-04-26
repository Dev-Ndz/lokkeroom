import express from 'express'
import {getLobbies, getUsername}from '../controller/userController.mjs'

const router = express.Router();

// router.get('/lobbies',getLobbies);
router.get('/lobbies',async (req, res) => { res.send("hello from user/lobbies")});
router.get('/username',getUsername);


export const userRoute = router;
