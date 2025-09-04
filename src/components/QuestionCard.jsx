import React from "react";

const QuestionCard = ({ question, selected, onSelect }) => {
  return (
    <div className="question-card">
      <h2>{question.question}</h2>
      <div className="options">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            className={`option-btn ${
              selected === option ? "selected" : ""
            }`}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;