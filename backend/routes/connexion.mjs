import express from 'express'
import {register, login}from '../controller/authController.mjs'

const router = express.Router();

router.post('/register', register)
router.post('/login', login)

export const connexionRoute = router;
