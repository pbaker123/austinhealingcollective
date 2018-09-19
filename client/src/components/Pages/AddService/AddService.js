import React, { Component } from "react";
import "./AddService.css";
import API from "../../../utils/API.js";

class AddService extends Component {

  state = {
    category: "healing"
  };

  passStateUp = state => {
    this.props.passStateUp(state);
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
 
  handleFormSubmit = event => {
    event.preventDefault();
    API.post('/newservice', this.state)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data)      
        }
         else {
          this.passStateUp({
            currentPage: "SignInFailed", 
          })
        }
      }).catch(err => {
        console.log(err);
        this.passStateUp({
          currentPage: "SignInFailed", 
          loggedIn: false, 
          
        })
      });    
  };

render() {

    return (
      <div className="formContainer">
        <form id="new-service">
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="serviceName">
                    Service Name: 
                  </label>
                </td>
                <td>
                  <input 
                    type="text" 
                    name="serviceName" 
                    className="placeholder"
                    placeholder="Sample Class"
                    onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="shortDescription">
                    Short Description:
                  </label>
                </td>
                <td>
                  <textarea 
                    rows="5"
                    cols="20"
                    wrap="hard"
                    maxLength="500"
                    name="shortDescription" 
                    className="placeholder" 
                    placeholder="500 Characters Maximum"                    
                    onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="longDescription">
                    Long Description:
                  </label>
                </td>
                <td>
                  <textarea 
                    rows="5"
                    cols="20"
                    wrap="hard"
                    name="longDescription" 
                    className="placeholder" 
                    placeholder="Unlimited Length"                    
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
                    onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="category">
                    Category:
                  </label>
                </td>
                <td>
                  <select 
                    name="category" 
                    onChange={(event) => this.setState({category: event.target.value})}>
                    <option value="healing">Healing</option>
                    <option value="griding">Griding</option>
                    <option value="reading">Reading</option>
                    <option value="meditation">Meditation</option>
                    <option value="class">Class</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input 
                    type="button" 
                    value="Submit Service" 
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

export default AddService;