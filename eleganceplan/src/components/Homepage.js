import React from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <header className="navbar">
        <div className="navbar-brand">
          <Link to="/"><i className="fas fa-home"></i> ElegancePlan</Link>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/design">Start Designing</Link>
          <Link to="/saved-designs">Saved Designs</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </header>

      <section className="hero-section" style={{ backgroundImage: `url('../image/home.jpeg')` }}>
        <h1 className="title">Welcome to ElegancePlan</h1>
        <p className="subtitle">Design your dream home with ease</p>
        <Link to="/design" className="cta-button">Start Designing</Link>
      </section>

      <section className="cards-section">
        <h2 className="section-title">Explore Our Features</h2>
        <div className="card-container">
          <div className="card">
            <img src="your-image1.jpg" alt="Design Tool" />
            <h3>Design Tool</h3>
            <p>Create custom layouts and visualize your home.</p>
          </div>
          <div className="card">
            <img src="your-image2.jpg" alt="Saved Designs" />
            <h3>Saved Designs</h3>
            <p>Access and manage your saved projects easily.</p>
          </div>
          <div className="card">
            <img src="your-image3.jpg" alt="Share Designs" />
            <h3>Share Designs</h3>
            <p>Collaborate with friends and family on your projects.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} ElegancePlan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
