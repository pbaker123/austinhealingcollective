import React, { Component } from "react";
import "./BodyContainer.css";
import Home from "../Home";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import ManageUserAccounts from "../ManageUserAccounts";
import Profile from "../Profile";
import AddService from "../AddService";
import ManageServices from "../ManageServices";

class BodyContainer extends Component {

  passStateUp = state => {
    this.props.passStateUp(state);
  };

  renderPage = () => {
    switch(this.props.state.currentPage) {
      case "SignIn":
        return (
          <SignIn 
            passStateUp={this.passStateUp} />
        );
      case "SignUp":
        return (
          <SignUp 
            passStateUp={this.passStateUp} />
        );
      case "UserAccounts":
        return <ManageUserAccounts />;
      case "Profile":
        return (
          <Profile 
            passStateUp={this.passStateUp}
            state={this.props.state} />
        );
      case "AddService":
        return (
          <AddService 
            passStateUp={this.passStateUp} />
        );
      case "ManageServices":
        return (
          <ManageServices 
            passStateUp={this.passStateUp}
            state={this.props.state} />
        )
      


      case "Home":
        return <Home />;
      default:
        return <SignIn passStateUp={this.passStateUp} />;

      case "Practitioners":
        return <p>Practitioners</p>;
      case "Practitioner":
        return <p>Practitioner</p>;
      case "Services":
        return <p>Services</p>;
      case "Healings":
        return <p>Healings</p>;
      case "Healing":
        return <p>Healing</p>;
      case "Gridings":
        return <p>Gridings</p>;
      case "Griding":
        return <p>Griding</p>;
      case "Readings":
        return <p>Readings</p>;
      case "Reading":
        return <p>Reading</p>;
      case "Meditations":
        return <p>Meditations</p>;
      case "Meditation":
        return <p>Meditation</p>;
      case "Classes":
        return <p>Classes</p>;
      case "Class":
        return <p>Class</p>;
      
      
      
      case "Logout":
        return <p>Logout</p>;
      case "SignInFailed":
        return <p>Failed</p>;
      
    }
  
  };

 
  render() {

    return (
      <div className="body-container">
        {this.renderPage()}
      </div>
    );
  };
};

export default BodyContainer;