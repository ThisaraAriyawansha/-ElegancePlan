import React, { useState } from 'react';
import Swal from 'sweetalert2';
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
        text: 'We will use your feedback to improve our home design recommendations and services.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">HomeDesignQuiz</div>
        <ul className="navbar-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div className="quiz-container">
        {showScore ? (
          <div className="score-section">
            You scored {score} out of {questions.length}!
            {score === questions.length ? (
              <p>Your design style is Modern and Minimalist!</p>
            ) : score >= 3 ? (
              <p>Your design style is Cozy and Warm!</p>
            ) : score >= 2 ? (
              <p>Your design style is Traditional and Elegant!</p>
            ) : (
              <p>Your design style is Eclectic and Bold!</p>
            )}
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">{questions[currentQuestion].questionText}</div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                <button key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                  {answerOption.answerText}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="footer">
        <p>&copy; 2024 HomeDesignQuiz. All rights reserved.</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </footer>
    </>
  );
};

export default Quiz;
