import React, { Component } from "react";
import "./SignIn.css";
import API from "../../../utils/API.js";

class SignIn extends Component {
  // Setting the component's initial state
  state = {
    email: "",
    password: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    if (name === "password") {
      value = value.substring(0, 15);
    }
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  passStateUp = state => {
    this.props.passStateUp(state)
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.email) {
      alert("Fill out your email!");
    } 
    API.post("/signin", this.state)
      .then(res => {
        if (res.status === 200) {
          this.passStateUp({
            currentPage: "Home", 
            loggedIn: true, 
            accountStatus: res.data[0].accountStatus,
            userData: res.data[0]
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
            type="button" 
            value="Log In" 
            onClick={this.handleFormSubmit}/>
        </form>
      </div>
    );
  }
}

export default SignIn;
