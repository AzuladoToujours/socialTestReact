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

const MainRouter = () => (
	<div>
		<Menu />
		<Switch>
			<Route exact path="/" component={Home}></Route>
			<Route exact path="/users" component={Users}></Route>
			<Route exact path="/Signup" component={Signup}></Route>
			<Route exact path="/Signin" component={Signin}></Route>
			<Route exact path="/user/:userId" component={Profile}></Route>
			<PrivateRoute exact path="/user/edit/:userId" component={EditUser} />
		</Switch>
	</div>
);

export default MainRouter;
