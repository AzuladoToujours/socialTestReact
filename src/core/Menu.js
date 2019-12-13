import React from 'react'
import {Link, withRouter} from 'react-router-dom';

const isActive = (history, path) => {
    if(history.location.pathname === path)  return {color: "#FF5E4B"}
        else return {color: "#000000"}
}


const Menu = (props) => (
    <div>
       <ul className="nav nav-tabs bg-light">
        <li className="nav-item">
            <Link className="nav-link" style= {isActive(props.history, "/")} to = "/">
                Home
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" style= {isActive(props.history, "/signin")} to = "/signin">
                Sign In
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" style= {isActive(props.history, "/signup")} to = "/signup">
                Sign Up
            </Link>
        </li>
        </ul>
    </div>

);

export default withRouter(Menu);

