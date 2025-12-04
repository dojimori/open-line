import express, { Response, Request } from 'express'
import { getMe, updateProfile } from './user.controller';
import multer from 'multer'

const router = express.Router();

// multer is needed to parse form data body from the client
const upload = multer({ dest: 'uploads/'})

router.get('/getme', getMe);
router.post('/profile/update', upload.single('file'), updateProfile);


export default router;