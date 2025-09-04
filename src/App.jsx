import React, { useState, useEffect } from "react";
import questions from "./data/questions.json";
import QuestionCard from "./components/QuestionCard";
import ResultsPage from "./components/ResultsPage";
import "./styles.css";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);

  // Start quiz and shuffle questions
  const startQuiz = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);

    setQuizStarted(true);
    setCurrentQ(0);
    setAnswers([]);
    setShowResults(false);
    setTimeLeft(20); // Timer 20s
  };

  // Timer effect
  useEffect(() => {
    if (!quizStarted || showResults) return;
    if (timeLeft === 0) {
      handleNext(); // auto next if timer ends
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, showResults]);

  // Record answer
  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < shuffledQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setTimeLeft(20); // Reset timer
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setTimeLeft(20); // Reset timer
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  return (
    <div>
      {!quizStarted ? (
        <div className="start-screen">
          <h1>Quiz App</h1>
          <button className="start-btn" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      ) : showResults ? (
        <ResultsPage
          questions={shuffledQuestions}
          answers={answers}
          restart={startQuiz}
        />
      ) : (
        // Safe rendering only after shuffle
        quizStarted &&
        shuffledQuestions.length > 0 &&
        !showResults && (
          <div className="quiz-container">
            <h1>Quiz App</h1>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${((currentQ + 1) / shuffledQuestions.length) * 100}%`,
                }}
              ></div>
            </div>
            <p className="progress-text">
              Question {currentQ + 1} of {shuffledQuestions.length}
            </p>
            <QuestionCard
              question={shuffledQuestions[currentQ]}
              selected={answers[currentQ]}
              onSelect={handleAnswer}
            />
            <div className="navigation">
              <button
                className="nav-btn prev"
                onClick={handlePrev}
                disabled={currentQ === 0}
              >
                Previous
              </button>
              <button className="nav-btn skip" onClick={handleSkip}>
                Skip
              </button>
              <button
                className={`nav-btn ${
                  currentQ === shuffledQuestions.length - 1 ? "finish" : "next"
                }`}
                onClick={handleNext}
                disabled={answers[currentQ] === undefined}
              >
                {currentQ === shuffledQuestions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>

            <p className="timer">⏳ Time left: {timeLeft}s</p>
          </div>
        )
      )}
    </div>
  );
}

export default App;
