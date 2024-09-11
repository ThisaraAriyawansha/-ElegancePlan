import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaHome, FaPaintBrush, FaSave, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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
    <div className="quiz-page">
      <header className="navbarr">
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
      </header>

      <div className="quiz-container">
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        {showScore ? (
          <div className="score-section">
            <h3>You scored {score} out of {questions.length}!</h3>
            <p>Your design style is {score === questions.length ? 'Modern' : 'Traditional'}</p>
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <h3 className="question-text">{questions[currentQuestion].questionText}</h3>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                <button
                  key={index}
                  className="answer-button"
                  onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                >
                  {answerOption.answerText}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} ElegancePlan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Quiz;
