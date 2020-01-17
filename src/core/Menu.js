import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signOut, isAuthenticated } from '../auth/Auth';

const isActive = (history, path) => {
	if (history.location.pathname === path) return { color: '#FF5E4B' };
	else return { color: '#000000' };
};

const Menu = props => (
	<div>
		<ul className="nav nav-tabs bg-light">
			<li className="nav-item">
				<Link className="nav-link" style={isActive(props.history, '/')} to="/">
					Home
				</Link>
			</li>
			<li className="nav-item">
				<Link
					className="nav-link"
					style={isActive(props.history, '/users')}
					to="/users"
				>
					Users
				</Link>
			</li>
			{!isAuthenticated() && (
				</*This is react fragments*/>
					<li className="nav-item">
						<Link
							className="nav-link"
							style={isActive(props.history, '/signin')}
							to="/signin"
						>
							Sign In
						</Link>
					</li>
					<li className="nav-item">
						<Link
							className="nav-link"
							style={isActive(props.history, '/signup')}
							to="/signup"
						>
							Sign Up
						</Link>
					</li>
				</>
			)}
			{isAuthenticated() && isAuthenticated().user.role === 'admin' && (
				<li className="nav-item">
					<Link
						to={`/admin`}
						style={isActive(props.history, `/admin`)}
						className="nav-link"
					>
						Admin
					</Link>
				</li>
			)}

			{isAuthenticated() && (
				<>
					<li className="nav-item">
						<Link
							className="nav-link"
							style={isActive(
								props.history,
								`/user/${isAuthenticated().user._id}`
							)}
							to={`/user/${isAuthenticated().user._id}`}
						>
							{`${isAuthenticated().user.name}'s Profile`}
						</Link>
					</li>

					<li className="nav-item">
						<Link
							className="nav-link"
							style={isActive(props.history, `/findpeople`)}
							to={`/findpeople`}
						>
							WHO TO FOLLOW
						</Link>
					</li>

					<li className="nav-item">
						<Link
							className="nav-link"
							style={isActive(props.history, `/post/create`)}
							to={`/post/create`}
						>
							CREATE POST
						</Link>
					</li>

					<li className="nav-item">
						<a
							href="/"
							className="nav-link"
							style={isActive(props.history, '/signout', {
								color: '#000000'
							})}
							onClick={() =>
								signOut(() => {
									props.history.push('/');
								})
							}
						>
							Sign out
						</a>
					</li>
				</>
			)}
		</ul>
	</div>
);

export default withRouter(Menu);
