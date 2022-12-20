import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isBreakState, timerState } from "../../../../Recoil/atoms";
import React, { useEffect, useState } from "react";
import { Blue, Red } from "../../../../Styles/Colors";

interface IProgressBar {
  count: number;
  breakCount: number;
}

function ProgressBar({ count, breakCount }: IProgressBar) {
  const [timerObj, setTimerObj] = useRecoilState(timerState);
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);
  const [progressArray, setProgressArray] = useState<number[]>([]);
  // const [totalProgress, setTotalProgress] = useState<number>(0);

  //배열생성
  useEffect(() => {
    setProgressArray(() => {
      const newProgress = [];
      for (let i = 0; i < totalSet; i++) {
        newProgress[i] = 0;
      }
      return newProgress;
    });
  }, []);

  // progress 배열
  //총 세트
  const totalSet = timerObj.setFocusSet + timerObj.setBreakSet;
  //현재 세트
  const nowSet = totalSet - (timerObj.focusSet + timerObj.breakSet);
  //포커스 총 카운트
  const totalFocusCount =
    timerObj.setFocusMin * 60 * 100 + timerObj.setFocusSec * 100;
  //브레이크 총 카운트
  const totalBreakCount =
    timerObj.setBreakMin * 60 * 100 + timerObj.setBreakSec * 100;
  //현재 포커스 퍼센트
  const nowFocusPercent = ((totalFocusCount - count) / totalFocusCount) * 100;
  //현재 브레이크 퍼센트
  const nowBreakPercent =
    ((totalBreakCount - breakCount) / totalBreakCount) * 100;

  // progress 게이지
  //토탈카운트(총넓이)
  const totalCount =
    totalFocusCount * timerObj.setFocusSet +
    totalBreakCount * timerObj.setBreakSet;
  //포커스 넓이
  const focusWidth = (totalFocusCount / totalCount) * 100;
  //브레이크 넓이
  const breakWidth = (totalBreakCount / totalCount) * 100;

  //카운트 감지해서 배열 배정
  useEffect(() => {
    setProgressArray((prev) => {
      const newProgress = [...prev];
      for (let i = 0; i < totalSet; i++) {
        if (i < nowSet) {
          newProgress.splice(i, 1, 100);
        }
        if (!isBreakSet && i === nowSet) {
          newProgress.splice(i, 1, nowFocusPercent);
        }
        if (isBreakSet && i === nowSet) {
          newProgress.splice(i, 1, nowBreakPercent);
        }
      }
      return [...newProgress];
    });
  }, [count, breakCount]);

  //카운트 감지해서 배열 배정
  // useEffect(() => {
  //   const totalPercent = progressArray.length * 100;
  //   if (progressArray.length > 0) {
  //     const sum = progressArray.reduce((a, b) => a + b);
  //     setTotalProgress(() => {
  //       if (sum !== 0 && totalPercent !== 0) {
  //         return (sum / totalPercent) * 100;
  //       } else {
  //         return 0;
  //       }
  //     });
  //   }
  // }, [progressArray]);

  return (
    <Container>
      {progressArray.map((data, index) => {
        return (
          <ProgressBox
            key={index}
            style={{
              width: `${(index + 1) % 2 === 0 ? breakWidth : focusWidth}%`,
            }}
            isBreak={(index + 1) % 2 === 0}
          >
            <ProgressGauge
              style={{
                width: `${data}%`,
              }}
              isBreak={(index + 1) % 2 === 0}
            >
              <ProgressEdge
                isNowSet={index === nowSet && totalSet !== nowSet}
              />
            </ProgressGauge>
          </ProgressBox>
        );
      })}
    </Container>
  );
}

export default ProgressBar;

const Container = styled.div`
  position: relative;
  display: flex;
  height: 5px;
  width: 100%;
  margin-bottom: 20px;
`;
const ProgressBox = styled.div<{ isBreak: boolean }>`
  position: relative;
  display: flex;
  height: 100%;
  background-color: ${(props) =>
    props.isBreak ? "rgba(0,0,0,0)" : "rgba(255,255,255,1)"};
`;
const ProgressGauge = styled.div<{ isBreak: boolean }>`
  position: absolute;
  top: 0;
  display: flex;
  height: 100%;
  background-color: ${(props) => (props.isBreak ? Red : Blue)};
`;
const ProgressEdge = styled.div<{ isNowSet: boolean }>`
  display: ${(props) => (props.isNowSet ? "inline" : "none")};
  position: absolute;
  right: -1px;
  bottom: -0.05px;
  width: 2px;
  height: 100%;
  background-color: Red;
`;
