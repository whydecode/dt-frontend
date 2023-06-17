import React from "react";
import "../css/navbar.css";
import profile from "../images/profile.jpg";
import tools from "../images/tools.png";
import home from "../images/home.png";
const Navbar = () => {
  return (
    <div className="navbar">
      <a href="/" className="logo">
        <img
          src="https://deepthought.education/assets/images/logo/logo.svg"
          alt="Deep Thought"
        />
      </a>
      <ul className="links">
        <li>
          <button type="button">
            <img src={home} alt="Home" />
          </button>
        </li>
        <li>
          <button type="button">
            <img src={tools} alt="" />
          </button>
        </li>
        <li>
          <button type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-bell-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
            </svg>
          </button>
        </li>
        <li>
          <button type="button" className="profileButton">
            <img src={profile} alt="profile" className="profile" />
          </button>
        </li>
        <li>
          <button type="button" id="menuButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-three-dots-vertical"
              viewBox="0 0 16 12"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
