import React from 'react';

const Timer = ({ time, hidden }) => {
  return (
    <div className="timer-wrapper">
      <div className="timer" hidden={hidden}>
        { time }
      </div>
    </div>
  );
};

export default Timer;
