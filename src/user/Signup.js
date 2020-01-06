import React, { Component } from 'react';
import { signUp } from '../auth/Auth';
import { Link } from 'react-router-dom';

class Signup extends Component {
	//The info will be managed in the state
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			error: '',
			open: false
		};
	}

	//Method to trate the info of the inputs whenever is a change

	handleChange = name => event => {
		this.setState({ error: '' });
		this.setState({ [name]: event.target.value });
	};

	//With the event onChange we'll know what changes has been made, then pass it through the method
	//handleChange to get the info.
	//The value is to change the state immediately

	clickSubmit = event => {
		//This method prevent the refresh of the browser
		event.preventDefault();
		const { name, email, password } = this.state;
		const user = {
			name,
			email,
			password
		};

		//Use the method signUp in the apiUser
		signUp(user).then(data => {
			if (data.error) this.setState({ error: data.error });
			else
				this.setState({
					error: '',
					name: '',
					email: '',
					password: '',
					open: true
				});
		});
	};

	//Form of the signup
	signUpForm = (name, email, password) => (
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

			<div className="form-group">
				<label className="text-muted">Password</label>
				<input
					onChange={this.handleChange('password')}
					type="password"
					className="form-control"
					value={password}
				/>
			</div>
			<button onClick={this.clickSubmit} className="btn btn raised btn-primary">
				SUBMIT
			</button>
		</form>
	);

	render() {
		//Whenever is an error, the display will verify is in a error and chose between error or none.
		const { name, email, password, error, open } = this.state;
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">SIGNUP</h2>

				<div
					className="alert alert-danger"
					style={{ display: error ? '' : 'none' }}
				>
					{error}
				</div>

				<div
					className="alert alert-info"
					style={{ display: open ? '' : 'none' }}
				>
					New account succesfuly created. Please{' '}
					<Link to="/signin">Sign In</Link>
				</div>

				{this.signUpForm(name, email, password)}
			</div>
		);
	}
}

export default Signup;
