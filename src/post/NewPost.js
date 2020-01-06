import React, { Component } from 'react';
import { isAuthenticated } from '../auth/Auth';
import { createPost } from './apiPost';
import { Redirect } from 'react-router-dom';
//import DefaultProfile from '../images/avatar.jpg';

class NewPost extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			body: '',
			error: '',
			user: {},
			fileSize: 0,
			loading: false,
			redirectToProfile: false
		};
	}

	//When the Component mounts, this is called and set the state of the user with the authenticated user.
	componentDidMount() {
		this.postData = new FormData();
		this.setState({ user: isAuthenticated().user });
	}

	//Checks the values in the new post
	isValid = () => {
		const { title, body, fileSize } = this.state;
		if (fileSize > 100000) {
			this.setState({ error: 'File size should be less than 100kb' });
			return false;
		}
		if (title.length === 0 || body.length === 0) {
			this.setState({ error: 'All fields are required', loading: false });
			return false;
		}

		return true;
	};

	//Method to trate the info of the inputs and receive the name as a key
	handleChange = name => event => {
		this.setState({ error: '' });

		//Grab the values in the form, checks if the value is the photo
		const value = name === 'photo' ? event.target.files[0] : event.target.value;

		const fileSize = name === 'photo' ? event.target.files[0].size : 0;
		this.postData.set(name, value);
		this.setState({ [name]: value, fileSize });
	};

	clickSubmit = event => {
		//This method prevent the refresh of the browser
		event.preventDefault();
		//To show the loading
		this.setState({ loading: true });

		if (this.isValid()) {
			const userId = isAuthenticated().user._id;
			const token = isAuthenticated().token;

			createPost(userId, token, this.postData).then(data => {
				if (data.error) this.setState({ error: data.error });
				else {
					this.setState({
						loading: false,
						title: '',
						body: '',
						photo: '',
						redirectToProfile: true
					});
				}
			});
		}
	};

	postForm = (title, body) => (
		<form>
			<div className="form-group">
				<label className="text-muted">Title</label>
				<input
					onChange={this.handleChange('title')}
					type="text"
					className="form-control"
					value={title}
				/>
			</div>

			<div className="form-group">
				<label className="text-muted">Body</label>
				<textarea
					onChange={this.handleChange('body')}
					type="text"
					className="form-control"
					value={body}
				/>
			</div>

			<div className="form-group">
				<label className="text-muted">Add photo</label>
				<input
					onChange={this.handleChange('photo')}
					type="file"
					accept="image/*"
					className="form-control"
				/>
			</div>

			<button onClick={this.clickSubmit} className="btn btn raised btn-primary">
				POST
			</button>
		</form>
	);

	render() {
		const { title, body, error, loading, user, redirectToProfile } = this.state;

		if (redirectToProfile) {
			return <Redirect to={`/user/${user._id}`} />;
		}

		return (
			<div className="container">
				<h2 className="mt-5 mb-5">NEW POST</h2>
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

				{this.postForm(title, body)}
			</div>
		);
	}
}

export default NewPost;
