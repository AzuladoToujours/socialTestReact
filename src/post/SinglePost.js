import React, { Component } from 'react';
import { getSinglePost } from './apiPost';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/Auth';

class SinglePost extends Component {
	state = {
		post: ''
	};

	componentDidMount = () => {
		const postId = this.props.match.params.postId;
		getSinglePost(postId).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({ post: data });
			}
		});
	};

	renderPost = post => {
		const posterId = post.postedBy ? post.postedBy._id : '';
		const posterName = post.postedBy ? post.postedBy.name : '';

		return (
			<div className="card-body">
				<img
					src={`${process.env.REACT_APP_API_URL}/post/photo/${this.props.match.params.postId}`}
					alt={post.title}
					onError={i => ((i.target.style = 'none'), (i.target.alt = ''))}
					className="image-thumbnail mb-3"
					style={{ height: '300px', width: '100%', objectFit: 'cover' }}
				/>
				<p className="font-italic mark">
					Posted by:
					<Link to={`/user/${posterId}`}> {posterName} </Link>
					on {new Date(post.created).toDateString()}
				</p>
				<p className="card-text">{post.body}</p>

				{isAuthenticated().user && isAuthenticated().user._id === posterId ? (
					<div className="d-inline-block">
						<Link
							to={`/`}
							className="btn btn-raised btn-primary mr-5"
							style={{ backgroundColor: '#FF5E4B', color: 'white' }}
						>
							Return
						</Link>
						<button className="btn btn-raised btn-warning mr-5">
							EDIT POST
						</button>
						<button className="btn btn-raised btn-danger mr-5">
							DELETE POST
						</button>
					</div>
				) : (
					<Link
						to={`/`}
						className="btn btn-raised btn-primary mr-5"
						style={{ backgroundColor: '#FF5E4B', color: 'white' }}
					>
						Return
					</Link>
				)}
			</div>
		);
	};

	render() {
		const { post } = this.state;
		return (
			<div className="container">
				<h2 className="display-2 mt-5 mb-5">{post.title}</h2>
				{this.renderPost(post)}
			</div>
		);
	}
}

export default SinglePost;
