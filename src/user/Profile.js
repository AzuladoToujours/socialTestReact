import React, { Component } from 'react';
import { isAuthenticated } from '../auth/Auth';
import { Redirect, Link } from 'react-router-dom';
import { getInfo } from './apiUser';
import DefaultProfile from '../images/avatar.jpg';
import DeleteUser from './DeleteUser';

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			user: '',
			redirectToSignIn: false
		};
	}

	//Checks if the user is authenticated, if it's not, we redirect to signin changing the state to true
	isAuth = userId => {
		const token = isAuthenticated().token;
		getInfo(userId, token).then(data => {
			if (data.error) {
				this.setState({ redirectToSignIn: true });
			} else {
				this.setState({ user: data });
			}
		});
	};

	componentDidMount() {
		const userId = this.props.match.params.userId;
		this.isAuth(userId);
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
		const photoUrl = user._id
			? `${process.env.REACT_APP_API_URL}/user/photo/${
					user._id
			  }?${new Date().getTime()}`
			: DefaultProfile;

		return (
			<div className="container">
				<h2 className="mt-5 mb-5">PROFILE</h2>
				<div className="row">
					<div className="col-md-6">
						<img
							style={{ height: '200px', width: 'auto' }}
							className="image-thumbnail"
							src={photoUrl}
							onError={i => (i.target.src = `${DefaultProfile}`)}
							alt={user.name}
						/>
					</div>

					<div className="col-md-6">
						<div className="lead mt-2">
							<p> {`${user.name}'s Profile`}</p>
							<p> {`Email: ${user.email}`}</p>
							<p>{`Joined ${new Date(user.created).toDateString()}`}</p>
						</div>
						{isAuthenticated().user && isAuthenticated().user._id === user._id && (
							<div className="d-inline-block">
								<Link
									className="btn btn-raised btn-success mr-5"
									to={`/user/edit/${user._id}`}
								>
									EDIT PROFILE
								</Link>
								<DeleteUser userId={user._id} />
							</div>
						)}
					</div>
				</div>
				<div className="row">
					<div className="col md-12 mt-5 mb-5">
						<hr />
						<p className="lead">{user.about}</p>
						<hr />
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;
