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