import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

class RegisterUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      email: '',
      password: '',
      successMessage: '',
      errorMessage: '',
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post('http://localhost:5000/users/register', user)
      .then((res) => {
        // Registration successful
        const { message, verificationToken } = res.data;
        this.setState({ successMessage: message, errorMessage: '' });

        // Redirect to a verification page with the verification token
        this.props.history.push(`/verify-email/${verificationToken}`);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 409) {
            // Duplicate email or username error
            this.setState({
              successMessage: '',
              errorMessage: 'Email or username already exists. Please choose a different one.',
            });
          } else {
            // Other server error
            console.error('Could not register user:', error.response.data);
            this.setState({
              successMessage: '',
              errorMessage: 'An error occurred during registration. Please try again later.',
            });
          }
        } else {
          // Network error
          console.error('Network error during registration:', error);
          this.setState({
            successMessage: '',
            errorMessage: 'A network error occurred during registration. Please try again later.',
          });
        }
      });
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const formStyle = {
      backgroundColor: 'rgba(162, 200, 236, 0.2)',
      padding: '20px',
      marginTop: '50px',
      borderRadius: '8px',
      alignItems: 'left',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      width: '400px',
      height: '450px',
      marginRight: '650px',
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

    const buttonStyle = {
      backgroundColor: 'rgba(162, 200, 286, 0.5)',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    };

    const headingStyle = {
      textAlign: 'center',
      marginBottom: '20px',
      color: 'white', // Set the heading text color to white
      fontWeight: '', // Make the heading text bold
    };

    const inputTextStyle = {
     // color: 'white', // Set the input text color to white
      fontWeight: 'bold', // Make the text bold
     // backgroundColor: 'transparent', // Make the input background transparent
      border: 'none', // Remove the input border
      borderBottom: '1px solid white', // Add a white bottom border
      borderRadius: '0', // Remove input border-radius
    };

    const labelStyle = {
    //  color: 'white', // Set the label text color to white
      //fontWeight: 'bold', // Make the text bold
    };

    return (
      <div style={backgroundImageStyle}>
        <Row>
          <Col></Col>
          <Col>
            <Form style={formStyle} onSubmit={this.onSubmit}>
              <h2 style={headingStyle}>Register</h2>
              {this.state.successMessage && (
                <Alert variant="success" className="mb-3">{this.state.successMessage}</Alert>
              )}
              {this.state.errorMessage && (
                <Alert variant="danger" className="mb-3">{this.state.errorMessage}</Alert>
              )}
              <Form.Group controlId="formUsername">
                <Form.Label style={labelStyle}>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  style={inputTextStyle} // Apply the custom styles to the input field
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label style={labelStyle}>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  style={inputTextStyle} // Apply the custom styles to the input field
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label style={labelStyle}>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  style={inputTextStyle} // Apply the custom styles to the input field
                />
              </Form.Group>
              <Button variant="primary" type="submit" style={buttonStyle}>
                Register
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </div>
    );
  }
}

export default RegisterUser;
