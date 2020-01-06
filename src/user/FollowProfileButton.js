import React, { Component } from 'react';
import { follow, unfollow } from './apiUser';

class FollowProfileButton extends Component {
	//Returns the method follow in the apiUser as an argument in the clickFollowButton() in profile component
	followClick = () => {
		this.props.onButtonClick(follow);
	};

	//Returns the method unfollow in the apiUser as an argument in the clickFollowButton() in profile component
	unfollowClick = () => {
		this.props.onButtonClick(unfollow);
	};

	render() {
		return (
			<div className="d-inline-block ">
				{//If the state following is false, we show the button "Follow" and the we execute the followClick()
				!this.props.following ? (
					<button
						onClick={this.followClick}
						className="btn btn-success btn-raised mr-5"
					>
						Follow
					</button>
				) : (
					//If the state following is true, we show the button "Unfollow" and the we execute the followClick()
					<button
						onClick={this.unfollowClick}
						className="btn btn-warning btn-raised "
					>
						Unfollow
					</button>
				)}
			</div>
		);
	}
}

export default FollowProfileButton;
