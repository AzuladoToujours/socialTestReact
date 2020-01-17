import React, { Component } from 'react';
import { getSinglePost, removePost, likePost, unlikePost } from './apiPost';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/Auth';
import Comment from './Comment';

class SinglePost extends Component {
	state = {
		post: '',
		redirectToHome: false,
		redirectToSignin: false,
		like: false,
		likes: 0,
		comments: []
	};

	componentDidMount = () => {
		const postId = this.props.match.params.postId;
		getSinglePost(postId).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({
					post: data,
					likes: data.likes.length,
					like: this.checkLike(data.likes),
					comments: data.comments
				});
			}
		});
	};

	updateComments = comments => {
		this.setState({ comments: comments });
	};

	checkLike = likes => {
		const userId = isAuthenticated() && isAuthenticated().user._id;
		//IndexOf returns -1 if the user is not found
		let match = likes.indexOf(userId) !== -1;
		return match;
	};

	deletePost = () => {
		const postId = this.props.match.params.postId;
		const token = isAuthenticated().token;
		removePost(postId, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({ redirectToHome: true });
			}
		});
	};

	deleteConfirm = () => {
		let answer = window.confirm('Are you sure you want to delete your post?');
		if (answer) {
			this.deletePost();
		}
	};

	likeToggle = () => {
		if (!isAuthenticated()) {
			this.setState({ redirectToSignin: true });
			return false;
		}
		let callApi = this.state.like ? unlikePost : likePost;

		const userId = isAuthenticated().user._id;
		const postId = this.props.match.params.postId;
		const token = isAuthenticated().token;

		callApi(userId, postId, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({ like: !this.state.like, likes: data.likes.length });
			}
		});
	};

	renderPost = post => {
		const posterId = post.postedBy ? post.postedBy._id : '';
		const posterName = post.postedBy ? post.postedBy.name : '';
		const { like, likes } = this.state;

		return (
			<div className="card-body">
				<img
					src={`${process.env.REACT_APP_API_URL}/post/photo/${
						this.props.match.params.postId
					}?${new Date().getTime()}`}
					alt={post.title}
					onError={i => ((i.target.style = 'none'), (i.target.alt = ''))}
					className="image-thumbnail mb-3"
					style={{ height: '300px', width: '100%', objectFit: 'cover' }}
				/>
				<p>{likes} Likes </p>
				{like ? (
					<h3 onClick={this.likeToggle}>
						<>
							<i
								className="fa fa-thumbs-up text-success bg-dark"
								style={{ padding: '10px', borderRadius: '50%' }}
							/>{' '}
							Liked
						</>
					</h3>
				) : (
					<h3 onClick={this.likeToggle}>
						<>
							<i
								className="fa fa-thumbs-up text-warning bg-dark"
								style={{ padding: '10px', borderRadius: '50%' }}
							/>{' '}
							Like
						</>
					</h3>
				)}

				<p className="card-text">{post.body}</p>
				<br />
				<p className="font-italic mark">
					Posted by:
					<Link to={`/user/${posterId}`}> {posterName} </Link>
					on {new Date(post.created).toDateString()}
				</p>

				<div className="d-inline-block">
					<Link to={`/`} className="btn btn-raised btn-primary btn-sm mr-5">
						Back to posts
					</Link>

					{isAuthenticated().user && isAuthenticated().user._id === posterId && (
						<div className="d-inline-block">
							<Link
								to={`/post/edit/${post._id}`}
								className="btn btn-raised btn-warning mr-5"
							>
								EDIT POST
							</Link>
							<button
								//Dont put the () because it will triggers the method when the componentMounts
								onClick={this.deleteConfirm}
								className="btn btn-raised btn-danger mr-5"
							>
								DELETE POST
							</button>
						</div>
					)}

					<div>
						{isAuthenticated().user && isAuthenticated().user.role === 'admin' && (
							<div className="card mt-5">
								<div className="card-body">
									<h5 className="card-title">Admin</h5>
									<p className="mb-2 text-danger">Edit/Delete as an Admin</p>
									<Link
										to={`/post/edit/${post._id}`}
										className="btn btn-raised btn-warning btn-sm mr-5"
									>
										Update Post
									</Link>
									<button
										onClick={this.deleteConfirm}
										className="btn btn-raised btn-danger"
									>
										Delete Post
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	};

	render() {
		const { post, redirectToHome, redirectToSignin, comments } = this.state;

		if (redirectToHome) {
			return <Redirect to={'/'} />;
		}

		if (redirectToSignin) {
			return <Redirect to={'/signin'} />;
		}

		return (
			<div className="container">
				<h2 className="display-2 mt-5 mb-5">{post.title}</h2>
				{this.renderPost(post)}
				<Comment
					postId={post._id}
					comments={comments.reverse()}
					updateComments={this.updateComments}
				/>
			</div>
		);
	}
}

export default SinglePost;
