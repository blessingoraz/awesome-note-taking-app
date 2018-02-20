import React, { Component } from 'react';
import axios from 'axios';
import App from './App';
import Note from './note';

class Login extends Component {
  state = {
    email: null,
    password: null,
    error: null,
    message: null
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    axios.post('https://gentle-castle-94319.herokuapp.com/login', {
      email,
      password
    })
      .then((response) => {
        this.setState({message: response.data.message})
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
    if (!this.props.showLoginPage) {
      return <App showLogin={this.showLogin} />
    }
    if(!this.state.error && this.state.message) {
      return <Note userId={this.props.userId}/>
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit} className='app'>
          Email: <input type="text" name="email" onChange={(e) => this.handleOnChange(e.target)} />
          Password: <input type="password" name="password" onChange={(e) => this.handleOnChange(e.target)} />
          <input type='submit' value='Sign in' />
        </form>
        <p onClick={this.props.showLogin}>If you are not registered, sign up here</p>
      </div>
    );
  }
}

export default Login;
