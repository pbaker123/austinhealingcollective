import React, { Component } from "react";
import "./Hamburger.css";

class Hamburger extends Component {
  
  toggleClass = () => {
    if (!document.querySelector(".icon").classList.contains("active")) this.openNav();
    if (document.querySelector(".icon").classList.contains("active"))this.closeNav();
    document.querySelector(".icon").classList.toggle("active");
  }

  openNav = () => {
    document.querySelector(".sidenav").style.width = "370px";
  }

  closeNav = () => {
    document.querySelector(".sidenav").style.width = "0px";
  }

  render() {
    return (
      <div 
        className="icon titlebar-hamburger" 
        onClick={this.toggleClass}>
        <div 
          className="hamburger">
        </div>
      </div>

    );
  }
}

export default Hamburger;