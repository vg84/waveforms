import React from 'react';

const Timer = ({ time, hidden }) => {
  return (
    <div className="timer" hidden={hidden}>
      { time }
    </div>
  );
};

export default Timer;
