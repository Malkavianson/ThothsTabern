import { connection } from '../database/connection.js';
import { user } from '../models/Users.js';
import pimg from '../database/imgs.js';
import w from '../database/words.js';

const words = w.words;
let erro = 'erro';
let novo = false;

function c(u){
	const user = {
		id: u.id,
		user: u.username,
		name: u.name,
		img: u.img,
	};
	return user;
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

function s(u){
	
	let score = [];
	
	u.map((us) => {
		if(us.pts>0){
			score.push([us.user,us.name,us.pts]);
		};
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


async function l(){
	let list = [];
	const user = await us();
	const l = Object.values(words[0]).map(function (user) {
		for(let i=0;i<user.length;i++){
			list.push(user[i]);
		};
	});
	const u = Object.values(user).map(function (user){
		if(user.words!=null){
			const userList = user.words.split(",");
			for (let word of userList) {
				list.push(word.trim());
			};
		};
	});
	list = list.filter(i => {
		return i;
	});
	return list.sort();
};


async function us() {
	const u = await connection.query('select * from users', {	model: user })
	const n = u.map((users) => users.dataValues)
	return n;
};

export const getIDM = async (req, res) => {
	const data = [{id:'',user:'',name:'',pw:'',pts:'',words:['']}]
	res.render('idm', { data });
};

export const postIDM = async (req, res) => {
	const verify = req.body;
	let login = 'Malkavianson_idmalarpsipes';
	let pass = 'Passw0rd@2'; 
	let data = await us();
	data = data.sort((a,b) => {
	  if (a.id > b.id) {
		return 1;
	  };
	  if (a.id < b.id) {
		return -1;
	  };
	  return 0;
	});
	if(login===verify.login&&pass===verify.pw){
		res.render('idm', { data });
	}else{
		res.send('Not allowed');
	};
};

export const postDelIDM = async (req, res) => {
	const destroy = req.body;	
	try{
		await user.destroy({where: {id: destroy.id} });
		let data = await us();
		data = data.sort((a,b) => {
		  if (a.id > b.id) {
			return 1;
		  };
		  if (a.id < b.id) {
			return -1;
		  };
		  return 0;
		});
		res.render('idm', { data });
	}catch(err){
		console.log(err.message)
		res.redirect('/adm');
	};
}

export const getIndex = async (req,res) => {
	let data = await us();
	data = d(data).sort((a,b) => {
		if (a.pts < b.pts) {
			return 1;
		};
		if (a.pts > b.pts) {
			return -1;
		};
		return 0;
	});
	res.render('index', { erro, data });
};

export const getGame = async (req,res) => {
	const list = await l();
	let data = await us();
	data = d(data).sort((a,b) => {
		if (a.pts < b.pts) {
			return 1;
		};
		if (a.pts > b.pts) {
			return -1;
		};
		return 0;
	});
	const score = s(data);
	const everybody = JSON.stringify(data);
	res.render('game', {list, score, data, everybody});
};

export const getProfile = async (req,res) => {
	res.render('profile', { pimg });
};

export const getKoutia = async (req,res) =>{
	
	const list = await l();

	const i = Math.floor(Math.random() * list.length);

	const clue = 'desvende a Palavra'
	const word = list[i];
	res.render('koutia', { word, clue });
}


export const postNewword = async (req, res) => {
	let w = req.body;
	const list = await l();
	if(list.includes(w.word.toLowerCase().trim())){
		res.redirect('/game');
	}else{
		try{
			if( !w.user || !w.word ){
				res.redirect('/game')
			}else{
				let users = await us();
				const data = d(users);
				const userWord = data.find(user => user.user === w.user);
				const wClean = w.word.normalize('NFD').replace(/([\u0300-\u036f]|[^a-zA-Z\s-])/g, '').toLowerCase().trim();
				userWord.words += wClean+','
				userWord.pts++;
				const userw = users.find(user => user.username === userWord.user);
				const userUpdating = await user.update(userWord, {where: { id: userw.id }});
				users = await us();
				const userCookie = users.find(user => user.username === w.user);
				const cookie = JSON.stringify(userCookie);
				res.render('enter', { cookie, novo });
			};
		}catch(err){console.log(err); res.redirect('/')};
	}
};

export const postUpdateProfile = async (req,res) => {
	const { username, name, img, pw } = req.body;
	const u = {
		user: username,
		name: name,
		img: img,
		pw: pw
	};
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
			res.render('enter', { cookie, novo });
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
			erro = 'erro';
	};
	try{
		if( !r.user || !r.pw || !r.name ){
			erro = 'reg';
			res.render('index', { erro, data });
			erro = 'erro';
		}else{
			try{
				const newUser = new Register(r);
				await user.create(newUser);
				users = await us();
				const newCurrent = users.find(users => users.username === newUser.username);
				const cookie = JSON.stringify(newCurrent);
				novo = true;
				res.render('enter', { cookie, novo });
				novo = false;
			}catch(err){
				console.log(err)
					erro = 'ainda';
					res.render('index', { erro, data });
					erro = 'erro';
			};
		};
	}catch(err){ console.log(err); res.redirect('/')};
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
			res.render('enter', { cookie, novo });
		}else{
			erro = 'senha incorreta';
			console.log(erro)
			const users = await us();
			res.render('index', { erro, data });
			erro = 'erro';
		};
	}else{
		erro = 'login não existe'
		console.log(erro);
		const users = await us();
		res.render('index', { erro, data });
		erro = 'erro';
	};
};

export const postDelete = async (req,res) => {
	const d = req.body;
	try{
		await user.destroy({where: {id: req.body.id} });
		res.redirect('/');
	}catch(err){
		console.log(err.message)
		res.redirect('/');
	};
};

export const postDelword = async (req,res) => {
	let users = await us();
	const data = d(users);
	const dw = req.body;
	const userDeleting = users.find(users => users.username === dw.username);
	let uda = userDeleting.words.split(',');
	const udi = uda.indexOf(dw.slain);
	uda.splice(udi,1);
	uda = uda.filter(i => {	return i });
	if(uda.length===0){uda='';}else{uda = uda.toString();}
	userDeleting.words = uda
	let userDeleted = {...userDeleting};
	delete userDeleted.id
	try{
		const wordUpdating = await user.update(userDeleted, {where: { id: userDeleting.id }});
		users = await us();
		const userCookie = users.find(user => user.username === userDeleting.username);
		const cookie = JSON.stringify(userCookie);
		res.render('enter', { cookie, novo });
	}catch(err){console.log(err.message);res.redirect('/game')};
};

export const postAddpts = async (req,res) =>{
	let users = await us();
	let winner = req.body;
	const userWinner = users.find(user => user.username === winner.username);
	const i = userWinner.id;
	userWinner.pts += 7;
	delete userWinner.id;
	try{
		const userUpdating = await user.update(userWinner, {where: { id: i }});
	}catch(err){console.log(err.message)}
};