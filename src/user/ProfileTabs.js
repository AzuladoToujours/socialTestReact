import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class ProfileTabs extends Component {
	render() {
		const { following, followers, posts } = this.props;
		return (
			<div>
				<div className="row">
					<div className="col-md-4">
						<h3 className="text" style={{ color: '#FF7075' }}>
							Followers
						</h3>
						<hr />
						{followers.map((follower, i) => (
							<div key={i}>
								<div>
									<Link
										to={`/user/${follower._id}`}
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
											src={`${process.env.REACT_APP_API_URL}/user/photo/${follower._id}`}
											alt={follower.name}
										/>
										<div>
											<p className="lead" style={{ color: '#FF5E4B' }}>
												{follower.name}
											</p>
										</div>
									</Link>
								</div>
							</div>
						))}
					</div>

					<div className="col-md-4">
						<h3 className="text" style={{ color: '#FF7075' }}>
							Following
						</h3>
						<hr />
						{following.map((follow, i) => (
							<div key={i}>
								<div>
									<Link to={`/user/${follow._id}`} style={{ color: '#FF5E4B' }}>
										<img
											style={{
												borderRadius: '100%',
												border: '2px solid',
												borderColor: '#FF5E4B'
											}}
											className="float-left mr-2"
											height="40px"
											width="40px"
											src={`${process.env.REACT_APP_API_URL}/user/photo/${follow._id}`}
											alt={follow.name}
										/>
										<div>
											<p className="lead" style={{ color: '#FF5E4B' }}>
												{follow.name}
											</p>
										</div>
									</Link>
								</div>
							</div>
						))}
					</div>

					<div className="col-md-4">
						<h3 className="text" style={{ color: '#FF7075' }}>
							Posts
						</h3>
						<hr />
						{posts.map((post, i) => (
							<div key={i}>
								<div>
									<Link to={`/post/${post._id}`} style={{ color: '#FF5E4B' }}>
										<div>
											<p className="lead" style={{ color: '#FF5E4B' }}>
												{post.title}
											</p>
										</div>
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default ProfileTabs;
