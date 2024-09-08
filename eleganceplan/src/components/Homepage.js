import React from 'react';
import { Link } from 'react-router-dom';

import './Homepage.css';
import homeImage from '../components/image/home.jpeg'; // Import background image
import designToolImage from '../components/image/11.png';
import savedDesignsImage from '../components/image/331.jpg';
import shareDesignsImage from '../components/image/images.jpeg';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <header className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <i className="fas fa-home"></i> ElegancePlan
          </Link>
        </div>
        <nav className="navbar-links">
          <Link to="/">
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/design">
            <i className="fas fa-paint-brush"></i> Start Designing
          </Link>
          <Link to="/saved-designs">
            <i className="fas fa-save"></i> Saved Designs
          </Link>
          <Link to="/contact">
            <i className="fas fa-envelope"></i> Contact Us
          </Link>
        </nav>
      </header>

      {/* Hero section with background image */}
      <section className="hero-section" style={{ backgroundImage: `url(${homeImage})` }}>
        <h1 className="title">Welcome to ElegancePlan</h1>
        <p className="subtitle">Design your dream home with ease</p>
        <Link to="/design" className="cta-button">Start Designing</Link>
      </section>

      {/* Cards section with imported images */}
      <section className="cards-section">
        <h2 className="section-title">Explore Our Features</h2>
        <div className="card-container">
          <div className="card">
            <img src={designToolImage} alt="Design Tool" />
            <h3>Design Tool</h3>
            <p>Create custom layouts and visualize your home.</p>
          </div>
          <div className="card">
            <img src={savedDesignsImage} alt="Saved Designs" />
            <h3>Saved Designs</h3>
            <p>Access and manage your saved projects easily.</p>
          </div>
          <div className="card">
            <img src={shareDesignsImage} alt="Share Designs" />
            <h3>Share Designs</h3>
            <p>Collaborate with friends and family on your projects.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} ElegancePlan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
