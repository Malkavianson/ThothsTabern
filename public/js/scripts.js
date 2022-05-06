function logoff(){
	localStorage.removeItem('user');
	window.location.href = "/";
}

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
			document.getElementById('title_user').innerText = 'convidado';
			document.getElementById('title_img').src = 'img/profile_pictures/default.png';
			document.getElementById('link_profile').href = '/';
			break;
		default:
			document.getElementById('title_user').innerText = '@'+user.username;
			document.getElementById('title_img').src = user.img;
			break;
	};
}

function updatedetails(user){
	let words = user.words.split(',');
	document.getElementById('details_img').src = user.img;
	document.getElementById('details_id').innerText = 'ID: '+user.id;
	document.getElementById('details_username').innerText = 'User: '+user.username;
	document.getElementById('details_name').innerText = 'Nome: '+user.name;
	document.getElementById('details_pts').innerText = 'Pontos: '+user.pts;
	words.forEach((w)=> {
		document.getElementById('details_words').innerHTML += '<span>'+w.trim()+'</span>';
	});
	document.getElementById('user').value = user.username;
	document.getElementById('name').value = user.name;
	document.getElementById('img').value = user.img ;
	document.getElementById('pw').value = user.pw;
};