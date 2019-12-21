//Gets the info of the authenticated user and then return it as a json
export const getInfo = (userId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

//Make a get request to users and return the array as a json
export const list = () => {
	return fetch(`${process.env.REACT_APP_API_URL}/users`, {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

//Method to deleteAccount

export const removeUser = (userId, token) => {
	//fetch to the method in the backend
	return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

export const updateUser = (userId, token, user) => {
	console.log('USER:', user);
	return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: user
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

export const updateMenu = (user, next) => {
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('jwt')) {
			let auth = JSON.parse(localStorage.getItem('jwt'));
			auth.user = user;
			localStorage.setItem('jwt', JSON.stringify(auth));
			next();
		}
	}
};
