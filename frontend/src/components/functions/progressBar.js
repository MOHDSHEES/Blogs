import React from "react";

const ProgressBar = ({ score }) => {
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{
          width: `${score * 10}%`,
          backgroundColor: `${
            score >= 7 ? "green" : score < 4 ? "red" : "#eed202"
          }`,
        }}
      ></div>
      <div
        className="progress-label"
        style={{ color: `${score >= 7 ? "white" : "black"}` }}
      >
        Task:1 ({score})
      </div>
    </div>
  );
};

export default ProgressBar;
