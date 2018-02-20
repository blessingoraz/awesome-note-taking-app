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
    userId: null,
    showLoginPage: false
  };

  getId = (id) => {
    this.setState({ userId: id });
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

  showLogin = () => {
    this.setState({
      showLoginPage: !this.state.showLoginPage
    })
  }

  render() {
    if (this.state.showLoginPage) {
      return <Login showLogin={this.showLogin} showLoginPage={this.state.showLoginPage} userId={this.state.userId} />
    }
    if (this.state.userId !== null) {
      return <Note userId={this.state.userId} />
    }
    return (
      <div className="App-container">
        <h2 className="App-title">Simple Note App</h2>
        <form onSubmit={this.handleSubmit} className='App-form' >
          <div className="App-input">
            <input
              type="text"
              name="username"
              placeholder="USERNAME"
              onChange={(e) => this.handleOnChange(e.target)} />
          </div>

          <div className="App-input">
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => this.handleOnChange(e.target)} />
          </div>

          <div className="App-input">
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              onChange={(e) => this.handleOnChange(e.target)} />
          </div>

          <div className="App-input">
            <input type='submit' value='Create Account' style={{backgroundColor:'#E4A07A', color: '#fff'}}/>
          </div>
        </form>

        <p onClick={this.showLogin} style={{fontSize: '12px', color: '#3C211C'}}>If you are registered, login here</p>
      </div>
    );
  }
}

export default App;
