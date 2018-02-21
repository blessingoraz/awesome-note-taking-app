import React, { Component } from 'react';
import axios from 'axios';
import App from './App';
import Note from './note';
import Alert from './alert';

class Login extends Component {
  state = {
    email: null,
    password: null,
    errorMessage: null,
    userData: null,
    showAlert: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    axios.post('https://gentle-castle-94319.herokuapp.com/login', {
      email,
      password
    })
      .then((response) => {
        this.setState({userData: response.data})
      })
      .catch((error) => {
        this.setState({ errorMessage: 'Incorrect Login details', showAlert: true});
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
    if(!this.state.errorMessage && this.state.userData) {
      return <Note userId={this.state.userData._id}/>
    }
    return (
      <div className="App-container">
        <h2 className="App-title">Simple Note App</h2>
        {this.state.showAlert && <Alert message={this.state.errorMessage} handleCancelAlert={this.props.handleCancelAlert}/>}
        <form onSubmit={this.handleSubmit} className='App-form'>
          <div className="App-input">
            <input
              type="text"
              name="email"
              placeholder="EMAIL"
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
            <input type='submit' value='Login' style={{backgroundColor:'#E4A07A', color: '#fff'}} />
          </div>
        </form>
        <p onClick={this.props.showLogin} style={{fontSize: '12px', color: '#3C211C'}}>If you are not registered, sign up here</p>
      </div>
    );
  }
}

export default Login;
