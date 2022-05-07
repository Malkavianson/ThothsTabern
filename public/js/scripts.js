let user = JSON.parse(localStorage.getItem('user'));

function showUser(a,user){
	switch(a){
		case 'o':
			const auser = everybody.find(users => users.user === user);
			document.getElementById('users_img').src = auser.img;
			document.getElementById('users_username').innerText = 'User: '+auser.user;
			document.getElementById('users_name').innerText = 'Nome: '+auser.name;
			document.getElementById('users_pts').innerText = 'Pontos: '+auser.pts;
			document.getElementById('users_words').innerHTML = '<span>Palavras:</span></br>'
			console.log(auser)
			const words = auser.words.split(',');
			words.forEach((w)=> {
				document.getElementById('users_words').innerHTML += '<span>'+w.trim()+'</span></br>';
			});
			document.getElementById('users_info').style.display = 'flex';
			break;
		case 'c':
			document.getElementById('users_info').style.display = 'none';
			break;
	};
};

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
function error (err){
	if (document.readyState === 'complete') {
	console.log(err)
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
function redirect(){
	document.onreadystatechange = function () {
		if (document.readyState === 'complete') {
			setTimeout(() => {
				window.location.href = "/game";
			}, 1000);
		};
	};
};
function game(user){
	switch(user){
		case null:
				window.location.href = "/";
			break;
		default:
			Swal.fire(
				'Bem vindo à Taberna',
				'',
			);
			document.getElementById('wordId').value = user.username;
			document.getElementById('title_user').innerText = '@'+user.username;
			document.getElementById('title_img').src = user.img;
			break;
	};
};

function updatedetails(user){
	let words = user.words.split(',');
	words.forEach((w)=> {
		document.getElementById('details_words').innerHTML += '<span>'+w.trim()+'</span></br>';
	});
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