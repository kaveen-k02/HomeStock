// Button.js
import React from 'react';

const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-accent text-background rounded-lg hover:bg-teal-700 transition"
  >
    {children}
  </button>
);

export default Button;
