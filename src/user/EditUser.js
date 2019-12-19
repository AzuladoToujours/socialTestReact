import React, { Component } from 'react';
import { isAuthenticated } from '../auth/Auth';
import { getInfo, updateUser } from './apiUser';
import { Redirect } from 'react-router-dom';

class EditUser extends Component {
	constructor() {
		super();
		this.state = {
			id: '',
			name: '',
			email: '',
			redirectToProfile: false,
			error: ''
		};
	}

	//Checks if the user is authenticated to get the data from it.
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

	//When the Component is called
	componentDidMount() {
		const userId = this.props.match.params.userId;
		this.isAuth(userId);
	}

	isValid = () => {
		const { name, email } = this.state;
		if (name.length === 0) {
			this.setState({ error: 'Name is required' });
			return false;
		}

		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			this.setState({ error: 'A valid email is required' });
			return false;
		}
		return true;
	};

	//Method to trate the info of the inputs...
	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	clickSubmit = event => {
		//This method prevent the refresh of the browser
		event.preventDefault();

		if (this.isValid()) {
			const { name, email } = this.state;
			const user = {
				name,
				email
			};

			const userId = this.props.match.params.userId;
			const token = isAuthenticated().token;

			updateUser(userId, token, user).then(data => {
				if (data.error) this.setState({ error: data.error });
				else
					this.setState({
						redirectToProfile: true
					});
			});
		}
	};

	editForm = (name, email) => (
		<form>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input
					onChange={this.handleChange('name')}
					type="text"
					className="form-control"
					value={name}
				/>
			</div>

			<div className="form-group">
				<label className="text-muted">Email</label>
				<input
					onChange={this.handleChange('email')}
					type="email"
					className="form-control"
					value={email}
				/>
			</div>

			<button onClick={this.clickSubmit} className="btn btn raised btn-primary">
				UPDATE
			</button>
		</form>
	);

	render() {
		const { id, name, email, redirectToProfile, error } = this.state;

		if (redirectToProfile) {
			return <Redirect to={`/user/${id}`} />;
		}

		return (
			<div className="container">
				<h2 className="mt-5 mb-5">EDIT PROFILE</h2>
				<div
					className="alert alert-danger"
					style={{ display: error ? '' : 'none' }}
				>
					{error}
				</div>
				{this.editForm(name, email)}
			</div>
		);
	}
}

export default EditUser;
