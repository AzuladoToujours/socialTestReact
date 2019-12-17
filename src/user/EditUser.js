import React, { Component } from 'react';
import { isAuthenticated } from '../auth/Auth';
import { getInfo } from './apiUser';

class EditUser extends Component {
	constructor() {
		super();
		this.state = {
			id: '',
			name: '',
			email: '',
			password: ''
		};
	}

	//Checks if the user is authenticated, if it's not, we redirect to signin changing the state to true
	isAuth = userId => {
		const token = isAuthenticated().token;
		getInfo(userId, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({
					id: data._id,
					name: data.name,
					email: data.email
				});
			}
		});
	};

	componentDidMount() {
		const userId = this.props.match.params.userId;
		this.isAuth(userId);
	}

	render() {
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">EDIT PROFILE</h2>
			</div>
		);
	}
}

export default EditUser;
