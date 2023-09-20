import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import NavigationBar from './components/NavigationBar';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import Projects from './components/Projects';
import EmailVerification from './components/EmailVerification'; // Import the EmailVerification component
let f =true;
function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        {localStorage.getItem('token') === null ? (
          <Route path="/" exact component={LoginUser} />
        ) : (
          <Route path="/" exact component={Projects} />
        )}

        {localStorage.getItem('token') === null ? (
          <Route path="/projects" exact component={LoginUser} />
        ) : (
          <Route path="/projects" exact component={Projects} />
        )}
        <Route path="/register" exact component={RegisterUser} />
        <Route path="/login" exact component={LoginUser} />
        
        {/* Add the route for email verification */}
        <Route path="/verify-email/:token" component={EmailVerification} />
      </Router>
    </div>
  );
}

export default App;
