function closeLoginMenu(){
	const loginMenu = document.getElementsByClassName('login-menu')[0];
	loginMenu.classList.remove('show-additional-menu');
}

function openLoginMenu(){
	const loginMenu = document.getElementsByClassName('login-menu')[0];
	loginMenu.classList.add('show-additional-menu');
}

function closeFavorites(){
	const favorites = document.getElementsByClassName('favorites-menu')[0];
	favorites.classList.remove('show-additional-menu');
}

function openFavorites(){
	const favorites = document.getElementsByClassName('favorites-menu')[0];
	favorites.classList.add('show-additional-menu');
}

function closeMobileSearch(){
	const mobileSearch = document.getElementsByClassName('mobile-find-field')[0];
	mobileSearch.classList.remove('show-mobile-search');
}

function openMobileSearch(){
	const mobileSearch = document.getElementsByClassName('mobile-find-field')[0];
	mobileSearch.classList.add('show-mobile-search');
}

function closeBurgerMenu(){
	const burgerMenu = document.getElementsByClassName('floating-menu')[0];
	burgerMenu.classList.remove('show-menu');
}

function openBurgerMenu(){
	const burgerMenu = document.getElementsByClassName('floating-menu')[0];
	burgerMenu.classList.add('show-menu');
}

function deactivateBurgerImg(){
	const burgerImg = document.getElementsByClassName('ham')[0];
	burgerImg.classList.remove('active');
}

function activateBurgerImg(){
	const burgerImg = document.getElementsByClassName('ham')[0];
	burgerImg.classList.add('active');
}

function closeFoundRoutes(){
	const foundRoutes = document.getElementsByClassName('found-route-menu')[0];
	foundRoutes.style.display = 'none';
}

function openFoundRoutes(){
	const foundRoutes = document.getElementsByClassName('found-route-menu')[0];
	generateRoute();
	foundRoutes.style.display = 'block';
}

function toggleBurgerMenu(){
	floatingMenu = document.getElementsByClassName("floating-menu")[0];
	floatingMenu.classList.toggle("show-menu");

	closeLoginMenu();
	closeFavorites();
	closeMobileSearch();
}

function toggleMobileSearch(){
	mobileSearch = document.getElementsByClassName("mobile-find-field")[0];
	mobileSearch.classList.toggle("show-mobile-search");

	closeLoginMenu();
	closeFavorites();
	closeBurgerMenu();
	deactivateBurgerImg();
}

function toggleFavorites(){
	favorites = document.getElementsByClassName("favorites-menu")[0];
	favorites.classList.toggle("show-additional-menu");

	closeLoginMenu();
	closeMobileSearch();
	closeBurgerMenu();
	deactivateBurgerImg();
}

function toggleLoginMenu(){
	login = document.getElementsByClassName("login-menu")[0];
	login.classList.toggle("show-additional-menu");

	closeFavorites();
	closeMobileSearch();
	closeBurgerMenu();
	deactivateBurgerImg();
}

function closeFindMenu(){
	var findMenu = document.getElementsByClassName("find-a-route-menu")[0];
	findMenu.classList.toggle("find-a-route-wrapped");
}

function editFavorites(){
	deleteButtons = document.getElementsByClassName("delete-button");
	if(document.getElementsByClassName('edit-button')[0].firstChild.textContent=='more_vert'){
		for (i=0; i < deleteButtons.length; i++)
			deleteButtons[i].style.display = 'block';
		document.getElementsByClassName('edit-button')[0].firstChild.textContent='more_horiz';
	}
	else {
		for (i=0; i < deleteButtons.length; i++)
			deleteButtons[i].style.display = 'none';
		document.getElementsByClassName('edit-button')[0].firstChild.textContent='more_vert';
	}
}

function removeFromFavorites(button){
	button.parentElement.remove('');
}

