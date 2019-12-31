import React from 'react';
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Profile from './user/Profile';
import Users from './user/Users';
import { Route, Switch } from 'react-router-dom';
import EditUser from './user/EditUser';
import PrivateRoute from './auth/PrivateRoute';
import FindPeople from './user/FindPeople';
import NewPost from './post/NewPost';
import SinglePost from './post/SinglePost';

const MainRouter = () => (
	<div>
		<Menu />
		<Switch>
			<Route exact path="/" component={Home}></Route>
			<Route exact path="/users" component={Users}></Route>
			<Route exact path="/Signup" component={Signup}></Route>
			<Route exact path="/Signin" component={Signin}></Route>
			<PrivateRoute exact path="/post/create" component={NewPost} />
			<Route exact path="/post/:postId" component={SinglePost}></Route>
			<PrivateRoute exact path="/user/edit/:userId" component={EditUser} />
			<PrivateRoute exact path="/findpeople" component={FindPeople} />
			<PrivateRoute exact path="/user/:userId" component={Profile} />
		</Switch>
	</div>
);

export default MainRouter;
