import { useState, useEffect } from 'react';

const Timer = ({ interval, start = 0, end = Infinity, reverse = false }) => {
  const [counter, setCounter] = useState(start);

  useEffect(() => {
    let timeoutId;

    if (counter !== end) {
      timeoutId = setTimeout(() => {
        reverse ? setCounter(counter - 1) : setCounter(counter + 1)

      }, interval);
    }

    return () => {
      clearTimeout(timeoutId);
    }
  });

  return (
    <div>
      <h2>Timer</h2>
      <p>{ counter }</p>
    </div>
  );
}


export default Timer;
