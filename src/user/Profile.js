import React, { Component } from 'react';
import { isAuthenticated } from '../auth/Auth';
import { Redirect } from 'react-router-dom';
import { getInfo } from './apiUser';

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			user: '',
			redirectToSignIn: false
		};
	}

	//Checks if the user is authenticated, if it's not, we redirect to signin changing the state to true
	isAuth = userId => {
		const token = isAuthenticated().token;
		getInfo(userId, token).then(data => {
			if (data.error) {
				this.setState({ redirectToSignIn: true });
			} else {
				this.setState({ user: data });
			}
		});
	};

	componentDidMount() {
		const userId = this.props.match.params.userId;
		this.isAuth(userId);
	}

	render() {
		const redirectToSignIn = this.state.redirectToSignIn;

		if (redirectToSignIn) {
			return <Redirect to="/signin" />;
		}
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">PROFILE</h2>
				<p> Hello {isAuthenticated().user.name}</p>
				<p> Email: {isAuthenticated().user.email}</p>
				<p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
			</div>
		);
	}
}

export default Profile;
