import React, { Component } from 'react'
import axios from 'axios';
import Note from './note';

class Login extends Component {
  state = {
    email: null,
    password: null,
    error: null
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    axios.post('https://gentle-castle-94319.herokuapp.com/login', {
      email,
      password
    })
      .then((response) => {
      })
      .catch((error) => {
        this.setState(error);
      });
  }

  handleOnChange = (target) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    // if(!this.state.error) {
    //   return <Note id={this.props.id}/>
    // }
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
