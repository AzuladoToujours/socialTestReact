import React from "react";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import { Route, Switch } from "react-router-dom";

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/Signup" component={Signup}></Route>
      <Route exact path="/Signin" component={Signin}></Route>
    </Switch>
  </div>
);

export default MainRouter;
