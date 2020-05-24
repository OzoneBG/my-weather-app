import React, { Component } from "react";
import classes from "./Admin.module.css";
import { Link } from "react-router-dom";
import axios from "../../axios-backend";
import { getToken } from "../../service/UserService";

class Admin extends Component {
  state = {
    users: [{ username: "misho" }, { username: "pesho" }],
  };

  componentDidMount() {
    // Call users
    axios.get("/get-users")
    .then((res) => {
        this.setState({users: res.data});
      })
      .catch((err) => {
        alert(err);
      });
  }

  handleDelete = (username) => {
    // Call the backend
    const token = getToken();
    let config = {
      headers: {
        "Auth-Token": token,
      },
    };

    let data = {
      username,
    };

    axios
      .post(`/delete-user`, data, config)
      .then((res) => {
        if (res.data.message === "OK") {
          const users = this.state.users;
          let index = -1;
          for (let i = 0; i < users.length; i++) {
            if (users[i].username === username) {
              index = i;
              break;
            }
          }

          users.splice(index, 1);

          this.setState({ users });
          return
        }
      })
      .catch((err) => {
        alert(err);
      });
    // Delete local copy
  };

  getRows = (users) => {
    const rows = users.map((user, idx) => {
      return (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{user.username}</td>
          <td>
            <Link to="#" onClick={() => this.handleDelete(user.username)}>
              Delete
            </Link>
          </td>
        </tr>
      );
    });

    return rows;
  };

  render() {
    let header = <h2>List of users</h2>;
    if (this.state.users.length === 0) {
      header = <h2>No users to manage.</h2>;
    }

    const rows = this.getRows(this.state.users);

    return (
      <div className={classes.root}>
        {header}
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default Admin;
