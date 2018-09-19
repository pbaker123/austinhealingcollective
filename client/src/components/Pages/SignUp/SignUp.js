import React, { Component } from "react";
import "../SignIn/SignIn.css";
import API from "../../../utils/API.js";

class SignUp extends Component {
  
  state = {
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    emailOptInUpcomingEvents: false,
    emailOptInNewsLetter: false
  };

  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;
    this.setState({[name]: value});
  };

  toggleCheckBox = event => {
    const name = event.target.name;
    if (!this.state[name]) this.setState({[name]: true})
    else this.setState({[name]: false})
  };

  passStateUp = state => {
    this.props.passStateUp(state)
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.email) {
      alert("Fill out your email!");
    } 
    API.post('/signup', this.state)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          this.passStateUp({
            currentPage: "Home", 
            loggedIn: true, 
            accountStatus: res.data.accountStatus,
            userData: res.data
          })
        } else {
          this.passStateUp({
            currentPage: "SignInFailed", 
            loggedIn: false, 
            accountStatus: ""
          })
        }
      }).catch(err => {
        console.log(err);
        this.passStateUp({
          currentPage: "SignInFailed", 
          loggedIn: false, 
          accountStatus: ""
        })
      });    
  };

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div className="formContainer">
        <form id="signin">
          <label htmlFor="email">
            email
          </label>
          <input 
            type="text" 
            name="email" 
            className="placeholder" 
            placeholder="email@google.com" 
            onChange={this.handleInputChange} />
          <label htmlFor="firstname">
            firstname
          </label>
          <input 
            type="text" 
            name="firstname" 
            className="placeholder" 
            placeholder="First Name" 
            onChange={this.handleInputChange} />   
          <label htmlFor="lastname">
            lastname
          </label>
          <input 
            type="text" 
            name="lastname" 
            className="placeholder" 
            placeholder="Last Name" 
            onChange={this.handleInputChange} />            
          <label htmlFor="password">
            password
          </label>
          <input 
            type="password" 
            name="password" 
            className="placeholder" 
            placeholder="Password" 
            onChange={this.handleInputChange} />
          <input 
            type="checkbox" 
            name="emailOptInUpcomingEvents" 
            value="true" 
            onClick={this.toggleCheckBox} />
            <span><b>Upcoming Events</b></span>
            <p className="subtext h7">Receive emails about upcoming events</p>
          <input 
            type="checkbox" 
            name="emailOptInNewsLetter" 
            value="true"
            onClick={this.toggleCheckBox} />
            <span><b>Newsletter</b></span>
            <p className="subtext h7">Receive our newsletter via email</p>

          <input 
            type="button" 
            value="Log In" 
            onClick={this.handleFormSubmit}/>
        </form>
      </div>
    );
  }
}

export default SignUp;
