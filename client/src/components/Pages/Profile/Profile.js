import React, { Component } from "react";
import "./Profile.css";
import API from "../../../utils/API.js";

class Profile extends Component {
  
  state = {
  };

  componentDidMount() {
    console.log(this.props.state)
  }
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
    API.update('/updateuser', this.props.state.userData._id, this.state)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data)
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

    return (
      <div className="formContainer">
        <form id="user-update">
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="email">
                    Email: 
                  </label>
                </td>
                <td>
                  <input 
                    type="text" 
                    name="email" 
                    className="placeholder"
                    placeholder="email@google.com"
                    defaultValue={this.props.state.userData.email}
                    onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="firstname">
                    First Name:
                  </label>
                </td>
                <td>
                  <input 
                    type="text" 
                    name="firstName" 
                    className="placeholder" 
                    placeholder="First Name"
                    defaultValue={this.props.state.userData.firstName}
                    onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="lastname">
                    Last Name:
                  </label>
                </td>
                <td>
                  <input 
                    type="text" 
                    name="lastName" 
                    className="placeholder" 
                    placeholder="Last Name" 
                    defaultValue={this.props.state.userData.lastName}
                    onChange={this.handleInputChange} />   
                </td>
              </tr>
              <tr>
                <td>         
                  <label htmlFor="password">
                    Password:
                  </label>
                </td>
                <td>
                  <input 
                    type="password" 
                    name="password" 
                    className="placeholder" 
                    placeholder="Password"
                    defaultValue="****************" 
                    onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="imagesrc">
                    Image URL:
                  </label>
                </td>
                <td>
                  <input 
                    type="text" 
                    name="imageSrc" 
                    className="placeholder" 
                    placeholder="Image URL" 
                    defaultValue={this.props.state.userData.imageSrc}
                    onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="about">
                    About:
                  </label>
                </td>
                <td>
                  <textarea 
                    rows="5"
                    cols="20"
                    wrap="hard"
                    name="about" 
                    className="placeholder" 
                    placeholder="About Yourself" 
                    defaultValue={this.props.state.userData.about}
                    onChange={this.handleInputChange} /> 
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input 
                    type="checkbox" 
                    name="emailOptInUpcomingEvents"
                    defaultChecked={this.props.state.userData.emailOptInUpcomingEvents}
                    onClick={this.toggleCheckBox} />
                    <span><b>Upcoming Events</b></span>
                    <p className="subtext h7">Receive emails about upcoming events</p>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input 
                    type="checkbox" 
                    name="emailOptInNewsLetter"
                    defaultChecked={this.props.state.userData.emailOptInNewsLetter}
                    onClick={this.toggleCheckBox} />
                    <span><b>Newsletter</b></span>
                    <p className="subtext h7">Receive our newsletter via email</p>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input 
                    type="button" 
                    value="Update Account" 
                    onClick={this.handleFormSubmit} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default Profile;
