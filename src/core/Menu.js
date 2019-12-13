import React from 'react'
import {Link, withRouter} from 'react-router-dom';

const isActive = (history, path) => {
    if(history.location.pathname === path)  return {color: "#FF5E4B"}
        else return {color: "#000000"}
}

//The reason of next is, we'll use another callback that will redirect the user to another route.
export const signOut = (next) => {

    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
    }
    next()
    return fetch("http://localhost:8080/signout", {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))  
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
        <li className="nav-item">
            <a 
            className="nav-link" 
            style= {isActive(props.history, "/"), {cursor: "pointer", color: "#F1411C"}}
            onClick = {() => signOut(() => {props.history.push('/')})} >
                Sign out
            </a>
        </li>
        </ul>
    </div>

);

export default withRouter(Menu);

