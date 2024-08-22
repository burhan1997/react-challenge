import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./multipleChoiceQuestion.css";

const stripHtmlTags = (html) => {
  if (typeof window !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }
  return html;
};

const MultipleChoiceQuestion = ({ question }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [cleanDescription, setCleanDescription] = useState("");
  const [cleanTitle, setCleanTitle] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerRunning, setTimerRunning] = useState(true);
  const [timerExpired, setTimerExpired] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCleanDescription(stripHtmlTags(question.description));
    setCleanTitle(stripHtmlTags(question.title));
  }, [question.description, question.title]);

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
      setTimerExpired(true);
    }
  }, [timerRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleRetry = () => {
    // resetting state and timer
    setTimeLeft(60);
    setTimerRunning(true);
    setTimerExpired(false);
    setSelectedOption(null);

    navigate("/exercise/596cf202-bd6c-4623-9482-be95f76a4837");
  };

  return (
    <div className="question-container">
      {timerExpired ? (
        <div className="timer-expired-message">
          <p>
            Unfortunately, you were not able to complete it on time. Click the
            button to start again.
          </p>
          <button onClick={handleRetry} className="retry-button">
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="timer">Time Left: {formatTime(timeLeft)}</div>
          <h1 className="question-title">{cleanTitle}</h1>
          <p className="question-description">{cleanDescription}</p>
          <p className="question-prompt">Pick one option</p>
          <div className="answer-list">
            {question.answers.map((answer) => (
              <label
                key={answer.id}
                className={`answer-option ${
                  selectedOption === answer.id ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="question"
                  value={answer.id}
                  checked={selectedOption === answer.id}
                  onChange={() => setSelectedOption(answer.id)}
                />
                <span>{answer.answer}</span>
              </label>
            ))}
          </div>
          {selectedOption && (
            <div className="selected-answer">
              <p className="selected-answer-title">Selected Answer:</p>
              <p>
                {
                  question.answers.find(
                    (answer) => answer.id === selectedOption
                  )?.answer
                }
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MultipleChoiceQuestion;
