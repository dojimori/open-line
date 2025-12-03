import express, { Response, Request } from 'express'
import { getMe } from './user.controller';

const router = express.Router();

router.get('/getme', getMe);


export default router;