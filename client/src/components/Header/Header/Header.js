import React, { Component } from "react";
import "./Header.css";
import Logo from "../../../images/austincollectivesmall.png";
import Hamburger from "../Hamburger";
import MainMenu from "../MainMenu";
import UserMenu from "../UserMenu";
import LoginMenu from "../LoginMenu";
import SideNav from "../SideNav";

class Header extends Component {

  passStateUp = state => {
    this.props.passStateUp(state);
  };
  
  render() {
    return (
      <div className="titlebar-container">
      	<div className="titlebar-title h2">
      		Austin Healing Collective
    		</div>
    		<img src={Logo} className="titlebar-image" alt="Austin Healing Collective" />
				<Hamburger />
				<div className="titlebar-subtitle h4">
					Transform your life
				</div>
        <div className="titlebar-border">
        </div>
        <div className="titlebar-large-nav titlebar-menu"> 
          <MainMenu 
            passStateUp={this.passStateUp} />
        </div>

        <div className="titlebar-large-nav titlebar-usermenu">  
        {this.props.state.loggedIn ? (
          <UserMenu 
            passStateUp={this.passStateUp}
            state={this.props.state} />
          ) : (
          <LoginMenu 
            passStateUp={this.passStateUp} />
          )
        }
        </div>
        <SideNav 
          passStateUp={this.passStateUp} 
          state={this.props.state}/>
      </div>
    );
  }
}

export default Header;
