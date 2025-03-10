import express from 'express';
import { signup , Login ,Logout, UpdateProfile, checkAuth } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup',signup);

router.post('/login',Login);

router.post('/logout',Logout);

router.post('/updateProfile',protectRoute,UpdateProfile);

router.post('/check',protectRoute,checkAuth);


export default router