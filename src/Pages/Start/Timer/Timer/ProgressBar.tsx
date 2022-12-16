import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isBreakState, timeState } from "../../../../Recoil/atoms";
import React, { useEffect, useState } from "react";

interface IProgressBar {
  count: number;
  breakCount: number;
}

function ProgressBar({ count, breakCount }: IProgressBar) {
  const [timeObj, setTimeObj] = useRecoilState(timeState);
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);
  const [progressArray, setProgressArray] = useState<any[]>([]);

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
  const totalSet = timeObj.setFocusSet + timeObj.setBreakSet;
  //현재 세트
  const nowSet = totalSet - (timeObj.focusSet + timeObj.breakSet);
  //포커스 총 카운트
  const totalFocusCount =
    timeObj.setFocusMin * 60 * 100 + timeObj.setFocusSec * 100;
  //브레이크 총 카운트
  const totalBreakCount =
    timeObj.setBreakMin * 60 * 100 + timeObj.setBreakSec * 100;
  //현재 포커스 퍼센트
  const nowFocusPercent = Math.floor(
    ((totalFocusCount - count) / totalFocusCount) * 100
  );
  //현재 브레이크 퍼센트
  const nowBreakPercent = Math.floor(
    ((totalBreakCount - breakCount) / totalBreakCount) * 100
  );

  // progress ui
  //토탈카운트(총넓이)
  const totalCount =
    totalFocusCount * timeObj.setFocusSet +
    totalBreakCount * timeObj.setBreakSet;
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

  // console.log(progressArray);
  console.log(timeObj);

  return (
    <Container>
      {progressArray.map((data, index) => {
        return (
          <ProgressBox
            style={{
              width: `${(index + 1) % 2 === 0 ? breakWidth : focusWidth}%`,
            }}
            isBreak={(index + 1) % 2 === 0}
          >
            <ProgressGauge />
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
const ProgressBox = styled.div<{
  isBreak: boolean;
}>`
  position: relative;
  display: flex;
  height: 100%;
  background-color: ${(props) =>
    props.isBreak ? "rgba(0,0,0,0)" : "rgba(255,255,255,1)"};
`;
const ProgressGauge = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  height: 5px;
`;
