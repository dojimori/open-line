import { upload } from '../../config/multer.config';
import express, { Response, Request } from 'express'
import { getMe, updateProfile } from './user.controller';

const router = express.Router();

router.get('/getme', getMe);
router.post('/profile/update', upload.single('profile'), updateProfile);


export default router;