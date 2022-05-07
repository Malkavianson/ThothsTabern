import { connection } from '../database/connection.js';
import { user } from '../models/Users.js';
import w from '../database/words.js';

const words = w.words;
let erro = 'erro';

async function l(){
	let list = [];
	const user = await us();
	const l = Object.values(words[0]).map(function (user) {
		for(let i=0;i<user.length;i++){
			list.push(user[i]);
		};
	});
	const u = Object.values(user).map(function (user){
		const userList = user.words.split(",");
		for (let word of userList) {
			list.push(word.trim())
		}
	});
	return list.sort();
};
async function us() {
	const u = await connection.query('select * from users', {	model: user })
	const n = u.map((users) => users.dataValues)
	return n;
};

function d(users){
	const ul = []
	users.forEach( users => {
		const u = {
			img: users.img, 
			name: users.name,
			user: users.username,
			pts: users.pts,
			words: users.words
		};
		ul.push(u);
	});
	return ul;
};
function c(u){
	const user = {
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
			value: r.user.toLowerCase(),
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
		},
		words: {
			enumerable: true,
			value: '',
			writable: true,
			configurable: true,
		}
	});	
}
function Update(u,user){
	Object.defineProperties(this, {
		username: {
			enumerable: true,
			value: user.username,
			writable: true,
			configurable: true,
		},
		pw: {
			enumerable: true,
			value: u.pw,
			writable: true,
			configurable: true,
		},
		name: {
			enumerable: true,
			value: u.name,
			writable: true,
			configurable: true,
		},
		img: {
			enumerable: true,
			value: u.img,
			writable: true,
			configurable: true,
		},
		pts: {
			enumerable: true,
			value: user.pts,
			writable: true,
			configurable: true,
		},
		words: {
			enumerable: true,
			value: user.words,
			writable: true,
			configurable: true,
		}
	});	
};

export const getIndex = async (req,res) => {
	const users = await us();
	const data = d(users);
	res.render('index', { erro, data });
};
export const getGame = async (req,res) => {
	const users = await us();
	const list = await l();
	const data = d(users);
	const score = s(users);
	const everybody = JSON.stringify(data);
	res.render('game', {list, score, data, everybody});
};
export const getProfile = async (req,res) => {
	res.render('profile');
};

export const postNewword = async (req, res) => {
	const w = req.body;
	try{
		if( !w.user || !w.word ){
			console.log('erro')
			res.redirect('/game')
		}else{
			let users = await us();
			const data = d(users);
			const userWord = data.find(user => user.user === w.user);
			userWord.words += ','+w.word
			userWord.pts++;
			const userw = users.find(user => user.username === userWord.user);
			const userUpdating = await user.update(userWord, {where: { id: userw.id }});
			users = await us();
			const userCookie = users.find(user => user.username === w.user);
			const cookie = JSON.stringify(userCookie);
			res.render('enter', { cookie });
		};
	}catch(err){console.log(err); res.redirect('/')};

};
export const postUpdateProfile = async (req,res) => {
	const u = req.body;
	try{
		if( !u.user || !u.name || !u.img || !u.pw ){
			res.redirect('/')
		}else{
			let users = await us();
			const data = d(users);
			const userUpdated = users.find(user => user.username === u.user);
			const updated = new Update(u,userUpdated);
			const userUpdating = await user.update(updated, {where: { id: userUpdated.id }});
			users = await us();
			const userCookie = users.find(user => user.username === u.user);
			const cookie = JSON.stringify(userCookie);
			res.render('enter', { cookie });
		};
	}catch(err){console.log(err); res.redirect('/')};
};
export const postRegister = async (req,res) => {
	let users = await us();
	const data = d(users);
	const r = req.body;
	if (!r){
			erro = 'reg';
			res.render('index', { erro, data });
	};
	try{
		if( !r.user || !r.pw || !r.name ){
			erro = 'reg';
			res.render('index', { erro, data });
		}else{
			try{
				const newUser = new Register(r);
				await user.create(newUser);
				users = await us();
				const newCurrent = users.find(users => users.username === newUser.username);
				console.log()
				const cookie = JSON.stringify(newCurrent);
				res.render('enter', { cookie });
			}catch(err){
				console.log('não criou')
				console.log(err)
					erro = 'ainda';
					res.render('index', { erro, data });
			};
		};
	}catch(err){ console.log(err)};
};
export const postLogin = async (req,res) =>{
	const users = await us();
	const data = d(users);
	const u = req.body;
	const user = { user: u.user.trim().toLowerCase(), pw: u.pw, remember: u.remember };
	const verifyLogin = users.find(users => users.username === user.user);
	if(verifyLogin!=undefined){
		if(verifyLogin.pw === user.pw){
			const cookie = JSON.stringify(verifyLogin);
			res.render('enter', { cookie });
		}else{
			erro = 'senha incorreta';
			console.log(erro)
			const users = await us();
			res.render('index', { erro, data });
		};
	}else{
		erro = 'login não existe'
		console.log(erro);
		const users = await us();
		res.render('index', { erro, data });
	};
};
export const postDelete = async (req,res) =>{
	const d = req.body;
	try{
		await user.destroy({where: {id: req.body.id} });
		res.redirect('/');
	}catch(err){
		console.log(err.message)
		res.redirect('/');
	};
};