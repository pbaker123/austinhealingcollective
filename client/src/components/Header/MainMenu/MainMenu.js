import React, { Component } from "react";
import "./MainMenu.css";
import API from "../../../utils/API";

class MainMenu extends Component {
  state = {
    practitioners: [],
    services: {
      healings: [],
      gridings: [],
      readings: [],
      meditations: []
    },
    classes: []
  };

  componentDidMount() {
    this.loadPractitioners();
    this.loadServices();
  };

  loadPractitioners = () => {
    API.get('/practitioneraccounts')
      .then(res => {
        this.setState({ 
          practitioners: res.data 
        })
      })
      .catch(err => console.log(err));
  };


  loadServices = () => {
    API.get('/servicelist')
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].category === "healing") {
            this.state.services.healings.push(res.data[i]);
          } else if (res.data[i].category === "griding") {
            this.state.services.gridings.push(res.data[i]);
          } else if (res.data[i].category === "reading") {
              this.state.services.readings.push(res.data[i]);
          } else if (res.data[i].category === "meditation") {
              this.state.services.meditations.push(res.data[i])
          } else if(res.data[i].category === "class") {
              this.state.classes.push(res.data[i]);
          };
        };
      })
      .catch(err => console.log(err));
  };

 
  render() {
    return (
      <nav id="primary_nav_wrap">
        <ul>
          <li>
            <a onClick={
              () => this.props.passStateUp({
                currentPage: "Home"
              })
            }>
              Home
            </a>
          </li>

          <li>
            <a onClick={
              () => this.props.passStateUp({
                currentPage: "Practitioners"
              })
            }>
              Practitioners 
              <i className="fa fa-caret-down"></i>
            </a>
            <ul>
              {this.state.practitioners.map( (practitioner) => {
                return (
                  <li key={practitioner._id}>
                    <a 
                      onClick={() => this.props.passStateUp({
                        currentPage: "Practitioner"
                      })} 
                      data-id={practitioner._id}>
                      {practitioner.firstName} {practitioner.lastName}
                    </a>
                  </li>
                )
              })}      
            </ul>
          </li>

          <li>
            <a onClick={
              () => this.props.passStateUp({
                currentPage: "Services"
              })
            }>
              Services 
              <i className="fa fa-caret-down"></i>
            </a>
            <ul>
              {this.state.services.healings.length ? (
                <li>
                  <a onClick={
                    () => this.props.passStateUp({
                      currentPage: "Healings"
                    })
                  }>
                    Healings
                    <i className="fas fa-caret-right"></i>
                  </a>
                  <ul>
                    {this.state.services.healings.map( (healing) => {
                      return ( 
                        <li key={healing._id}>
                          <a 
                            onClick={() => this.props.passStateUp({
                              currentPage: "Healing"
                            })} 
                            data-id={healing._id}>
                            {healing.serviceName}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </li>  
                ) : ("")
              } 
                        
              {this.state.services.gridings.length ? (
                <li>
                  <a onClick={
                    () => this.props.passStateUp({
                      currentPage: "Gridings"
                    })
                  }>
                    Gridings
                    <i className="fa fa-caret-right"></i>
                  </a>
                  <ul>
                    {this.state.services.gridings.map( (griding) => {
                      return ( 
                        <li key={griding._id}>
                          <a 
                            onClick={() => this.props.passStateUp({
                              currentPage: "Griding"
                            })} 
                            data-id={griding._id}>
                            {griding.serviceName}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </li>  
                ):("")
              }
            
              {this.state.services.readings.length ? (
                <li>
                  <a onClick={
                    () => this.props.passStateUp({
                      currentPage: "Readings"
                    })
                  }>
                    Readings
                    <i className="fas fa-caret-right"></i>
                  </a>
                  <ul>
                    {this.state.services.readings.map( (reading) => {
                      return (
                        <li key={reading._id}>
                          <a 
                            onClick={() => this.props.passStateUp({
                              currentPage: "Reading"
                            })} 
                            data-id={reading._id}>
                            {reading.serviceName}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </li>  
                ):("")
              }

              {this.state.services.meditations.length ? (
                <li>
                  <a onClick={
                    () => this.props.passStateUp({
                      currentPage: "Meditations"
                    })
                  }>
                    Meditations
                    <i className="fas fa-caret-right"></i>
                  </a>
                  <ul>
                    {this.state.services.meditations.map( (meditation) => {
                      return (
                        <li key={meditation._id}>
                          <a 
                            onClick={() => this.props.passStateUp({
                              currentPage: "Meditation"
                            })} 
                            data-id={meditation._id}>
                            {meditation.serviceName}
                            </a></li>
                      )
                    })}
                  </ul>
                </li>  
                ):("")
              }
            </ul>
          </li>
          <li>
            <a onClick={
              () => this.props.passStateUp({
                currentPage: "Classes"
              })
            }>
              Classes 
              <i className="fa fa-caret-down"></i>
            </a>
            <ul>
              {this.state.classes.map( (classService) => {
                return (
                  <li key={classService._id}>
                    <a 
                      onClick={() => this.props.passStateUp({
                        currentPage: "Class"
                      })} 
                      data-id={classService._id}>
                      {classService.firstName} {classService.lastName}
                    </a>
                  </li>
                )
              })}      
            </ul>
          </li>                  
        </ul>

      </nav>
    );
  };
};

export default MainMenu;