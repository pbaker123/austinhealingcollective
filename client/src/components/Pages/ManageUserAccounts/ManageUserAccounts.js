import React, { Component } from "react";
import "./ManageUserAccounts.css";
import API from "../../../utils/API.js";


class ManageUserAccounts extends Component {
  
  state = {
    admins: [],
    practitioners: [],
    users: []
  }

  componentDidMount() {
    this.loadUserAccounts();
  };

  loadUserAccounts = () => {
    API.get('/allaccounts')
      .then(res => {
        this.setState(res.data)
      })
      .catch(err => console.log(err));
  };

  deleteUser = (user) => {
    if (user.user._id === "5b89ad1e992f630db065cdcc") return alert("That user can't be deleted");
    API.delete('/deleteuser', user.user._id)
      .then(() => {
        this.loadUserAccounts();
      })
      .catch(err => console.log(err));
  }

  updateUser = (user) => {
    if (user.user._id === "5b89ad1e992f630db065cdcc") return alert("That user can't be updated");
    if (this.state.temp === undefined) return alert("Nothing to update");
    API.update('/updateuser' ,user.user._id, {accountStatus: this.state.temp})
      .then((res) => {
        this.loadUserAccounts();
      })
      .catch(err => console.log(err));
  }


  
  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div className="mua-container">
        {this.state.admins.length > 0 ? (
          <div className="mua-admin">
            <div className="mua-admin-title">
              <h3>Administrators</h3>       
            </div>
            <div className="mua-admin-flexbox">
              {this.state.admins.map((user) => {
                return (
                  <div key={user._id}>
                    <p className="user-name h4">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="user-email">
                      {user.email}
                    </p>
                    <p className="options">
                      <b>
                        Receives:
                      </b>
                    </p>
                    <span className="left">
                      Newsletter: &nbsp;
                      <b>
                        {!user.emailOptInNewsletter ? ("Yes"):("No")}
                      </b>
                    </span>
                    <span className="right">
                      Upcoming Events: &nbsp;
                      <b>
                        {!user.emailOptInNewsletter ? ("Yes"):("No")}
                      </b>
                    </span>
                    <br />
                    <p className="options">
                      <b>
                        User Accout Status:
                      </b>
                    </p>
                    <form id="account-status">
                      <select 
                        name="accoutStatus" 
                        defaultValue={user.accountStatus}
                        onChange={(event) => this.setState({temp: event.target.value})}>
                        <option value="user">User</option>
                        <option value="practitioner">Practitioner</option>
                        <option value="admin">Admin</option>
                      </select>
                      <input
                        onClick={() => this.updateUser({user})}
                        type="button" 
                        value="Update" 
                        />
                    </form>
                    <div 
                      className="delete"
                      onClick={() => this.deleteUser({user})}>
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

        {this.state.practitioners.length > 0 ? (
          <div className="mua-practitioner">
            <div className="mua-practitioner-title">
              <h3>Practitioners</h3>       
            </div>
            <div className="mua-practitioner-flexbox">
              {this.state.practitioners.map((user) => {
                return (
                  <div key={user._id}>
                    <p className="user-name h4">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="user-email">
                      {user.email}
                    </p>
                    <p className="options">
                      <b>
                        Receives:
                      </b>
                    </p>
                    <span className="left">
                      Newsletter: &nbsp;
                      <b>
                        {!user.emailOptInNewsletter ? ("Yes"):("No")}
                      </b>
                    </span>
                    <span className="right">
                      Upcoming Events: &nbsp;
                      <b>
                        {!user.emailOptInNewsletter ? ("Yes"):("No")}
                      </b>
                    </span>
                    <br />
                    <p className="options">
                      <b>
                        User Accout Status:
                      </b>
                    </p>
                    <form id="account-status">
                      <select 
                        name="accoutStatus" 
                        defaultValue={user.accountStatus}
                        onChange={(event) => this.setState({temp: event.target.value})}>
                        <option value="user">User</option>
                        <option value="practitioner">Practitioner</option>
                        <option value="admin">Admin</option>
                      </select>
                      <input
                        onClick={() => this.updateUser({user})}
                        type="button" 
                        value="Update" 
                        />
                    </form>
                    <div 
                      className="delete"
                      onClick={() => this.deleteUser({user})}>
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

        {this.state.users.length > 0 ? (
          <div className="mua-user">
            <div className="mua-user-title">
              <h3>Users</h3>       
            </div>
            <div className="mua-user-flexbox">
              {this.state.users.map((user) => {
                return (
                  <div key={user._id}>
                    <p className="user-name h4">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="user-email">
                      {user.email}
                    </p>
                    <p className="options">
                      <b>
                        Receives:
                      </b>
                    </p>
                    <span className="left">
                      Newsletter: &nbsp;
                      <b>
                        {!user.emailOptInNewsletter ? ("Yes"):("No")}
                      </b>
                    </span>
                    <span className="right">
                      Upcoming Events: &nbsp;
                      <b>
                        {!user.emailOptInNewsletter ? ("Yes"):("No")}
                      </b>
                    </span>
                    <br />
                    <p className="options">
                      <b>
                        User Accout Status:
                      </b>
                    </p>
                    <form id="account-status">
                      <select 
                        name="accoutStatus" 
                        defaultValue={user.accountStatus}
                        onChange={(event) => this.setState({temp: event.target.value})}>
                        <option value="user">User</option>
                        <option value="practitioner">Practitioner</option>
                        <option value="admin">Admin</option>
                      </select>
                      <input
                        onClick={() => this.updateUser({user})}
                        type="button" 
                        value="Update" 
                        />
                    </form>
                    <div 
                      className="delete"
                      onClick={() => this.deleteUser({user})}>
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

export default ManageUserAccounts;
