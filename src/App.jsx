import { useEffect, useState } from 'react';

function App() {
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeRecords, setTimeRecords] = useState([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let intervalId = undefined;
    if (running) {
      intervalId = setInterval(() => {
        const currentTime = performance.now();
        const elapsed = elapsedTime + (currentTime - startTime);
        setElapsedTime(elapsed);
      }, 1);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [running]);

  const startTimer = () => {
    setRunning(true);
    setStartTime(performance.now());
  };

  const addLap = () => {
    setTimeRecords([(elapsedTime / 1000).toFixed(2), ...timeRecords]);
  };

  const resetElapsedTime = () => {
    setRunning(false);
    setElapsedTime(0);
    setStartTime(performance.now());
    setTimeRecords([]);
  };

  const resumeTimer = () => {
    setStartTime(performance.now());
    setRunning(true);
  }

  const stopTimer = () => {
    setRunning(false);
  };

  return (
    <>
      {elapsedTime > 0 ?
        <>
          <h1>Timer: {(elapsedTime / 1000).toFixed(2)} seconds</h1>
          {(running && <button onClick={stopTimer}>Stop</button>)}
          {(!running && <button onClick={resumeTimer}>Resume</button>)}
          {running && <button onClick={addLap}>Lap</button>}
          <button onClick={resetElapsedTime}>Reset</button>
        </> : 
        <button onClick={startTimer}>Start</button>}
      
      <TimeRecords records={timeRecords}/>
    </>
  );
}

function TimeRecords(props) {
  if (props.records.length > 0) {
    return (
      <ul>
        {props.records.map((record, index) => (
          <li key={index}>{record} seconds</li>
        ))}
      </ul>
    );
  } else {
    return <p>No records available</p>;
  }
}

export default App;
