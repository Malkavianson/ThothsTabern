import express from 'express';
import { routers } from './src/routers/routers.js';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve(path.dirname(''));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routers);

app.set('view engine', 'ejs');

app.listen(PORT, () => {console.clear(); console.log(`Running server in http://localhost:${PORT}`);});