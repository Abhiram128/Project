import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import { Form, Button, Row, Col } from 'react-bootstrap';

class LoginUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
    };
  }

  onSubmit(event) {
    event.preventDefault();
    let login = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post('http://localhost:5000/users/login', login)
      .then((res) => {
        let token = res.data.token;
        let username = res.data.user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', username);
        window.location = '/';
      })
      .catch((err) => {
        console.log(err);
        console.error('Could not login user.');
      });
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const loginBoxStyle = {
      backgroundColor: 'rgba(162, 200, 236, 0.2)',
      padding: '20px',
      marginTop: '150px',
      borderRadius: '8px',
      alignitems: 'left',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      width: '400px',
      height: '300px',
      marginRight:'650px'
    };

    const backgroundImageStyle = {
      backgroundImage: `url('https://checkify.com/wp-content/uploads/design-16x9-57.webp')`, // Replace with your background image URL
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      minHeight: '100vh',
      opacity: '1.0',
      position: 'relative',
    };

    const headingStyle = {
      textAlign: 'center',
      marginBottom: '20px',
      color: 'white', // Set the heading text color to white
    };

    const inputTextStyle = {
      color: 'black', // Set the input text color to white
      fontWeight: 'bold', // Make the text bold
      backgroundColor: 'transparent', // Make the input background transparent
      border: 'none', // Remove the input border
      borderBottom: '1px solid white', // Add a white bottom border
      borderRadius: '0', // Remove input border-radius
    };

    const buttonStyle = {
      backgroundColor: 'rgba(162, 200, 286, 0.5)',
      padding: '10px',
      
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  };

    return (
      <div style={backgroundImageStyle}>
        <Row>
          <Col></Col>
          <Col>
            <div style={loginBoxStyle}>
              <h2 style={headingStyle}>Login</h2>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="Username"
                    placeholder="Enter username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    style={inputTextStyle} // Apply the custom styles to the input field
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    style={inputTextStyle} // Apply the custom styles to the input field
                  />
                </Form.Group>
                <Button variant="primary" type="submit" style={buttonStyle}>
                  Login
                </Button>
              </Form>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </div>
    );
  }
}

export default LoginUser;