function editTable(tableButton){
	try{
		const tbody = tableButton.parentElement.lastElementChild.lastElementChild;

		if (tbody.firstChild.lastChild.innerText != "Remove"){
			const Rows = Array.from(tbody.rows);
			Rows.splice(0,1);

			addEditColumn(tbody);

			for (row in Rows){
				const i = document.createElement('i'),
				td = document.createElement('td');
				td.appendChild(i);
				i.setAttribute('class','material-icons');
				td.setAttribute('class','table-editor-buttons');
				i.innerText='edit';
				Rows[row].appendChild(td);
			}
			
			addRemoveColumn(tbody);

			for (row in Rows){
				const i = document.createElement('i'),
				td = document.createElement('td');
				td.appendChild(i);
				i.setAttribute('class','fa fa-minus');
				td.setAttribute('class','table-editor-buttons');
				td.setAttribute('onclick','removeTableItem(this)');
				Rows[row].appendChild(td);
			}

			for (let i=0; i<tbody.firstChild.children.length-2; i++){
				const td = document.createElement('td'),
				editInput = document.createElement('input');
				editInput.setAttribute('class', 'table-edit-input');
				editInput.setAttribute('type', 'text');
				td.appendChild(editInput);
				tbody.lastChild.appendChild(td);
			}
			
			const td = document.createElement('td');
			tbody.lastChild.appendChild(td);
			addPlusButton(tbody);
		}
	}
	catch (error) {
		console.log("An error has been caught: " + error);
	}

	function addPlusButton(tbody){
		const td = document.createElement('td'),
		i = document.createElement('i');
		i.setAttribute('class','material-icons table-editor-buttons');
		i.innerText='add_circle_outline';
		td.appendChild(i);
		tbody.lastChild.appendChild(td);
	}

	function addEditColumn(tbody){
		tr = document.createElement('tr'),
		th = document.createElement('th');
		th.innerText="Edit";
		tbody.firstChild.appendChild(th);
		tbody.appendChild(tr);
	}

	function addRemoveColumn(tbody){
		tr = document.createElement('tr'),
		th = document.createElement('th');
		th.innerText="Remove";
		tbody.firstChild.appendChild(th);
		tbody.appendChild(tr);
	}
}

function removeTableItem(item){
	item.parentElement.remove('');
}

function stopsAutoComplete(){
	requestJSON(generateOptions);
	function generateOptions(data){
		if(!document.querySelector('#stopsA').childElementCount){
			stops = data.stops;
			for (stop in stops){
				const datalist = document.querySelector('#stopsA');
				const option = document.createElement('option');
				option.setAttribute('value',stops[stop].name);
				datalist.appendChild(option);
			}
			for (stop in stops){
				const datalist = document.querySelector('#stopsB');
				const option = document.createElement('option');
				option.setAttribute('value',stops[stop].name);
				datalist.appendChild(option);
			}
		}
	}
}

function globalAutoComplete(){
	requestJSON(generateOptions);
	function generateOptions(data){
		if(!document.querySelector('#global-search-items').childElementCount){
			const stops = data.stops, routes = data.routes, transports = data.transport;
			for (stop in stops){
				const datalist = document.querySelector('#global-search-items');
				const option = document.createElement('option');
				option.setAttribute('value',stops[stop].name);
				datalist.appendChild(option);
			}
			for (route in routes){
				const datalist = document.querySelector('#global-search-items');
				const option = document.createElement('option');
				option.setAttribute('value',routes[route].name);
				datalist.appendChild(option);
			}
			for (transport in transports){
				const datalist = document.querySelector('#global-search-items');
				const option = document.createElement('option');
				option.setAttribute('value',transports[transport].number);
				datalist.appendChild(option);
			}
		}
	}
}

function signIn(){
	requestJSON(checker);
	function checker(data){
		const loginData = getLoginData(),
			  userData = data.users;
		for (user in userData){
			if ((userData[user].name == loginData[0])&&(userData[user].pass == loginData[1])){
				authorizationComplete(userData[user].name,userData[user].type);
				console.log('Authorization complete');
				return true;
			}
		}
		authorizationFailed();
		console.log('Authorization failed');		
	}

	function getLoginData(){
		const login = document.querySelector('#login-field').value,
			  pass = document.querySelector('#password-field').value;
		
		return [login,pass];
	}

	function authorizationComplete(userName,userType){
		document.querySelector('#login-button').remove();
		document.querySelector('#login-field').remove();
		document.querySelector('#password-field').remove();
		document.querySelector('.login-menu h3').innerText = "Welcome on site, " + userName + "!";
		document.cookie = userType;
		console.log('cookie: ' + document.cookie);
	}

	function authorizationFailed(){
		document.querySelector('#login-field').classList.add('login-failed');
		document.querySelector('#password-field').classList.add('login-failed');
	}
}

