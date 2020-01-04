export const createPost = (userId, token, post) => {
	return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: post
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

//Make a get request to posts and return the array as a json
export const listPosts = () => {
	return fetch(`${process.env.REACT_APP_API_URL}/posts`, {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const getSinglePost = postId => {
	return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const getPostsByUser = (userId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`, {
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

export const removePost = (postId, token) => {
	//fetch to the method in the backend
	return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
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

export const updatePost = (postId, token, post) => {
	console.log(postId, token, post);
	return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: post
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

export const likePost = (userId, postId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/post/like`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ userId, postId })
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

export const unlikePost = (userId, postId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ userId, postId })
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};
