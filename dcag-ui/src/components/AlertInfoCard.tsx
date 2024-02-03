import React from 'react';
import {
    MessageCard,
    BACKGROUND_COLOR_TYPE,
  } from 'baseui/message-card';

const AlertInfoCard  = ({ message }) => {
  return (
    <div className="alert-wrapper">
      <div className="alert-box">
        {message}
      </div>
    </div>
  );
};

export default AlertInfoCard;

// color: #721c24;
//     background-color: #f8d7da;
//     border-color: #f5c6cb;
//     border-left: 6px solid;
