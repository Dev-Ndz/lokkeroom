import express from 'express'
import {editMessage, deleteMessage, getMessage, sendPrivateMessage} from '../controller/messagesController.mjs'

const router = express.Router();

router.get('/:message_id',getMessage);
router.patch('/:message_id', editMessage);
router.delete('/:message_id', deleteMessage);

router.post('/:user_id', sendPrivateMessage);

export const messagesRoute = router;