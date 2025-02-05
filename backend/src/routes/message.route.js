import express from 'express';
import { FetchUSerSidebar, getMessages, sendMesage } from '../controllers/message.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/FetchUSerSidebar',protectRoute,FetchUSerSidebar)
router.get('/:id',protectRoute,getMessages)
router.post('/send/:id',protectRoute,sendMesage)

export default router;