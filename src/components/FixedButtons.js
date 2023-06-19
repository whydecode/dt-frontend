import React from "react";
import meeting from "../images/meeting.png";
import schedule from "../images/schedule.png";
import question from "../images/question.png";
import "../css/FixedButtons.css";
const FixedButtons = () => {
  return (
    <div>
      <button className="submitButton">Submit Project</button>
      <div className="sideButtons">
        <button>
          <img src={question} alt="question" />
        </button>
        <button>
          <img src={meeting} alt="meeting" />
        </button>
        <button>
          <img src={schedule} alt="schedule" />
        </button>
      </div>
    </div>
  );
};

export default FixedButtons;
