import React, { Component } from 'react';
import { commentPost, uncommentPost } from './apiPost';
import { isAuthenticated } from '../auth/Auth';
import { Link, Redirect } from 'react-router-dom';

class Comment extends Component {
	state = {
		text: '',
		error: '',
		redirectToSignin: false
	};

	handleChange = event => {
		this.setState({ text: event.target.value });
		this.setState({ error: '' });
	};

	isValid = () => {
		const { text } = this.state;

		if (!text.length > 0 || text.length > 150) {
			this.setState({
				error: 'Comment should not be empty and less than 150 characters long'
			});
			return false;
		}

		return true;
	};

	addComment = e => {
		//The page is not realoded when submited
		e.preventDefault();

		if (isAuthenticated()) {
			if (this.isValid()) {
				const userId = isAuthenticated().user._id;
				const token = isAuthenticated().token;
				const postId = this.props.postId;
				//It has to have text because in the backend the property is called text.
				const comment = { text: this.state.text };

				commentPost(userId, postId, token, comment).then(data => {
					if (data.error) {
						console.log(data.error);
					} else {
						this.setState({ text: '' });
						//Update the comments array in the props, so we can show it in the SinglePost
						this.props.updateComments(data.comments);
					}
				});
			}
		} else {
			this.setState({ redirectToSignin: true });
		}
	};

	deleteComment = comment => {
		const userId = isAuthenticated().user._id;
		const token = isAuthenticated().token;
		const postId = this.props.postId;
		uncommentPost(userId, postId, token, comment).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				//Update the comments array in the props, so we can show it in the SinglePost
				this.props.updateComments(data.comments);
			}
		});
	};

	deleteConfirmed = comment => {
		let answer = window.confirm(
			'Are you sure you want to delete your comment?'
		);
		if (answer) {
			this.deleteComment(comment);
		}
	};

	render() {
		const comments = this.props.comments;
		const { error, redirectToSignin } = this.state;

		if (redirectToSignin) {
			return <Redirect to={'/signin'} />;
		}

		return (
			<div>
				<h2 className="mt-5 mb-5">Leave a Comment</h2>

				<form>
					<div className="form-group">
						<input
							type="text"
							onChange={this.handleChange}
							value={this.state.text}
							className="form-control"
							placeholder="Comment..."
						/>
						<button
							onClick={this.addComment}
							className="btn btn-raised btn-success mt-2"
						>
							COMMENT
						</button>
					</div>
				</form>
				<div
					className="alert alert-danger"
					style={{ display: error ? '' : 'none' }}
				>
					{error}
				</div>
				<hr />
				<div className="col-md-8 col-md-offset-2">
					<h3 className="text" style={{ color: '#FF7075' }}>
						{comments.length} Comments
					</h3>
					<hr />
					{comments.map((comment, i) => (
						<div key={i}>
							<div>
								<Link
									to={`/user/${comment.postedBy._id}`}
									style={{ color: '#FF5E4B' }}
								>
									<img
										style={{
											borderRadius: '100%',
											border: '2px solid',
											borderColor: '#FF5E4B'
										}}
										className="float-left mr-2"
										height="40px"
										width="40px"
										src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
										alt={comment.postedBy.name}
									/>
									<div>
										<p className="lead" style={{ color: '#FF5E4B' }}>
											{comment.postedBy.name}
										</p>
									</div>
								</Link>
								<span>
									{isAuthenticated().user &&
										isAuthenticated().user._id === comment.postedBy._id && (
											<>
												<span
													className="float-right mr-2"
													onClick={() => this.deleteConfirmed(comment)}
												>
													<i className="far fa-trash-alt"></i>
												</span>
											</>
										)}
								</span>
								<p
									style={{ color: '#FF5E4B' }}
									className="font-italic mark float"
								>
									{new Date(comment.created).toDateString()}
								</p>
								<p>{comment.text}</p>

								<hr />
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default Comment;
