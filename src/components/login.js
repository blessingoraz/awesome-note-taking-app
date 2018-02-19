import React, { Component } from 'react'
import axios from 'axios';

class Login extends Component {
  state = {
    email: null,
    password: null
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password)
    axios.post('https://gentle-castle-94319.herokuapp.com/login', {
      email,
      password
    })
      .then((response) => {
        console.log('response ===', response)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleOnChange = (target) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='app'>
        Email: <input type="text" name="email" onChange={(e) => this.handleOnChange(e.target)} />
        Password: <input type="password" name="password" onChange={(e) => this.handleOnChange(e.target)} />
        <input type='submit' value='Sign in' />
      </form>
    );
  }
}

export default Login;
