import React, { Component } from 'react';
import axios from 'axios';

import Login from './login';
import Note from './note';
import '../styles/App.css';

class App extends Component {
  state = {
    username: null,
    email: null,
    password: null,
    userId: null
  };

  getId = (id) => {
    this.setState({ userId: id })
  }

  handleSubmit = (e) => {
    const { username, email, password } = this.state;
    e.preventDefault();
    axios.post('https://gentle-castle-94319.herokuapp.com/user', {
      username,
      email,
      password
    })
      .then((response) => {
        this.getId(response.data._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleOnChange = (target) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    // console.log('this.state.userId', this.state.userId);
    // if (this.state.userId) {
      return <Note />
    // }
    // return (
    //   <form onSubmit={this.handleSubmit} className='app'>
    //     username: <input type="text" name="username" onChange={(e) => this.handleOnChange(e.target)} />
    //     Email: <input type="text" name="email" onChange={(e) => this.handleOnChange(e.target)} />
    //     Password: <input type="password" name="password" onChange={(e) => this.handleOnChange(e.target)} />
    //     <input type='submit' value='Sign in' />
    //   </form>
    // );
  }
}

export default App;
