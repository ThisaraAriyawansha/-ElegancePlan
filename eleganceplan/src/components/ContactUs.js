import React, { useState } from 'react';
import './ContactUs.css';
import { Link } from 'react-router-dom';
import { FaHome, FaPaintBrush, FaSave, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Email address is invalid';
    if (!formData.message) formErrors.message = 'Message is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('http://localhost:5000/api/contact/submit', formData);
        alert('Message sent!');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } catch (error) {
        alert('Failed to send message');
        console.error(error);
      }
    }
  };

  return (
    <motion.div
      className="contact-us-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <header className="navbarr">
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

      <main className="contact-us-container">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <motion.input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Your name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <motion.input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Your email address"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <motion.textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'error' : ''}
              placeholder="Your message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <motion.button
            type="submit"
            className="submit-button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Send Message
          </motion.button>
        </form>
      </main>
      
      <footer className="footerrr">
        <p>&copy; {new Date().getFullYear()} ElegancePlan. All rights reserved.</p>
      </footer>
    </motion.div>
  );
};

export default ContactUs;
