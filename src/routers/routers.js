import express from 'express';
import { getIndex, getGame, postRegister, postLogin } from '../controller/Controllador.js';
export const routers = express.Router();

routers.get('/', getIndex);
routers.get('/game', getGame);
routers.post('/register', postRegister);
routers.post('/login', postLogin);