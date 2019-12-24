import React, { Component } from 'react';
import { isAuthenticated } from '../auth/Auth';
import { Redirect, Link } from 'react-router-dom';
import { getInfo } from './apiUser';
import FollowProfileButton from './FollowProfileButton';
import DeleteUser from './DeleteUser';
import ProfileTabs from './ProfileTabs';

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			user: { following: [], followers: [] },
			redirectToSignIn: false,
			isFollowing: false,
			error: ''
		};
	}

	//Checks if the authenticated user (jwt by the isAuthenticated) follows the profile that we're seeing(user)
	checkFollow = user => {
		const jwt = isAuthenticated();
		const match = user.followers.find(follower => {
			//One id has many other ids (Followers) and vice versa
			return follower._id === jwt.user._id;
		});
		return match;
	};

	//Follow button clicked
	clickFollowButton = callApi => {
		const userId = isAuthenticated().user._id;
		const token = isAuthenticated().token;

		callApi(userId, token, this.state.user._id).then(data => {
			if (data.error) {
				this.setState({ error: data.error });
			} else {
				this.setState({ user: data, isFollowing: !this.state.isFollowing });
			}
		});
	};

	//Checks if the user is authenticated, if it's not, we redirect to signin changing the state to true
	isAuth = userId => {
		const token = isAuthenticated().token;
		getInfo(userId, token).then(data => {
			if (data.error) {
				this.setState({ redirectToSignIn: true });
			} else {
				//Get the callback from the checkFollow() then we change the state of isFollowing
				let isFollowing = this.checkFollow(data);
				this.setState({ user: data, isFollowing });
			}
		});
	};

	componentDidMount() {
		const userId = this.props.match.params.userId;
		this.isAuth(userId);
		//The new Date is to get the updated photo
	}

	UNSAFE_componentWillReceiveProps(props) {
		const userId = props.match.params.userId;
		this.isAuth(userId);
	}

	render() {
		const { redirectToSignIn, user } = this.state;

		if (redirectToSignIn) {
			return <Redirect to="/signin" />;
		}

		//The new Date is to get the updated photo
		const photoUrl = `${process.env.REACT_APP_API_URL}/user/photo/${
			user._id
		}?${new Date().getTime()}`;

		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Profile</h2>
				<div className="row">
					<div className="col-md-6">
						<img
							style={{ height: '200px', width: 'auto' }}
							className="image-thumbnail"
							src={photoUrl}
							alt={user.name}
						/>
					</div>

					<div className="col-md-6">
						<div className="lead mt-2">
							<p> {`${user.name}'s Profile`}</p>
							<p> {`Email: ${user.email}`}</p>
							<p>{`Joined ${new Date(user.created).toDateString()}`}</p>
						</div>
						{isAuthenticated().user &&
						isAuthenticated().user._id === user._id ? (
							<div className="d-inline-block">
								<Link
									className="btn btn-raised btn-success mr-5"
									to={`/user/edit/${user._id}`}
								>
									EDIT PROFILE
								</Link>
								<DeleteUser userId={user._id} />
							</div>
						) : (
							<FollowProfileButton
								following={this.state.isFollowing}
								onButtonClick={this.clickFollowButton}
							/>
						)}
					</div>
				</div>
				<div className="row">
					<div className="col md-12 mt-5 mb-5">
						<hr />
						<p className="lead">{user.about}</p>
						<hr />
						<ProfileTabs
							following={user.following}
							followers={user.followers}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;
