let user = JSON.parse(localStorage.getItem('user'));

let matches = [];
let wrongs = [];
let tents = 6;

if(document.querySelector('#submit')){
	const s = document.querySelector('#submit');
	s.addEventListener('click', e => {
		e.preventDefault();
		let l = document.querySelector('#l').value[0];
		document.querySelector('#l').value = '';
		try{l = l.normalize('NFD').replace(/([\u0300-\u036f]|[^a-zA-Z])/g, '').toLowerCase();}catch(e){}
		seek(l);
		verific();
	});
	document.addEventListener("keyup", e =>{
		if(e.key === 'Enter') {
				s.click;
		}else if (e.key != 'Enter' && e.key != 'Backspace'&&e.key != 'Delete'&&e.key != 'ArrowUp'&&e.key != 'ArrowRight'&&e.key != 'ArrowDown'&&e.key != 'ArrowLeft'){
			let l = e.key[0].normalize('NFD').replace(/([\u0300-\u036f]|[^a-zA-Z])/g, '');
			document.querySelector('#l').value = l;
		};
	});
};

async function addpts(){
	const w = {
		username: user.username,
	};
	const win = {
		method: 'POST',
		body: JSON.stringify(w),
		headers: {
        "Content-type": "application/json; charset=UTF-8"
		},
	};
	fetch('/addpts', win ).then();
};

function change(a){
	switch(a){
		case 'l':
			document.getElementById('wbBox').style.display = 'none';
			document.getElementById('registerBox').style.display = 'none';
			document.getElementById('loginBox').style.display = 'flex'
			break;		
		case 'r':
			document.getElementById('loginBox').style.display = 'none';
			document.getElementById('wbBox').style.display = 'none';
			document.getElementById('registerBox').style.display = 'flex';
			break;
		default:
			document.getElementById('registerBox').style.display = 'none';
			document.getElementById('loginBox').style.display = 'none';
			document.getElementById('wbBox').style.display = 'flex';
	};
};

function cProfile(a){
	switch(a){
		case 'c':
			document.getElementById('user_detalhes').style.display = 'none';
			document.getElementById('user_update').style.display = 'flex';
			break;
		case 'b':
			document.getElementById('user_detalhes').style.display = 'flex';
			document.getElementById('user_update').style.display = 'none';
			break;
	};
};

function delclose(){
	document.getElementById('delWord').style.display = 'none';
}

function dProfile(d){
	switch(d){
		case 'desistir':
			document.getElementById('deletepopup').style.display = 'none';
			break;
		case 'deletar':
			document.getElementById('deletepopup').style.display = 'flex';
			break;
	};
};

function delword(word){
	document.getElementById('wordId').value = user.username;
	document.getElementById('wordSlain').value = word;
	document.getElementById('delWord').style.display = 'flex';
};

function error (err){
	if (document.readyState === 'complete') {
		switch(err){
			case 'erro':
		
				break;
			case 'senha incorreta':
				Swal.fire(
					'Sua entrada não foi permitida',
					'Parece que você se esqueceu da sua senha',
				)	
				break;
			case 'login não existe':
				Swal.fire(
					'Você ainda não é um Peripatético',
					'Você precisa se apresentar para entrar na taberna',
				)	
				break;
			case 'reg':
				Swal.fire(
					'Você precisa informar seus dados',
					' para finalizar o seu registro ',
				)	
				break;
			case 'ainda':
				Swal.fire(
					'USERNAME JÁ REGISTRADO!',
					'Escolha outro nome de usuário',
				)	
				break;
		};
	};
};

function game(user){
	switch(user){
		case null:
				window.location.href = "/";
			break;
		default:
			document.getElementById('wordId').value = user.username;
			document.getElementById('title_user').innerText = '@'+user.username;
			document.getElementById('title_img').src = user.img;
			break;
	};
};

function isLogged(user){
	if(user!=undefined){
		window.location.href = "/game";
	};
};

function logoff(r){
	localStorage.removeItem('user');
	switch(r){
		case 's':
			window.location.href = "/";
			break;
	};
};

function redirect(n){
	document.onreadystatechange = function () {
		if (document.readyState === 'complete') {
			if(n){
				Swal.fire(
					'Seu registro foi efetuado',
					'Você será redirecionado automaticamente',
				);
				setTimeout(() => {
					window.location.href = "/game";
				}, 3000);
			
			}else{
				setTimeout(() => {
					window.location.href = "/game";
				}, 750);
			};
		};
	};
};

function redirectGame(){
	console.log(user)
	if(user==null){
		window.location.href = "/";
	};
};

function seek(c){
	if(matches.includes(c)||wrongs.includes(c)){
		console.log('já foi utilizado');
	}else if(secret.includes(c)){
		for(let l in secret){
			if (secret[l] == c){
				document.querySelectorAll('.letters')[l].style.display='flex';
				matches.push(c)
			};
		};
	}else{
		wrongs.push(c);
		tents--;
		document.getElementById('miss').innerHTML += '<div class="miss"><span>'+c+'</span></div>'
	}
	document.getElementById('t').innerText = 'Restam '+tents+' tentativas';
};

function showUser(a,user){
	switch(a){
		case 'o':
			const auser = everybody.find(users => users.user === user);
			document.getElementById('users_img').src = auser.img;
			document.getElementById('users_username').innerText = 'User: '+auser.user;
			document.getElementById('users_name').innerText = 'Nome: '+auser.name;
			document.getElementById('users_pts').innerText = 'Pontos: '+auser.pts;
			document.getElementById('users_words').innerHTML = '<span>Palavras:</span></br>'
			if(auser.words!=null){
				const words = auser.words.split(',');
				words.forEach((w)=> {
					document.getElementById('users_words').innerHTML += '<span>'+w.trim()+'</span></br>';
				});
			}
			document.getElementById('users_info').style.display = 'flex';
			break;
		case 'c':
			document.getElementById('users_info').style.display = 'none';
			break;
	};
};

function updatedetails(user){
	document.getElementById('details_words').innerHTML = '<span>Palavras:</span></br>'
	if(user.words != null){
		let words = user.words.split(',');
		words.forEach((w)=> {
			document.getElementById('details_words').innerHTML += '<div onclick="delword('+"'"+w.trim()+"'"+')"><span>'+w.trim()+'</span></div></br>';
		});
	};
	document.getElementById('details_img').src = user.img;
	document.getElementById('details_id').innerText = 'ID: '+user.id;
	document.getElementById('details_username').innerText = 'User: '+user.username;
	document.getElementById('details_name').innerText = 'Nome: '+user.name;
	document.getElementById('details_pts').innerText = 'Pontos: '+user.pts;
	document.getElementById('user').value = user.username;
	document.getElementById('name').value = user.name;
	document.getElementById('pw').value = user.pw;
	document.getElementById('img').value = user.img ;
	document.getElementById('inputuser').value = user.username;
	document.getElementById('inputid').value = user.id;
};

function verific(){
	if(wrongs.length>5){
		document.querySelector('#submit').disabled = true;
		document.querySelector('#l').disabled = true;
		
		for(let l in secret){
			if (matches.includes(secret[l])===false){
				document.querySelectorAll('.letters')[l].style.color='#FF1111';
				document.querySelectorAll('.letters')[l].style.display='flex';
			};
		};
		console.log('fim de jogo - perdeu');
	}else if(matches.length===secret.length){
		document.querySelector('#submit').disabled = true;
		document.querySelector('#l').disabled = true;
		addpts();
		let att = user;
		user.pts+=7
		user = JSON.stringify(user);
		localStorage.setItem('user', current );
		console.log('fim de jogo - ganhou');
	};
};
