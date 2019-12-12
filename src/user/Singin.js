import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'


class Signin  extends Component {

    //The info will be managed in the state
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        }
    }

    //Method to trate the info of the inputs...

    handleChange = (name) => (event) => {
        this.setState({error: ""})
        this.setState({[name]: event.target.value })
    }

    authenticate  (jwt, next) {
        //typeof operator, window object...
        if (typeof window !== "undefined"){
            //name of the item, and the value
            localStorage.setItem('jwt' , JSON.stringify(jwt))
            //When the user authenticates, next get executed, so redirect becomes true
            next();
        }
    }
    
    //With the event onChange we'll know what changes has been made, then pass it through the method 
    //handleChange to get the info.
    //The value is to change the state immediately

    clickSubmit = event => {
        //This method prevent the refresh of the browser
        event.preventDefault();
        this.setState({loading: true})
        const {email, password} = this.state
        const user = {
            email,
            password
        };

        this.signin(user)
        .then(data => {
            if(data.error){
                this.setState({error : data.error, loading:false});
            } 
                else {
                    // authenticate user
                    this.authenticate(data, () => {
                        this.setState({redirectToReferer: true})
                    });
                    
                }
        });
    };

    signin = (user) => {
        //To make the POST request, we can use axios, but we will use fetch...
        return fetch("http://localhost:8080/signin", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-type": 'application/json' 
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            //We use this method to show what the backend shows... like "Name required"
            return response.json()
        })
        .catch(err => console.log(err))
    }

    signInForm = (email, password) => (
        <form>
            
            <div className = 'form-group'>
                <label className = 'text-muted'>Email</label>
                <input onChange = {this.handleChange('email')} type = 'email' className = 'form-control' value = {email}/>
            </div>

            <div className = 'form-group'>
                <label className = 'text-muted'>Password</label>
                <input onChange = {this.handleChange('password')} type = 'password' className = 'form-control' value = {password}/>
            </div>
            <button onClick = {this.clickSubmit} className = 'btn btn raised btn-primary'>
                SIGN IN
            </button>
        </form>
    )

    render() {
        const {email, password, error, redirectToReferer, loading} = this.state;

        if (redirectToReferer){
            return <Redirect to = '/'/>
        }
       return ( 
        <div className = 'container'>
            <h2 className = 'mt-5 mb-5'>SIGN IN</h2>

            <div className = 'alert alert-danger' style = {{display: error ? "" : "none"}}>
                {error}
            </div>

            {loading ? <div className= "jumbotron text-center"><h2>LOADING...</h2></div>: ""}
        
            {this.signInForm(email, password)}
            
        </div>
        );
    };
}
       

export default Signin;

