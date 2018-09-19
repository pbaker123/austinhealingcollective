import React, { Component } from "react";
import "./UserMenu.css";
import API from "../../../utils/API.js";

class UserMenu extends Component {
  
  logout = () => {
    API
      .get('/logout')
      .then(this.props.passStateUp({
        loggedIn: false,
        currentPage: "Home"
      }))
  }

  render() {
    return (
      <nav id="secondary_nav_wrap">
        <ul>
          {this.props.state.accountStatus === "admin" ? (
            <li>
              <a>
                Manage <i className="fa fa-caret-down"></i>
              </a>
              <ul>
                <li>
                  <a onClick={
                    () => this.props.passStateUp({
                      currentPage: "ManageServices"
                    })
                  }>
                    Services
                  </a>
                </li>
                <li>
                  <a onClick={
                    () => this.props.passStateUp({
                      currentPage: "UserAccounts"
                    })
                  }>
                    User Accounts
                  </a>
                </li>
              </ul>
            </li>
          ) : ( 
            ""
          )}

          {this.props.state.accountStatus === "admin" || this.props.state.accountStatus === "provider" ? (
            <li>
              <a onClick={
                () => this.props.passStateUp({
                  currentPage: "AddService"
                })
              }>
                Add Service
              </a>
            </li>
          ) : (
            ""
          )}         

          <li>
            <a onClick={
              () => this.props.passStateUp({
                currentPage: "Profile"
              })
            }>
              Profile
            </a>
          </li>
          <li>
            <a onClick={() => this.logout()}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default UserMenu;