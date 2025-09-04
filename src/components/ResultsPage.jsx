import React from "react";

const ResultsPage = ({ questions, answers, restart }) => {
  const score = answers.reduce(
    (acc, ans, i) => (ans === questions[i].answer ? acc + 1 : acc),
    0
  );

  return (
    <div className="results">
      <h1>Results</h1>
      <p>
        You scored {score}/{questions.length}
      </p>
      <div className="summary">
        {questions.map((q, i) => (
          <div key={i} className="summary-item">
            <p>
              <strong>Q{i + 1}: {q.question}</strong>
            </p>
            <p>Your answer: {answers[i] || "Skipped"}</p>
            <p className={answers[i] === q.answer ? "correct" : "incorrect"}>
              Correct answer: {q.answer}
            </p>
          </div>
        ))}
      </div>
      <button className="restart-btn" onClick={restart}>
        Restart Quiz
      </button>
    </div>
  );
};

export default ResultsPage;