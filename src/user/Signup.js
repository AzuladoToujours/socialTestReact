import React, {Component} from 'react'


class Signup  extends Component {

    //The info will be managed in the state
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: ""
        }
    }

    //Method to trate the info of the inputs...

    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value })
    }
    
    //With the event onChange we'll know what changes has been made, then pass it through the method 
    //handleChange to get the info.
    //The value is to change the state immediately

    render() {
        const {name, email, password} = this.state;
       return ( 
        <div className = 'container'>
        <h2 className = 'mt-5 mb-5'>SIGNUP</h2>

        <form>
            <div className = 'form-group'>
                <label className = 'text-muted'>Name</label>
                <input onChange = {this.handleChange('name')} type = 'text' className = 'form-control' value = {name}/>
            </div>

            <div className = 'form-group'>
                <label className = 'text-muted'>Email</label>
                <input onChange = {this.handleChange('email')} type = 'email' className = 'form-control' value = {email}/>
            </div>

            <div className = 'form-group'>
                <label className = 'text-muted'>Password</label>
                <input onChange = {this.handleChange('password')} type = 'password' className = 'form-control' value = {password}/>
            </div>
            <button className = 'btn btn raised btn-primary'>SUBMIT</button>
        </form>
        </div>
        );
    };
}
       

export default Signup;