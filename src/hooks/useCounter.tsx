import { useState, useRef, useCallback } from "react";

export const useCounter = (setMin: number, setSec: number) => {
  const [count, setCount] = useState(setMin * 60 * 100 + setSec * 100);
  const countRef = useRef<number>(setMin * 60 * 100 + setSec * 100);
  const intervalRef = useRef<any>(null);

  const start = useCallback(() => {
    intervalRef.current = setInterval(() => {
      if (intervalRef.current === null) return;
      if (0 < countRef.current) {
        countRef.current -= 1;
        setCount(countRef.current);
      } else if (countRef.current < 0) {
        clearInterval(intervalRef.current);
      }
    }, 10);
  }, []);
  const stop = useCallback(() => {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
  }, []);
  const reset = useCallback(() => {
    countRef.current = setMin * 60 * 100 + setSec * 100;
    setCount(countRef.current);
    clearInterval(intervalRef.current);
  }, []);
  const done = useCallback(() => {
    countRef.current = 0;
    setCount(countRef.current);
    clearInterval(intervalRef.current);
  }, []);

  return { count, start, stop, reset, done };
};
