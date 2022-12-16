import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  isBreakState,
  isPauseState,
  timeState,
} from "../../../../Recoil/atoms";
import IntervalTimer from "./IntervalTimer";
import Background from "../../../../Assets/image/bull.png";
import { motion } from "framer-motion";
import TimerButton from "./TimerButton";
import { useEffect } from "react";
import { useCounter } from "../../../../hooks/useCounter";
import BreakTimer from "./BreakTimer";
import TimerInfo from "./TimerInfo";

const bottomVariants = {
  normal: {
    opacity: 0,
    height: "0",
  },
  animate: {
    opacity: 1,
    height: "80%",
    transition: {
      delat: 0.1,
      duration: 1,
      type: "linear",
    },
  },
};

function TimerBoard() {
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);
  const [isPause, setIsPause] = useRecoilState(isPauseState);
  const [timeObj, setTimeObj] = useRecoilState(timeState);
  const { count, start, stop, reset, done } = useCounter(
    timeObj.min,
    timeObj.sec
  );
  const {
    count: breakCount,
    start: breakStart,
    stop: breakStop,
    reset: breakReset,
    done: breakDone,
  } = useCounter(timeObj.breakMin, timeObj.breakSec);

  useEffect(() => {
    setIsPause(false);
    setIsBreakSet(false);
    return () => {
      reset();
      breakReset();
      setIsBreakSet(false);
    };
  }, []);

  return (
    <Container>
      <ContentsWrapper>
        <InfoWrapper>
          <TimerInfo count={count} breakCount={breakCount} />
        </InfoWrapper>
        {!isBreakSet && (
          <IntervalTimer
            count={count}
            start={start}
            stop={stop}
            reset={reset}
            done={done}
          />
        )}
        {isBreakSet && (
          <BreakTimer
            count={breakCount}
            start={breakStart}
            stop={breakStop}
            reset={breakReset}
            done={breakDone}
          />
        )}
      </ContentsWrapper>
      <ButtonWrapper>
        <TimerButton
          count={count}
          breakCount={breakCount}
          stop={stop}
          breakStop={breakStop}
          start={start}
          breakStart={breakStart}
        />
      </ButtonWrapper>
      <BottomGradient
        variants={bottomVariants}
        initial="normal"
        animate="animate"
        iscolor={isPause ? "Red" : "Blue"}
      />
      <BackgroundImg />
    </Container>
  );
}

export default TimerBoard;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 414px;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  background-color: black;
  z-index: 20;
`;
const BackgroundImg = styled.div`
  position: absolute;
  opacity: 0.5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), 40%, rgba(0, 0, 0, 0.4)),
    url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
`;
const BottomGradient = styled(motion.div)<{ iscolor: string }>`
  z-index: 5;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    70%,
    ${(props) => props.iscolor}
  );
`;
const ContentsWrapper = styled.div`
  position: relative;
  z-index: 10;
  height: 70%;
  width: 100%;
  color: white;
`;
const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  height: 30%;
  width: 100%;
  z-index: 10;
`;
const InfoWrapper = styled.div`
  height: 42%;
  @media screen and (max-height: 800px) {
    height: 38%;
  }
  @media screen and (max-height: 750px) {
    height: 35%;
  }
`;
