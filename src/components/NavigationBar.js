import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';


class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    localStorage.clear();
    window.location = '/';
  }

  render() {
    const navbarStyle = {
      backgroundImage: 'url("https://img.freepik.com/free-vector/white-abstract-background_23-2148817571.jpg")', // Add your image URL here
      backgroundSize: 'cover', // Make the background image cover the entire navbar
      borderBottom: '2px solid #8ECDDD', // Add a bottom border
    };

    const fontFamily = "'Ubuntu', sans-serif"; // Ubuntu font family

    const navbarBrandStyle = {
      color: 'teal', // Blue text color for the brand
      fontWeight: 'bold', // Increased font weight for the brand
      fontFamily: fontFamily, // Set the font family to Ubuntu
    };

    const navLinkStyle = {
      color: 'teal', // Blue text color for the links
      fontWeight: '', // Increased font weight for the links
    };

    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg=""
        variant="dark"
        style={navbarStyle}
      >
        <Navbar.Brand href="/" style={{ ...navbarBrandStyle, fontFamily: fontFamily }}>
  <FontAwesomeIcon icon={faListCheck} /> Project-Management
</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {localStorage.getItem('token') === null ? (
            <Nav>
              <Nav.Link href="/register" style={navLinkStyle}>
                Register
              </Nav.Link>
              <Nav.Link href="/login" style={navLinkStyle}>
                Login
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Navbar.Text style={{ color: 'teal', fontWeight: '' }}>
                Welcome {localStorage.getItem('user')}
              </Navbar.Text>
              <Nav.Link href="/projects" style={navLinkStyle}>
                Projects
              </Nav.Link>
              <Nav.Link onClick={this.logout} style={navLinkStyle}>
                Logout
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
