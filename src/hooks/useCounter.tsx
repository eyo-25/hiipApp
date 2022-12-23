import { useState, useRef, useCallback } from "react";

export const useCounter = (nowCount: number, resetCount: number) => {
  const [count, setCount] = useState(nowCount);
  const countRef = useRef<number>(nowCount);
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
    }, 1000);
  }, []);
  const stop = useCallback(() => {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
  }, []);
  const reset = useCallback(() => {
    countRef.current = resetCount;
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
