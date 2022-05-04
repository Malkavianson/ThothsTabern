import { connection } from '../database/connection.js';
import { user } from '../models/Users.js';
import { usersWords } from '../models/Words.js';
import w from '../database/words.js';

const words = w.words;
let current = {};

async function us() {
	let u = await connection.query('select * from users', {	model: user })
	u = u.map((users) => users.dataValues)
	return u;
};
async function ws() {
	let w = await connection.query('select * from words', {	model: usersWords })
	w = w.map((words) => words.dataValues)
	return w;
};
function d(users){
	let ul = []
	users.forEach( users => {
		let u = {
			id: users.id, 
			img: users.img, 
			user: users.username,
		};
		ul.push(u);
	});
	return ul;
};
function c(u){
	let user = {
		id: u.id,
		user: u.username,
		name: u.name,
		img: u.img,
	};
	return user;
};
function s(u){
	
	let score = [];
	
	u.map((user) => {
		if(user.pts>0){
			score.push([user.username,user.name,user.pts]);
		}
	});
	score = score.sort((a, b) => {
		if (a[2] > b[2]) {
			return -1;
		} else if (a[2] < b[2]) {
			return 1;
		};
		return 0;
	});
	score = [score[0],score[1],score[2],score[3],score[4]]
	
	return score;
};
function Register(r){
	Object.defineProperties(this, {
		username: {
			enumerable: true,
			value: r.user,
			writable: true,
			configurable: true,
		},
		pw: {
			enumerable: true,
			value: r.pw,
			writable: true,
			configurable: true,
		},
		name: {
			enumerable: true,
			value: r.name,
			writable: true,
			configurable: true,
		},
		img: {
			enumerable: true,
			value: 'img/profile_pictures/default.png',
			writable: true,
			configurable: true,
		},
		pts: {
			enumerable: true,
			value: 0,
			writable: true,
			configurable: true,
		}
	});	
}

async function l(){
	let list = [];
	const ul = await ws();
	const l = Object.values(words[0]).map(function (user) {
		for(let i=0;i<user.length;i++){
			list.push(user[i]);
		};
	});
	const u = Object.values(ul).map(function (user){
		const userList = user.words.split(",");
		for (let word of userList) {
			list.push(word.trim())
		}
	});
	return list.sort();
};

export const getIndex = async (req,res) => {
	const users = await us();
	const data = d(users);
	res.render('index', { data });
};
export const getGame = async (req,res) => {
	const users = await us();
	let currentUser = c(current);
	if (currentUser.id===undefined){
		currentUser={user: 'convidado', img: 'img/profile_pictures/default.png' };
	};
	const list = await l();
	const score = s(users);
	res.render('game', {list, currentUser, score});
};

export const postRegister = async (req,res) => {
	const r = req.body;

	if (!r){
		res.redirect('/');
	};
	const newUser = new Register(r);
	user.create(newUser);
	const users = await us();
	current = users.find(users => users.username === newUser.username);
	res.redirect('/game');
};
export const postLogin = async (req,res) =>{
	const u = req.body;
	const users = await us();
	const user = { user: u.user.trim(), pw: u.pw, remember: u.remember };
	const verifyLogin = users.find(users => users.username === user.user);
	if(verifyLogin!=undefined){
		if(verifyLogin.pw === user.pw){
			current = verifyLogin;
			res.redirect('/game');
		}else{
			console.log('senha incorreta')
		}
	}else{ 
		console.log('Email não existe')
	};
};