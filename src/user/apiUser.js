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
	return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(user)
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};
