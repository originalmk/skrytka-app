export let SecondSeconds = 1;
export let SecondMinutes = 0;

import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0);
  let seconds = Math.floor(time % 60);
  let minutes = Math.floor(time / 60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      SecondSeconds = seconds;
      SecondMinutes = minutes
      setTime(time + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <div>
       <h1 className='timerTime'>{minutes < 10 ? "0"+minutes: minutes} : {seconds < 10 ? "0"+seconds: seconds}</h1>
    </div>
  );
};

export default Timer;