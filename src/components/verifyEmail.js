import React, { Component } from 'react';
import axios from 'axios';

class VerifyEmail extends Component {
  componentDidMount() {
    const { token } = this.props.match.params;

    // Send a request to the server to verify the user's email using the token
    axios
      .get(`http://localhost:5000/users/verify/${token}`)
      .then((res) => {
        // Verification successful, display a success message to the user
        console.log('Email verified successfully:', res.data);
      })
      .catch((error) => {
        // Verification failed, display an error message to the user
        console.error('Email verification failed:', error.response.data);
      });
  }

  render() {
    return (
      <div>
        {/* You can render a success message or an error message here */}
      </div>
    );
  }
}

export default VerifyEmail;
