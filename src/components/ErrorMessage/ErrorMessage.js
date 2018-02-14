import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

export function ErrorMessage({ message, }) {
  return (
      <div className="errorMessageContainer">
        <h1> {message} </h1>
      </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}