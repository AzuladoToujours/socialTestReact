import React, { Component } from 'react';
import { getSinglePost, updatePost } from './apiPost';
import { isAuthenticated } from '../auth/Auth';
import { Redirect } from 'react-router-dom';

class EditPost extends Component {
	constructor() {
		super();
		this.state = {
			id: '',
			title: '',
			body: '',
			error: '',
			loading: false,
			redirectToPost: false,
			fileSize: 0
		};
	}

	init = postId => {
		getSinglePost(postId).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({
					id: data._id,
					title: data.title,
					body: data.body,
					error: ''
				});
			}
		});
	};

	//When the component mounts, we use Init() to get the post's information.
	componentDidMount = () => {
		this.postData = new FormData();
		const postId = this.props.match.params.postId;
		this.init(postId);
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
	//Checks the values in the edited post
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

	clickSubmit = event => {
		//This method prevent the refresh of the browser
		event.preventDefault();
		//To show the loading
		this.setState({ loading: true });

		if (this.isValid()) {
			const postId = this.props.match.params.postId;
			const token = isAuthenticated().token;

			updatePost(postId, token, this.postData).then(data => {
				if (data.error) this.setState({ error: data.error });
				else {
					this.setState({
						loading: false,
						title: '',
						body: '',
						redirectToPost: true
					});
				}
			});
		}
	};

	editPostForm = (title, body) => (
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
				<label className="text-muted">Post photo</label>
				<input
					onChange={this.handleChange('photo')}
					type="file"
					accept="image/*"
					className="form-control"
				/>
			</div>

			<button onClick={this.clickSubmit} className="btn btn raised btn-primary">
				UPDATE POST
			</button>
		</form>
	);

	render() {
		const { id, title, body, redirectToPost, error, loading } = this.state;

		if (redirectToPost) {
			return <Redirect to={`/post/${id}`} />;
		}
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Edit Post</h2>
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

				{isAuthenticated().user.role === 'admin' &&
					this.editPostForm(title, body)}

				{isAuthenticated().user._id === id && this.editPostForm(title, body)}
			</div>
		);
	}
}

export default EditPost;
