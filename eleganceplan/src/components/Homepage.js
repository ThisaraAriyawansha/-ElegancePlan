import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPaintBrush, FaSave, FaEnvelope } from 'react-icons/fa';
import './Homepage.css';
import homeImage from '../components/image/home.jpeg';
import designToolImage from '../components/image/11.png';
import savedDesignsImage from '../components/image/331.jpg';
import shareDesignsImage from '../components/image/images.jpeg';
import additionalImage1 from '../components/image/imagewddwws.png';
import additionalImage2 from '../components/image/home.avif';
import { MdOutlineDesignServices, MdOutlineShare } from 'react-icons/md'; // Example icons

const Homepage = () => {
  return (
    <div className="homepage-container">
      <header className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <FaHome /> ElegancePlan
          </Link>
        </div>
        <nav className="navbar-links">
          <Link to="/">
            <FaHome /> Home
          </Link>
          <Link to="/startDesign">
            <FaPaintBrush /> Start Designing
          </Link>
          <Link to="/saved-designs">
            <FaSave /> Saved Designs
          </Link>
          <Link to="/contact">
            <FaEnvelope /> Contact Us
          </Link>
        </nav>
      </header>

      {/* Hero section with background image */}
      <section className="hero-section" style={{ backgroundImage: `url(${homeImage})` }}>
        <h1 className="title">Welcome to ElegancePlan</h1>
        <p className="subtitle">Design your dream home with ease</p>
        <Link to="/startDesign" className="cta-button">Start Designing</Link>
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

      {/* Feature Highlights Section */}
      <section className="feature-highlights">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="feature-container">
          <div className="feature-card">
            <MdOutlineDesignServices size={50} />
            <h3>Intuitive Design</h3>
            <p>Easy-to-use interface for a seamless design experience.</p>
          </div>
          <div className="feature-card">
            <MdOutlineDesignServices size={50} />
            <h3>High Customizability</h3>
            <p>Tailor every detail to your specific needs and preferences.</p>
          </div>
          <div className="feature-card">
            <MdOutlineDesignServices size={50} />
            <h3>24/7 Support</h3>
            <p>Access round-the-clock support for any queries or issues.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="cta-banner">
        <h2>Special Offer</h2>
        <p>Sign up now and get 20% off on your first design package!</p>
        <Link to="/startDesign" className="cta-button">Claim Offer</Link>
      </section>

      {/* User Success Stories */}
      <section className="success-stories">
        <h2 className="section-title">Success Stories</h2>
        <div className="story-container">
          <div className="story-card">
            <img src={additionalImage1} alt="Success Story 1" />
            <h3>John's Modern Loft</h3>
            <p>Read how John transformed his apartment into a modern loft with our tools.</p>
          </div>
          <div className="story-card">
            <img src={additionalImage2} alt="Success Story 2" />
            <h3>Sarah's Cozy Cottage</h3>
            <p>Discover Sarah's journey of creating a cozy cottage home using ElegancePlan.</p>
          </div>
        </div>
      </section>

      {/* Interactive Quiz */}
      <section className="interactive-quiz">
        <h2 className="section-title">What's Your Design Style?</h2>
        <p>Take our short quiz to find out which design style suits you best.</p>
        <Link to="/quiz" className="cta-button">Start Quiz</Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} ElegancePlan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
