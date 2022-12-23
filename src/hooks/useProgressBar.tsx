import { useRecoilValue } from "recoil";
import { isBreakState, timerState } from "../Recoil/atoms";
import { useState, useRef, useCallback, useEffect } from "react";

export const useProgressBar = (count: number) => {
  const timerObj = useRecoilValue(timerState);
  const isBreakSet = useRecoilValue(isBreakState);
  const [progressArray, setProgressArray] = useState<number[]>([]);

  //총 세트
  const totalSet = useRef<number>(timerObj.setFocusSet + timerObj.setBreakSet);
  //포커스 총 카운트
  const totalFocusCount = useRef<number>(
    timerObj.setFocusMin * 60 + timerObj.setFocusSec
  );
  //브레이크 총 카운트
  const totalBreakCount = timerObj.setBreakMin * 60 + timerObj.setBreakSec;
  //현재 총 시간
  const nowTotalCount = count;
  //토탈카운트(총넓이)
  const totalCount = useRef<number>(
    totalFocusCount.current * timerObj.setFocusSet +
      totalBreakCount * timerObj.setBreakSet
  );
  //포커스 넓이
  const focusWidth = useRef<number>(
    (totalFocusCount.current / totalCount.current) * 100
  );
  //브레이크 넓이
  const breakWidth = useRef<number>(
    (totalBreakCount / totalCount.current) * 100
  );

  //현재 세트
  const nowSet = useRef<number>(
    totalSet.current - (timerObj.focusSet + timerObj.breakSet)
  );

  //배열생성
  useEffect(() => {
    setProgressArray(() => {
      const newProgress = [];
      for (let i = 0; i < totalSet.current; i++) {
        newProgress[i] = 0;
      }
      return newProgress;
    });
  }, []);

  //퍼센트 배열 함수
  const percentArray = useCallback(() => {
    nowSet.current = totalSet.current - (timerObj.focusSet + timerObj.breakSet);
    setProgressArray((prev) => {
      const newProgress = [...prev];
      for (let i = 0; i < totalSet.current; i++) {
        if (i < nowSet.current) {
          newProgress.splice(i, 1, 100);
        }
        if (!isBreakSet && i === nowSet.current) {
          //현재 포커스 퍼센트
          const nowFocusPercent =
            ((totalFocusCount.current - nowTotalCount) /
              totalFocusCount.current) *
            100;
          newProgress.splice(i, 1, nowFocusPercent);
        }
        if (isBreakSet && i === nowSet.current) {
          //현재 브레이크 퍼센트
          const nowBreakPercent =
            ((totalBreakCount - nowTotalCount) / totalBreakCount) * 100;
          newProgress.splice(i, 1, nowBreakPercent);
        }
      }
      return [...newProgress];
    });
  }, [count]);

  useEffect(() => {
    percentArray();
  }, [count]);

  return { progressArray, breakWidth, focusWidth, totalSet, nowSet };
};
