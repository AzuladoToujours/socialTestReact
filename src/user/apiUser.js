//Gets the info of the authenticated user and then return it as a json
export const getInfo = (userId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	}).then(response => {
		return response.json();
	});
};
