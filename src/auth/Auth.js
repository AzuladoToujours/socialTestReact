export const signUp = user => {
	//To make the POST request, we can use axios, but we will use fetch...
	return fetch('http://localhost:8080/signup', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then(response => {
			//We use this method to show what the backend shows... like "Name required"
			return response.json();
		})
		.catch(err => console.log(err));
};

export const signIn = user => {
	//To make the POST request, we can use axios, but we will use fetch...
	return fetch('http://localhost:8080/signin', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then(response => {
			//We use this method to show what the backend shows... like "Name required"
			return response.json();
		})
		.catch(err => console.log(err));
};

export const authenticate = (jwt, next) => {
	//typeof operator, window object...
	if (typeof window !== 'undefined') {
		//name of the item, and the value
		localStorage.setItem('jwt', JSON.stringify(jwt));
		//When the user authenticates, next get executed, so redirect becomes true
		next();
	}
};

//The reason of next is, we'll use another callback that will redirect the user to another route.
export const signOut = next => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('jwt');
	}
	next();
	return fetch('http://localhost:8080/signout', {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const isAuthenticated = () => {
	if (typeof window == 'undefined') {
		return false;
	}

	if (localStorage.getItem('jwt')) {
		return JSON.parse(localStorage.getItem('jwt'));
	} else {
		return false;
	}
};