function loginValidationReset(){
	document.querySelector('#login-field').classList.remove('login-failed');
	document.querySelector('#password-field').classList.remove('login-failed');
}

function generateTransportTable(){
	requestJSON(generateTable);
	function generateTable(data){
		const transports = data.transport;
		for (transport in transports){
			let type;
			switch(transports[transport].type) {
				case 'AB':
					type = 'directions_bus'
					 break;
				case 'TM':
					type = 'tram'
					 break;
				case 'TL':
					type = 'train'
					break;
			  }
			generateRow(type,transports[transport].number,transports[transport].route,transports[transport].seats);
		}
	}
	function generateRow(type,number,route,seats){
		const tr = document.createElement('tr');
		tr.innerHTML = '<td><i class="material-icons">' + type +
		'</i></td><td onclick="generateTransportCard(this)">'+ number + '</td><td>' + route +
		'</td><td>' + seats + '</td>';
		document.querySelector('#transport-table').lastChild.append(tr);
	}
}

function generateStopsTable(){
	requestJSON(generateTable);

	function generateTable(data){
		const stops = data.stops;
		for (stop in stops){
			generateRow(stops[stop].name,stops[stop].number,Object.keys(stops[stop].timetable));
		}
	}

	function generateRow(name,number,route){
		const tr = document.createElement('tr');
		tr.innerHTML = '<td onclick="showCard()">' + name +
		'</td><td onclick="showCard()">'+ number + '</td><td>' + route +
		'</td>';
		document.querySelector('#stops-table').lastChild.append(tr);
	}
}


function generateRoutesTable(){
	requestJSON(generateTable);

	function generateTable(data){
		const routes = data.routes,
		stops = data.stops;
		for (route in routes){
			for (stop in stops){
				generateRow(routes[route].name,routes[route].stops[0],routes[route].stops[routes[route].stops.length-1]);
				break;
			}
		}
	}
					
	function generateRow(name,from,to){
		const tr = document.createElement('tr');
		tr.innerHTML = '<td onclick="showCard()">' + name +
		'</td><td>'+ from + '</td><td>' + to + '</td>';
		document.querySelector('#routes-table').lastChild.append(tr);
	}
}

function pageHandler(){
	switch(window.location.pathname){
		case "/nested/transport":
			generateTransportTable();
			break;
		case "/nested/stops":
			generateStopsTable();
			break;
		case "/nested/routes":
			generateRoutesTable();
			break;
	}
}

function generateRoute(){
	const stopA = document.querySelector('#stopA').value,
	stopB = document.querySelector('#stopB').value;
	console.log(stopA + '\t'+ stopB);
}

function generateTransportCard(generationRowData){
	showCard();
	const name = generationRowData.innerText;
	let type;
	switch(generationRowData.previousSibling.innerText) {
		case 'directions_bus':
			type = 'Bus ';
			break;
		case 'tram':
			type = 'Tram ';
			break;
		case 'train':
			type = 'Trolley bus ';
			break;
	  }
	document.querySelector('.card h3').innerText = type + name;
}

function showCard(){
	var card = document.getElementsByClassName("card")[0];
	card.classList.add("show-card");
	card.scrollIntoView({block: "start", behavior: "smooth"});
}

function closeCard(cardCloseButton){
	cardCloseButton.parentElement.classList.remove('show-card');
}

function requestJSON(func){
		const xhr = new XMLHttpRequest();
		xhr.open('GET', '/rest/data', true);
		xhr.responseType = 'blob';
		xhr.onload = function() {
			if (this.status == 200) {
				const file = new File([this.response], 'temp');
				const fileReader = new FileReader();
				fileReader.addEventListener('load', function(){
					const data = JSON.parse(fileReader.result);
					func(data);
				});
				fileReader.readAsText(file);
			} 
		}
		xhr.send();
}

window.onload = pageHandler()