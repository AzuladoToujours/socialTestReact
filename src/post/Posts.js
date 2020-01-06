import React, { Component } from 'react';
import { listPosts } from './apiPost';
import { Link } from 'react-router-dom';

class Posts extends Component {
	constructor() {
		super();
		this.state = {
			posts: []
		};
	}

	//When the component mounts, we use the method listPosts in the apiPost to get the list of posts...
	componentDidMount() {
		listPosts().then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({ posts: data });
			}
		});
	}

	//method to render posts, when the post has no photo, we use the method onError to change the style to none.
	renderPosts = posts => {
		return (
			<div className="row">
				{posts.map((post, i) => {
					const posterId = post.postedBy._id;
					const posterName = post.postedBy.name;

					return (
						<div className="card col-md-4" key={i}>
							<img
								className="image-thumbnail"
								src={`${process.env.REACT_APP_API_URL}/post/photo/${
									post._id
								}?${new Date().getTime()}`}
								style={{ width: '100%', height: '200px' }}
								alt={post.title}
								onError={i => ((i.target.style = 'none'), (i.target.alt = ''))}
							/>

							<div className="card-body">
								<h5 className="card-title">{post.title}</h5>
								<p className="card-text">{post.body.substring(0, 100)}</p>
								<p className="font-italic mark">
									Posted by:
									<Link to={`/user/${posterId}`}> {posterName} </Link>
									on {new Date(post.created).toDateString()}
								</p>
								<Link
									to={`/post/${post._id}`}
									className="btn btn-raised btn-primary btn-sm"
									style={{ backgroundColor: '#FF5E4B', color: 'white' }}
								>
									Read More
								</Link>
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	render() {
		const { posts } = this.state;
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">POSTS</h2>
				{this.renderPosts(posts)}
			</div>
		);
	}
}

export default Posts;
