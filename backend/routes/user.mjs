import express from 'express'
import {getLobbies, CheckIfAdmin, }from '../controller/userController.mjs'

const router = express.Router();

router.get('/lobbies',getLobbies);
router.get('/admin/:lobby_id',CheckIfAdmin);



export const userRoute = router;
