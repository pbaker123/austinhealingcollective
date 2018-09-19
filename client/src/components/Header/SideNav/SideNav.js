import React, { Component } from "react";
import "./SideNav.css";
import LoginMenu from "../LoginMenu";
import MainMenu from "../MainMenu";
import UserMenu from "../UserMenu";
import API from "../../../utils/API";


class SideNav extends Component {
	
  passStateUp = state => {
    this.props.passStateUp(state);
  };
  
  render() {
    return (
      <div className="sidenav">
      	<div className="sidenav-menu">
	        <MainMenu 
            passStateUp={this.passStateUp} />
        </div>
        <br />
        
        	{this.props.state.loggedIn ? (
        		<div className="sidenav-usermenu">
              <UserMenu 
                passStateUp={this.passStateUp}
                state={this.props.state} />
            </div>
        	):(
        		<div className="sidenav-buttons">
              <LoginMenu 
                passStateUp={this.passStateUp} />
            </div>
        	)}
    
      </div>
    );
  }
}

export default SideNav;