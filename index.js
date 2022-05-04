import express from 'express';
import { routers } from './src/routers/routers.js';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve(path.dirname(''));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(routers);

app.listen(PORT, () => {console.clear(); console.log(`Running server in http://localhost:${PORT}`);});