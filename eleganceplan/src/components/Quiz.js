import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaHome, FaPaintBrush, FaSave, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Quiz.css';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      questionText: 'Which style of furniture do you prefer?',
      answerOptions: [
        { answerText: 'Modern', isCorrect: true },
        { answerText: 'Traditional', isCorrect: false },
        { answerText: 'Rustic', isCorrect: false },
        { answerText: 'Industrial', isCorrect: false },
      ],
    },
    {
      questionText: 'What is your preferred color palette for a living room?',
      answerOptions: [
        { answerText: 'Neutral tones like beige and gray', isCorrect: true },
        { answerText: 'Bold colors like red and yellow', isCorrect: false },
        { answerText: 'Earthy tones like brown and green', isCorrect: false },
        { answerText: 'Dark tones like black and navy', isCorrect: false },
      ],
    },
    {
      questionText: 'Which material do you prefer for flooring?',
      answerOptions: [
        { answerText: 'Hardwood', isCorrect: true },
        { answerText: 'Tiles', isCorrect: false },
        { answerText: 'Carpet', isCorrect: false },
        { answerText: 'Laminate', isCorrect: false },
      ],
    },
    {
      questionText: 'What type of lighting do you prefer in your home?',
      answerOptions: [
        { answerText: 'Natural light from large windows', isCorrect: true },
        { answerText: 'Warm, ambient lighting', isCorrect: false },
        { answerText: 'Bright task lighting', isCorrect: false },
        { answerText: 'Decorative statement lighting', isCorrect: false },
      ],
    },
  ];

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      Swal.fire({
        title: 'Thank you for your feedback!',
        text: 'We will use your feedback to improve our home design recommendations.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="abc">
    <motion.div
      className="quiz-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.header
        className="navbarr"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="navbar-brand">
          <Link to="/" className="navbar-link">
            <FaHome /> ElegancePlan
          </Link>
        </div>
        <nav className="navbar-links">
          <Link to="/" className="navbar-link">
            <FaHome /> Home
          </Link>
          <Link to="/startDesign" className="navbar-link">
            <FaPaintBrush /> Start Designing
          </Link>
          <Link to="/saved-designs" className="navbar-link">
            <FaSave /> Saved Designs
          </Link>
          <Link to="/contact" className="navbar-link">
            <FaEnvelope /> Contact Us
          </Link>
        </nav>
      </motion.header>
<br/><br/><br/>
      <motion.div
        className="quiz-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="progress-bar-container"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        >
          <div className="progress-bar"></div>
        </motion.div>
        {showScore ? (
          <motion.div
            className="score-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3>You scored {score} out of {questions.length}!</h3>
            <p>Your design style is {score === questions.length ? 'Modern' : 'Traditional'}</p>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="question-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <h3 className="question-text">{questions[currentQuestion].questionText}</h3>
            </motion.div>
            <motion.div
              className="answer-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                <motion.button
                  key={index}
                  className="answer-button"
                  onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {answerOption.answerText}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </motion.div>

      <footer className="footerr">
        <p>&copy; {new Date().getFullYear()} ElegancePlan. All rights reserved.</p>
      </footer>
    </motion.div>
    </div>
  );
};

export default Quiz;
