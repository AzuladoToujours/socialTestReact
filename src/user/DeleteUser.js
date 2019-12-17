import React, { Component } from 'react';
import { removeUser } from './apiUser';
import { isAuthenticated, signOut } from '../auth/Auth';
import { Redirect } from 'react-router-dom';

class DeleteUser extends Component {
	state = {
		redirect: false
	};
	deleteAccount = () => {
		const token = isAuthenticated().token;
		const userId = this.props.userId;
		removeUser(userId, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				//Signout user, as it takes a next, we just console log
				signOut(() => console.log('User has been deleted'));
				//Redirect
				this.setState({ redirect: true });
			}
		});
	};

	deleteConfirmed = () => {
		let answer = window.confirm(
			'Are you sure you want to delete your account?'
		);
		if (answer) {
			this.deleteAccount();
		}
	};

	render() {
		const { redirect } = this.state;

		if (redirect) {
			return <Redirect to={'/'} />;
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
