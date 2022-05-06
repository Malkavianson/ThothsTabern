import express from 'express';
import { getIndex, getGame, getProfile, postUpdateProfile, postRegister, postLogin, postDelete } from '../controller/Controllador.js';
export const routers = express.Router();

routers.get('/', getIndex);
routers.get('/game', getGame);
routers.get('/profile', getProfile);

routers.post('/updateprofile', postUpdateProfile)
routers.post('/register', postRegister);
routers.post('/login', postLogin);
routers.post('/delete', postDelete)