import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer";
import BodyContainer from "../Pages/BodyContainer";

class AppContainer extends Component {
  state = {
    loggedIn: false,
    currentPage: "Home"
  }

  passStateUp = state => {
    this.setState(state);
  };

  
  
  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div>
        <div className="app-container">
          <Header 
            passStateUp={this.passStateUp}
            state={this.state} />
          <BodyContainer 
            passStateUp={this.passStateUp} 
            state={this.state} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default AppContainer;