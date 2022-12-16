import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isPauseState, timeState } from "../../../../Recoil/atoms";
import ProgressBar from "./ProgressBar";

interface ITimerInfo {
  count: number;
  breakCount: number;
}

function TimerInfo({ count, breakCount }: ITimerInfo) {
  const [timeObj, setTimeObj] = useRecoilState(timeState);
  const [isPause, setIsPause] = useRecoilState(isPauseState);

  return (
    <Container>
      {!isPause && (
        <CounterWrapper>
          {count}
          <> </>
          {breakCount}
          <ProgressBar count={count} breakCount={breakCount} />
          <WiseSaying>나중에 울지말고 지금 울면서하자</WiseSaying>
        </CounterWrapper>
      )}
      {isPause && (
        <PauseWrapper>
          <ProgressBar count={count} breakCount={breakCount} />
        </PauseWrapper>
      )}
    </Container>
  );
}

export default TimerInfo;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const CounterWrapper = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 206px;
`;
const PauseWrapper = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 206px;
`;
const WiseSaying = styled.h4`
  font-size: 14px;
  letter-spacing: -1px;
  margin-bottom: 4.5vh;
`;
