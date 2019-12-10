import React from 'react'
import Home from './core/Home'
import Signup from './user/Signup'
import {Route, Switch} from 'react-router-dom'

const MainRouter = () => (
    <div>
        <Switch>
            <Route exact path = '/' component = {Home}></Route>
            <Route exact path = '/Signup' component = {Signup}></Route>
        </Switch>
    </div>

);

export default MainRouter;
