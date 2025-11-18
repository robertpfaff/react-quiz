import { useState } from 'react';
import './Quiz.css';

const sampleQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1
  }
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleAnswerClick = (answerIndex) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);

    if (answerIndex === sampleQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < sampleQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h2>Quiz Complete!</h2>
          <p>You scored {score} out of {sampleQuestions.length}</p>
          <p>
            {score === sampleQuestions.length
              ? "Perfect score! 🎉"
              : score >= sampleQuestions.length / 2
              ? "Great job! 👏"
              : "Keep practicing! 💪"}
          </p>
          <button onClick={handleRestart} className="restart-btn">
            Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{sampleQuestions.length}
            </div>
            <div className="question-text">
              {sampleQuestions[currentQuestion].question}
            </div>
          </div>
          <div className="answer-section">
            {sampleQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                className={`answer-btn ${
                  answered
                    ? index === sampleQuestions[currentQuestion].correctAnswer
                      ? 'correct'
                      : index === selectedAnswer
                      ? 'incorrect'
                      : ''
                    : ''
                }`}
                disabled={answered}
              >
                {option}
              </button>
            ))}
          </div>
          {answered && (
            <button onClick={handleNextQuestion} className="next-btn">
              {currentQuestion + 1 === sampleQuestions.length ? 'Finish' : 'Next Question'}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;
