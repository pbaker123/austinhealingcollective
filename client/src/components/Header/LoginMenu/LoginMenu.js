import React, { Component } from "react";
import "../UserMenu/UserMenu.css";
import BodyContainer from "../../Pages/BodyContainer";

class LoginMenu extends Component {
  

  render() {
    return (
       <nav id="secondary_nav_wrap">
        <ul>
          
          <li>
            <a onClick={
              () => this.props.passStateUp({
                currentPage: "SignIn"
              })
            }>
              Sign In
            </a>
          </li>
          <li>
            <a onClick={
              () => this.props.passStateUp({
                currentPage: "SignUp"
              })
            }>
              Sign Up
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default LoginMenu;