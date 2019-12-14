import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import {signOut, isAuthenticated} from '../auth/Auth'

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

        {!isAuthenticated() && (
        </*This is react fragments*/>
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
        </>
        )}

        {isAuthenticated() && (
            <>
            <li className="nav-item">
              <a 
              className="nav-link"  href= "#/"
              style= { isActive(props.history, "/" , {cursor: "pointer", color: "#000000"})}
              onClick = {() => signOut(() => {props.history.push('/')})} >
                  Sign out
              </a>
            </li>

            <li className="nav-item">
                <a className="nav-link" href="#/">
                    {isAuthenticated().user.name}
                </a>
            </li>
            </>
        )}
      
        </ul>
    </div>

);

export default withRouter(Menu);

