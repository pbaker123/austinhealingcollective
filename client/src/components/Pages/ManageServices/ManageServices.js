import React, { Component } from "react";
import "./ManageServices.css";
import API from "../../../utils/API.js";


class ManageServices extends Component {
  
  state = {
    approved: [],
    unapproved: [],
    scrapped: [],
    temp: "unapproved"
  }

  componentDidMount() {
    this.loadServices();
  };

  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;
    this.setState({[name]: value});
  };

  loadServices = () => {
    API
    	.get('/allservices')
      .then(res => this.setState(res.data))
      .catch(err => console.log(err));
  };

  deleteService = (service) => {
    API
    	.delete('/deleteservice', service.service._id)
      .then(() => this.loadServices())
      .catch(err => console.log(err));
  };

  updateService = (service) => {
    var update = {
    	lastUpdateBy: this.props.state.userData._id,
    	status: this.state.temp
    };
    API
    	.update('/updateservice', service.service._id, update)
    	.then(() => this.loadServices())
    	.catch(err => console.log(err));
  };

  editService = (service) => {
    var update = JSON.parse(JSON.stringify(this.state));
 		delete update.approved;
 		delete update.unapproved;
 		delete update.scrapped;
 		delete update.temp;
 		API
 			.update('/updateservice', service.service._id, update)
    	.then(() => this.loadServices())
    	.catch(err => console.log(err));
  };


  
  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div className="ms-container">
        {this.state.approved.length > 0 ? (
          <div className="ms-approved">
            <div className="ms-approved-title">
              <h3>Approved Services</h3>       
            </div>
            <div className="ms-approved-flexbox">
              {this.state.approved.map((service) => {
                return (
                  <div key={service._id}>
                    <img src={service.imageSrc} />
                    <p className="user-name h4">
                      {service.serviceName}
                    </p>
                    <p>
                      {service.shortDescription}
                    </p>
                    <p>
                      {service.longDescription}
                    </p>
                    
                    <form id="account-status">
                      <select 
                        name="serviceStatus" 
                        defaultValue={service.status}
                        onChange={(event) => this.setState({temp: event.target.value})}>
                        <option value="approved">Approved</option>
                        <option value="unapproved">Unapproved</option>
                      </select>
                      <input
                        onClick={() => this.updateService({service})}
                        type="button" 
                        value="Update" 
                        />
                    </form>
                  </div>
                )
              })}
            </div>
          </div>
          ) : (
          ""
        )}

        {this.state.unapproved.length > 0 ? (
          <div className="ms-unapproved">
            <div className="ms-unapproved-title">
              <h3>Unapproved Services</h3>       
            </div>
            <div className="ms-unapproved-flexbox">
              {this.state.unapproved.map((service) => {
                return (
                  <div key={service._id}>
                  	<form id="service-update">
                  		<label htmlFor="serviceName">
		                    Service Name: 
		                  </label>
                  		<input 
		                    type="text" 
		                    name="serviceName" 
		                    className="placeholder"
		                    placeholder="Sample Class"
		                    defaultValue={service.serviceName}
		                    onChange={this.handleInputChange} />
                    	<label htmlFor="shortDescription">
		                    Short Description (500 Characters Max):
		                  </label>
		                  <textarea 
		                    rows="3"
		                    cols="20"
		                    wrap="hard"
		                    maxLength="500"
		                    name="shortDescription" 
		                    className="placeholder" 
		                    placeholder="500 Characters Maximum" 
		                    defaultValue={service.shortDescription}                
		                    onChange={this.handleInputChange} />
		                  <label htmlFor="longDescription">
			                  Long Description (Unlimited Length):
			                </label>
			                <textarea 
		                    rows="5"
		                    cols="20"
		                    wrap="hard"
		                    name="longDescription" 
		                    className="placeholder" 
		                    placeholder="Unlimited Length"
		                    defaultValue={service.longDescription}               
		                    onChange={this.handleInputChange} />
		                  <label htmlFor="category">
		                    Category:
		                  </label>
		                  <select 
		                    name="category"
		                    defaultValue={service.category}
		                    onChange={(event) => this.setState({category: event.target.value})}>
		                    <option value="healing">Healing</option>
		                    <option value="griding">Griding</option>
		                    <option value="reading">Reading</option>
		                    <option value="meditation">Meditation</option>
		                    <option value="class">Class</option>
		                  </select>
		                  <label htmlFor="imagesrc">
                    		Image URL:
                  		</label>
                  		<input 
		                    type="text" 
		                    name="imageSrc" 
		                    className="placeholder" 
		                    placeholder="Image URL" 
		                    defaultValue={service.imageSrc}
		                    onChange={this.handleInputChange} />
		                    <img src={service.imageSrc} />                
                      <select 
                        name="serviceStatus" 
                        defaultValue={service.status}
                        onChange={(event) => this.setState({status: event.target.value})}>
                        <option value="approved">Approved</option>
                        <option value="unapproved">Unapproved</option>
                        <option value="scrapped">Scrapped</option>
                      </select>
                      <input
                        onClick={() => this.editService({service})}
                        type="button" 
                        value="Update" 
                        />
                    </form>
                  </div>
                )
              })}
            </div>
          </div>
          ) : (
          ""
        )}


         {this.state.scrapped.length > 0 ? (
          <div className="ms-scrapped">
            <div className="ms-scrapped-title">
              <h3>Scrapped Services</h3>       
            </div>
            <div className="ms-scrapped-flexbox">
              {this.state.scrapped.map((service) => {
                return (
                  <div key={service._id}>
                    <p className="service-name h4">
                      {service.serviceName}
                    </p>
                   
                    <form id="account-status">
                      <select 
                        name="serviceStatus" 
                        defaultValue={service.status}
                        onChange={(event) => this.setState({temp: event.target.value})}>
                        <option value="approved">Approved</option>
                        <option value="unapproved">Unapproved</option>
                        <option value="scrapped">Scrapped</option>
                      </select>
                      <input
                        onClick={() => this.updateService({service})}
                        type="button" 
                        value="Update" 
                        />
                    </form>
                    <div 
                      className="delete"
                      onClick={() => this.deleteService({service})}>
                      <i className="fas fa-trash">
                      </i>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          ) : (
          ""
        )}

        

        


        

      </div>
    );
  }
}

export default ManageServices;