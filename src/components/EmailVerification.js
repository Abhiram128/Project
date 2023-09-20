import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function EmailVerification() {
  const { token } = useParams(); // Get the token from the URL
  const [verificationStatus, setVerificationStatus] = useState(''); // Initialize to an empty string
  const history = useHistory();

  useEffect(() => {
    if (token) {
      // Simulate a delay for demonstration purposes
      setTimeout(() => {
        setVerificationStatus('Email verified successfully.');
      }, 2000); // 2 seconds (you can adjust this as needed)

      // Uncomment the code below and replace it with your server verification logic
      
      axios
        .get(`https://localhost:5000/users/verify-email/${token}`)
        .then((response) => {
          if (response.data === 'Email verified successfully. You can now log in.') {
            setVerificationStatus('Email verified successfully.');
          } else {
            setVerificationStatus('Email verification failed. Please try again or contact support.');
          }
        })
        .catch((error) => {
          console.error('Email verification error:', error);
          setVerificationStatus('Email verification in process, check your email and try again');
        });
      
    } else {
      setVerificationStatus('Token not found.');
    }
  }, [token]);

  const handleCheckEmail = () => {
    // Redirect to the login page after email verification
    history.push('/login');
  };

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{verificationStatus}</p>
      <button onClick={handleCheckEmail}>Login</button>
    </div>
  );
}

export default EmailVerification;
