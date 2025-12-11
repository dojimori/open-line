import { Router } from 'express'
import { getAllChats } from './chat.controller';
const router = Router();

router.get('/', getAllChats)

export default router;