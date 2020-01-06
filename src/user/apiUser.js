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

//Method to update User, without Content-Type because we'll be needing a formData that is sended via the body as user.
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

// Method to updateMenu whenever is a change, checks if the localStorage has the jwt item,
// then change the user in the jwt to the sendend in the method, then set the item of jwt in the
//localStorage again

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

// Follow
export const follow = (userId, token, followId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ userId, followId })
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

// Unfollow
export const unfollow = (userId, token, unfollowId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ userId, unfollowId })
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

//FindPeople to follow
export const findPeople = (userId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/findpeople/${userId}`, {
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
