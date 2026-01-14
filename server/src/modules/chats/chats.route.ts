import { Router } from 'express'
// import { getAllChats } from './chats.controller';
import chatsController from './chats.controller';
const router = Router();

router.get('/', chatsController.getAll)

export default router;