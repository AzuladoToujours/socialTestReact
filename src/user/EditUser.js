import React, { Component } from 'react';
import { isAuthenticated } from '../auth/Auth';
import { getInfo, updateUser, updateMenu } from './apiUser';
import { Redirect } from 'react-router-dom';
//import DefaultProfile from '../images/avatar.jpg';

class EditUser extends Component {
	constructor() {
		super();
		this.state = {
			id: '',
			name: '',
			email: '',
			redirectToProfile: false,
			fileSize: 0,
			error: '',
			loading: false,
			about: ''
		};
	}

	//Gets the info of the user
	isAuth = userId => {
		const token = isAuthenticated().token;
		getInfo(userId, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({
					id: data._id,
					name: data.name,
					email: data.email,
					error: '',
					about: data.about
				});
			}
		});
	};

	//When the Component is called
	componentDidMount() {
		this.userData = new FormData();
		const userId = this.props.match.params.userId;
		this.isAuth(userId);
	}

	//Check the vality of the values in the form
	isValid = () => {
		const { name, email, fileSize } = this.state;
		if (fileSize > 100000) {
			this.setState({ error: 'File size should be less than 100kb' });
			return false;
		}
		if (name.length === 0) {
			this.setState({ error: 'Name is required', loading: false });
			return false;
		}
		//eslint-disable-next-line
		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			this.setState({ error: 'A valid email is required', loading: false });
			return false;
		}
		return true;
	};

	//Method to trate the info of the inputs and receive the name as a key
	handleChange = name => event => {
		this.setState({ error: '' });

		//Grab the values in the form, if it matchs the name of photo; we grab the first file, if it not we just grab the value
		const value = name === 'photo' ? event.target.files[0] : event.target.value;
		//Checks if the name is photo and get the size, if it isn't a photo, just give to fileSize the value of 0
		const fileSize = name === 'photo' ? event.target.files[0].size : 0;
		//Set the values to the form data (userData)
		this.userData.set(name, value);
		//Change the value of the variables and the fileSize in the state
		this.setState({ [name]: value, fileSize });
	};

	clickSubmit = event => {
		//This method prevent the refresh of the browser
		event.preventDefault();
		//To show the loading
		this.setState({ loading: true });

		if (this.isValid()) {
			const userId = this.props.match.params.userId;
			const token = isAuthenticated().token;
			//Update the user, then updated the Menu with the new data and redirectToProfile
			updateUser(userId, token, this.userData).then(data => {
				if (data.error) {
					this.setState({ error: data.error });
				} else if (isAuthenticated().user.role === 'admin') {
					this.setState({
						redirectToProfile: true
					});
				} else
					updateMenu(data, () => {
						this.setState({
							redirectToProfile: true
						});
					});
			});
		}
	};

	editForm = (name, email, about) => (
		<form>
			<div className="form-group">
				<label className="text-muted">Profile Photo</label>
				<input
					onChange={this.handleChange('photo')}
					type="file"
					accept="image/*"
					className="form-control"
				/>
			</div>
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
				<label className="text-muted">About</label>
				<textarea
					onChange={this.handleChange('about')}
					type="text"
					className="form-control"
					value={about}
				/>
			</div>

			<button onClick={this.clickSubmit} className="btn btn raised btn-primary">
				UPDATE
			</button>
		</form>
	);

	render() {
		const {
			id,
			name,
			email,
			redirectToProfile,
			error,
			loading,
			about
		} = this.state;

		if (redirectToProfile) {
			return <Redirect to={`/user/${id}`} />;
		}
		//The new Date is to get the updated photo
		const photoUrl = `${
			process.env.REACT_APP_API_URL
		}/user/photo/${id}?${new Date().getTime()}`;

		return (
			<div className="container">
				<h2 className="mt-5 mb-5">EDIT PROFILE</h2>
				<div
					className="alert alert-danger"
					style={{ display: error ? '' : 'none' }}
				>
					{error}
				</div>

				{loading ? (
					<div className="jumbotron text-center">
						<h2>LOADING...</h2>
					</div>
				) : (
					''
				)}

				<img
					style={{ height: '200px', width: 'auto' }}
					className="image-thumbnail"
					src={photoUrl}
					//onError={i => (i.target.src = `${DefaultProfile}`)}
					alt={name}
				/>

				{this.editForm(name, email, about)}
			</div>
		);
	}
}

export default EditUser;
