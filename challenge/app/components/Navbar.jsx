import React from "react";
import PropTypes from "prop-types";
import "./navbar.css";

const Navbar = ({ onPrevious, onNext, canPrevious, canNext }) => {
  return (
    <nav className="navbar">
      <div
        className={canPrevious ? "button-active" : ""}
        onClick={canPrevious ? onPrevious : undefined}
      >
        {canPrevious && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M11.354 1.146a.5.5 0 0 0-.708 0l-5.5 6a.5.5 0 0 0 0 .708l5.5 6a.5.5 0 1 0 .708-.708L6.207 8l5.147-5.146a.5.5 0 0 0 0-.708z"
            />
          </svg>
        )}
      </div>
      <div
        className={canNext ? "button-active" : ""}
        onClick={canNext ? onNext : undefined}
      >
        {canNext && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M4.646 14.854a.5.5 0 0 1 0-.708L9.793 8 4.646 2.854a.5.5 0 1 1 .708-.708l5.5 6a.5.5 0 0 1 0 .708l-5.5 6a.5.5 0 0 1-.708 0z"
            />
          </svg>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  canPrevious: PropTypes.bool.isRequired,
  canNext: PropTypes.bool.isRequired,
};

export default Navbar;
