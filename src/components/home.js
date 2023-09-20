import React from 'react';
import { Link } from 'react-router-dom';
import { FaTasks, FaProjectDiagram, FaUsersCog, FaChartBar, FaCalendarCheck } from 'react-icons/fa';

function Home() {
  const styles = {
    title: {
      backgroundColor: '#219C90',
      color: '#f8f9fA',
    },
    containerFluid: {
      padding: '3% 15% 7%',
    },
    navbar: {
      padding: '0 0 4.5rem 0',
    },
    navbarBrand: {
      fontFamily: 'Ubuntu',
      fontSize: '2.5rem',
      fontWeight: '510',
    },
    h1: {
      fontFamily: 'Montserrat',
      fontSize: '3.5rem',
      lineHeight: '1.5',
      fontWeight: '900',
    },
  };

  return (
    <div>
      <section style={styles.title} id="title">
        {/* Nav Bar */}
        <div style={styles.containerFluid}>
          <nav style={styles.navbar} className="navbar navbar-expand-md navbar-dark">
            <a style={styles.navbarBrand} className="navbar-brand">
              <FaTasks /> Project Management
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a style={styles.navLink} className="nav-link" href="#footer">Contact</a>
                </li>
                <li className="nav-item">
                  <a style={styles.navLink} className="nav-link" href="#cta"></a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>

      {/* Title */}
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <h1 style={styles.h1}>Manage Your Projects Efficiently with Project Management Software!</h1>
          <Link to="/login" className="btn btn-outline-light btn-block btn-lg download-button-2">
            <FaTasks /> Get Started
          </Link>
        </div>
        <div className="col-lg-6 col-md-12">
          <div style={styles.titleImage} className="title-image">
            <FaProjectDiagram style={styles.a} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
