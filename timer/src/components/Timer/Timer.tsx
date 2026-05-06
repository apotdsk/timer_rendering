import styles from './Timer.module.scss';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';

function useTimer() {
  const [time, setTime] = useState(new Date());
  const [isRunning, setIsRunning] = useState(true);
  const [renderCount, setRenderCount] = useState(0);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }

      return;
    }

    intervalRef.current = window.setInterval(() => {
      setTime(new Date());
      setRenderCount((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formattedTime = useMemo(() => {
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [time]);

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
    setRenderCount((prev) => prev + 1);
  }, []);

  const resetRenderCount = useCallback(() => {
    setRenderCount(0);
  }, []);

  return {
    formattedTime,
    isRunning,
    toggleTimer,
    renderCount,
    resetRenderCount,
  };
}

export const Timer = () => {
  const {
    formattedTime,
    isRunning,
    toggleTimer,
    renderCount,
    resetRenderCount,
  } = useTimer();

  return (
    <main className={styles.main}>
      <h1 className={styles.main_time}>{formattedTime}</h1>
      <p className={styles.main_renders}>
        Number of Component Renders: {renderCount}
      </p>
      <div className={styles.main_divider}></div>
      <div className={styles.main_buttons}>
        <button
          onClick={toggleTimer}
          className={`${styles.button_pause} ${styles.btn} ${isRunning ? '' : styles.btn_hidden}`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 3H5C4.73478 3 4.48043 3.10536 4.29289 3.29289C4.10536 3.48043 4 3.73478 4 4V12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13H6C6.26522 13 6.51957 12.8946 6.70711 12.7071C6.89464 12.5196 7 12.2652 7 12V4C7 3.73478 6.89464 3.48043 6.70711 3.29289C6.51957 3.10536 6.26522 3 6 3ZM11 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V12C9 12.2652 9.10536 12.5196 9.29289 12.7071C9.48043 12.8946 9.73478 13 10 13H11C11.2652 13 11.5196 12.8946 11.7071 12.7071C11.8946 12.5196 12 12.2652 12 12V4C12 3.73478 11.8946 3.48043 11.7071 3.29289C11.5196 3.10536 11.2652 3 11 3Z"
              fill="white"
            />
          </svg>
          &nbsp;Pause
        </button>
        <button
          onClick={resetRenderCount}
          className={`${styles.button_reset} ${styles.btn} ${isRunning ? '' : styles.btn_hidden}`}
        >
          Reset
        </button>
        <button
          onClick={toggleTimer}
          className={`${styles.button_play} ${styles.btn} ${isRunning ? styles.btn_hidden : ''}`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.604 3.02467C4.54327 2.98866 4.47409 2.96937 4.40349 2.96875C4.33289 2.96813 4.26339 2.98621 4.20204 3.02115C4.14069 3.0561 4.08968 3.10665 4.0542 3.16769C4.01871 3.22872 4.00001 3.29806 4 3.36867V12.6313C4.00001 12.7019 4.01871 12.7713 4.0542 12.8323C4.08968 12.8933 4.14069 12.9439 4.20204 12.9788C4.26339 13.0138 4.33289 13.0319 4.40349 13.0312C4.47409 13.0306 4.54327 13.0113 4.604 12.9753L12.4193 8.344C12.479 8.30858 12.5285 8.25824 12.5628 8.19793C12.5972 8.13762 12.6152 8.0694 12.6152 8C12.6152 7.93059 12.5972 7.86238 12.5628 7.80207C12.5285 7.74176 12.479 7.69142 12.4193 7.656L4.604 3.02467Z"
              fill="white"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          &nbsp;Play
        </button>
      </div>
    </main>
  );
};
