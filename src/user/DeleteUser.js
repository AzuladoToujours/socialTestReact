import React, { Component } from 'react';
import { removeUser } from './apiUser';
import { isAuthenticated, signOut } from '../auth/Auth';
import { Redirect } from 'react-router-dom';

class DeleteUser extends Component {
	state = {
		redirect: false,
		redirectAdmin: false
	};
	deleteAccount = () => {
		//Get the token in the session
		const token = isAuthenticated().token;
		//Grab the userId given in the URL
		const userId = this.props.userId;
		//Do the method
		removeUser(userId, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else if (isAuthenticated().user && isAuthenticated().user.role) {
				console.log('User has been deleted');
				//Redirect
				this.setState({ redirectAdmin: true });
			} else {
				//Signout user, as it takes a next, we just console log
				signOut(() => console.log('User has been deleted'));
				//Redirect
				this.setState({ redirect: true });
			}
		});
	};

	//Confirmation
	deleteConfirmed = () => {
		let answer = window.confirm(
			'Are you sure you want to delete your account?'
		);
		if (answer) {
			this.deleteAccount();
		}
	};

	render() {
		const { redirect, redirectAdmin } = this.state;

		if (redirect) {
			return <Redirect to={'/'} />;
		} else if (redirectAdmin) {
			return <Redirect to={'/admin'} />;
		} else {
			return (
				<button
					className="btn btn-raised btn-danger mr-5"
					onClick={this.deleteConfirmed}
				>
					DELETE PROFILE
				</button>
			);
		}
	}
}

export default DeleteUser;
