import { upload } from '../../config/multer.config';
import express from 'express'
import usersController from './users.controller';

const router = express.Router();

router.get('/', usersController.me);
router.post('/profile', upload.single('profile'), usersController.updateProfile);


export default router;